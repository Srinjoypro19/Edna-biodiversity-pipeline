"""
Database setup script for EDNA biodiversity pipeline
Creates tables for storing ML analysis results and taxonomic data
"""

import sqlite3
from datetime import datetime

def create_database_schema():
    """Create database schema for EDNA pipeline"""
    
    # Connect to database (creates if doesn't exist)
    conn = sqlite3.connect('edna_biodiversity.db')
    cursor = conn.cursor()
    
    # Samples table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS samples (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sample_id TEXT UNIQUE NOT NULL,
            collection_date DATE,
            location_name TEXT,
            latitude REAL,
            longitude REAL,
            depth_meters REAL,
            temperature_celsius REAL,
            salinity_psu REAL,
            ph_level REAL,
            researcher_name TEXT,
            institution TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Sequences table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sequences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sample_id TEXT,
            sequence_data TEXT NOT NULL,
            sequence_length INTEGER,
            gc_content REAL,
            quality_score REAL,
            primer_used TEXT,
            sequencing_platform TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sample_id) REFERENCES samples (sample_id)
        )
    ''')
    
    # Species identifications table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS species_identifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sequence_id INTEGER,
            species_name TEXT,
            confidence_score REAL,
            identification_method TEXT,
            kingdom TEXT,
            phylum TEXT,
            class TEXT,
            order_name TEXT,
            family TEXT,
            genus TEXT,
            species TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sequence_id) REFERENCES sequences (id)
        )
    ''')
    
    # Analysis reports table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analysis_reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            report_id TEXT UNIQUE NOT NULL,
            sample_ids TEXT,
            total_sequences INTEGER,
            identified_sequences INTEGER,
            unique_species INTEGER,
            shannon_diversity REAL,
            identification_rate REAL,
            pipeline_version TEXT,
            analysis_parameters TEXT,
            report_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Reference taxonomy table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reference_taxonomy (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            species_name TEXT UNIQUE NOT NULL,
            common_name TEXT,
            kingdom TEXT,
            phylum TEXT,
            class TEXT,
            order_name TEXT,
            family TEXT,
            genus TEXT,
            species TEXT,
            conservation_status TEXT,
            habitat_description TEXT,
            distribution_range TEXT,
            reference_sequence TEXT,
            ncbi_taxid INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Pipeline runs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pipeline_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id TEXT UNIQUE NOT NULL,
            status TEXT,
            start_time TIMESTAMP,
            end_time TIMESTAMP,
            input_samples TEXT,
            output_report_id TEXT,
            error_message TEXT,
            processing_time_seconds REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create indexes for better performance
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_samples_location ON samples (latitude, longitude)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_sequences_sample ON sequences (sample_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_species_sequence ON species_identifications (sequence_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_species_name ON species_identifications (species_name)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_taxonomy_species ON reference_taxonomy (species_name)')
    
    conn.commit()
    print("Database schema created successfully!")
    
    # Insert sample reference data
    insert_sample_data(cursor)
    conn.commit()
    
    conn.close()

def insert_sample_data(cursor):
    """Insert sample reference taxonomy data"""
    
    sample_species = [
        ('Gadus morhua', 'Atlantic Cod', 'Animalia', 'Chordata', 'Actinopterygii', 'Gadiformes', 'Gadidae', 'Gadus', 'Gadus morhua', 'Vulnerable', 'Cold waters of North Atlantic', 'North Atlantic Ocean', 'ATCGATCGATCGATCGATCGATCG', 8049),
        ('Calanus finmarchicus', 'Copepod', 'Animalia', 'Arthropoda', 'Copepoda', 'Calanoida', 'Calanidae', 'Calanus', 'Calanus finmarchicus', 'Least Concern', 'Marine planktonic', 'North Atlantic and Arctic', 'GCTAGCTAGCTAGCTAGCTAGCTA', 6668),
        ('Mytilus edulis', 'Blue Mussel', 'Animalia', 'Mollusca', 'Bivalvia', 'Mytilida', 'Mytilidae', 'Mytilus', 'Mytilus edulis', 'Least Concern', 'Intertidal rocky shores', 'North Atlantic coasts', 'TTAATTAATTAATTAATTAATTAA', 6550),
        ('Fucus vesiculosus', 'Bladder Wrack', 'Chromista', 'Ochrophyta', 'Phaeophyceae', 'Fucales', 'Fucaceae', 'Fucus', 'Fucus vesiculosus', 'Least Concern', 'Rocky intertidal zones', 'North Atlantic shores', 'CGGCCGGCCGGCCGGCCGGCCGGC', 2870),
        ('Pleuronectes platessa', 'European Plaice', 'Animalia', 'Chordata', 'Actinopterygii', 'Pleuronectiformes', 'Pleuronectidae', 'Pleuronectes', 'Pleuronectes platessa', 'Least Concern', 'Sandy bottoms', 'Northeast Atlantic', 'AGTCAGTCAGTCAGTCAGTCAGTC', 8267)
    ]
    
    cursor.executemany('''
        INSERT OR REPLACE INTO reference_taxonomy 
        (species_name, common_name, kingdom, phylum, class, order_name, family, genus, species, 
         conservation_status, habitat_description, distribution_range, reference_sequence, ncbi_taxid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', sample_species)
    
    print("Sample reference data inserted successfully!")

if __name__ == "__main__":
    print("Setting up EDNA Biodiversity Database...")
    create_database_schema()
    print("Database setup complete!")
