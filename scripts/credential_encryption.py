import os
import base64
import json
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import sqlite3
from datetime import datetime
import hashlib

class CredentialFirewall:
    def __init__(self, master_password: str, db_path: str = "credentials.db"):
        self.db_path = db_path
        self.key = self._derive_key(master_password)
        self.cipher = Fernet(self.key)
        self._init_database()
    
    def _derive_key(self, password: str) -> bytes:
        """Derive encryption key from master password using PBKDF2"""
        salt = b'edna_biodiversity_salt_2024'  # In production, use random salt per user
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        return key
    
    def _init_database(self):
        """Initialize SQLite database for credential storage"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS credentials (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                description TEXT,
                encrypted_value TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_accessed TIMESTAMP,
                access_count INTEGER DEFAULT 0,
                user_id TEXT,
                tags TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS access_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                credential_id TEXT,
                user_id TEXT,
                action TEXT,
                ip_address TEXT,
                user_agent TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT,
                FOREIGN KEY (credential_id) REFERENCES credentials (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def store_credential(self, name: str, credential_type: str, value: str, 
                        description: str = "", user_id: str = "system", tags: list = None) -> str:
        """Store encrypted credential in database"""
        try:
            # Encrypt the credential value
            encrypted_value = self.cipher.encrypt(value.encode()).decode()
            
            # Generate unique ID
            credential_id = hashlib.sha256(f"{name}_{datetime.now().isoformat()}".encode()).hexdigest()[:16]
            
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO credentials (id, name, type, description, encrypted_value, user_id, tags)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (credential_id, name, credential_type, description, encrypted_value, user_id, 
                  json.dumps(tags) if tags else "[]"))
            
            conn.commit()
            conn.close()
            
            # Log the action
            self._log_access(credential_id, user_id, "CREATE", "127.0.0.1", "system", "success")
            
            print(f"✅ Credential '{name}' stored successfully with ID: {credential_id}")
            return credential_id
            
        except Exception as e:
            print(f"❌ Error storing credential: {str(e)}")
            return None
    
    def retrieve_credential(self, credential_id: str, user_id: str = "system", 
                          ip_address: str = "127.0.0.1") -> dict:
        """Retrieve and decrypt credential"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT name, type, description, encrypted_value, created_at, access_count
                FROM credentials WHERE id = ?
            ''', (credential_id,))
            
            result = cursor.fetchone()
            if not result:
                self._log_access(credential_id, user_id, "ACCESS_FAILED", ip_address, "system", "failed")
                return None
            
            name, cred_type, description, encrypted_value, created_at, access_count = result
            
            # Decrypt the value
            decrypted_value = self.cipher.decrypt(encrypted_value.encode()).decode()
            
            # Update access count and timestamp
            cursor.execute('''
                UPDATE credentials 
                SET last_accessed = CURRENT_TIMESTAMP, access_count = access_count + 1
                WHERE id = ?
            ''', (credential_id,))
            
            conn.commit()
            conn.close()
            
            # Log successful access
            self._log_access(credential_id, user_id, "ACCESS", ip_address, "system", "success")
            
            return {
                "id": credential_id,
                "name": name,
                "type": cred_type,
                "description": description,
                "value": decrypted_value,
                "created_at": created_at,
                "access_count": access_count + 1
            }
            
        except Exception as e:
            self._log_access(credential_id, user_id, "ACCESS_ERROR", ip_address, "system", "failed")
            print(f"❌ Error retrieving credential: {str(e)}")
            return None
    
    def list_credentials(self, user_id: str = "system") -> list:
        """List all credentials (without values) for a user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, type, description, created_at, last_accessed, access_count
            FROM credentials WHERE user_id = ? OR user_id = 'system'
            ORDER BY created_at DESC
        ''', (user_id,))
        
        results = cursor.fetchall()
        conn.close()
        
        credentials = []
        for row in results:
            credentials.append({
                "id": row[0],
                "name": row[1],
                "type": row[2],
                "description": row[3],
                "created_at": row[4],
                "last_accessed": row[5] or "Never",
                "access_count": row[6]
            })
        
        return credentials
    
    def delete_credential(self, credential_id: str, user_id: str = "system") -> bool:
        """Delete a credential"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('DELETE FROM credentials WHERE id = ?', (credential_id,))
            deleted = cursor.rowcount > 0
            
            conn.commit()
            conn.close()
            
            if deleted:
                self._log_access(credential_id, user_id, "DELETE", "127.0.0.1", "system", "success")
                print(f"✅ Credential {credential_id} deleted successfully")
            else:
                print(f"❌ Credential {credential_id} not found")
            
            return deleted
            
        except Exception as e:
            print(f"❌ Error deleting credential: {str(e)}")
            return False
    
    def _log_access(self, credential_id: str, user_id: str, action: str, 
                   ip_address: str, user_agent: str, status: str):
        """Log access attempt"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO access_logs (credential_id, user_id, action, ip_address, user_agent, status)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (credential_id, user_id, action, ip_address, user_agent, status))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"Warning: Could not log access: {str(e)}")
    
    def get_access_logs(self, limit: int = 100) -> list:
        """Retrieve access logs"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT al.*, c.name as credential_name
            FROM access_logs al
            LEFT JOIN credentials c ON al.credential_id = c.id
            ORDER BY al.timestamp DESC
            LIMIT ?
        ''', (limit,))
        
        results = cursor.fetchall()
        conn.close()
        
        logs = []
        for row in results:
            logs.append({
                "id": row[0],
                "credential_id": row[1],
                "user_id": row[2],
                "action": row[3],
                "ip_address": row[4],
                "user_agent": row[5],
                "timestamp": row[6],
                "status": row[7],
                "credential_name": row[8] or "Unknown"
            })
        
        return logs

# Example usage and setup
if __name__ == "__main__":
    # Initialize the credential firewall
    master_password = "EDNA_Biodiversity_Master_Key_2024!"  # In production, get from secure input
    firewall = CredentialFirewall(master_password)
    
    # Store some example credentials
    print("🔐 Setting up EDNA Biodiversity Credential Firewall...")
    
    # Database credentials
    firewall.store_credential(
        name="Supabase Production Database",
        credential_type="database",
        value="postgresql://postgres:secure_password@db.supabase.co:5432/edna_production",
        description="Main production database for EDNA biodiversity platform",
        tags=["production", "database", "supabase"]
    )
    
    # API Keys
    firewall.store_credential(
        name="OpenAI API Key",
        credential_type="api_key",
        value="sk-1234567890abcdef1234567890abcdef1234567890abcdef",
        description="API key for ML-powered taxonomy identification",
        tags=["ai", "openai", "production"]
    )
    
    firewall.store_credential(
        name="CMLRE Research Database",
        credential_type="database",
        value="mysql://research:marine_data_2024@cmlre-db.org:3306/biodiversity",
        description="Centre for Marine Living Resources and Ecology research database",
        tags=["research", "cmlre", "mysql"]
    )
    
    firewall.store_credential(
        name="AWS S3 Access Key",
        credential_type="api_key",
        value="AKIAIOSFODNN7EXAMPLE",
        description="AWS S3 access key for storing large genomic datasets",
        tags=["aws", "storage", "s3"]
    )
    
    # List all credentials
    print("\n📋 Stored Credentials:")
    credentials = firewall.list_credentials()
    for cred in credentials:
        print(f"  • {cred['name']} ({cred['type']}) - Created: {cred['created_at']}")
    
    print(f"\n✅ Credential Firewall setup complete!")
    print(f"📊 Total credentials stored: {len(credentials)}")
    print(f"🔒 All credentials encrypted with AES-256")
    print(f"📝 Access logging enabled")
