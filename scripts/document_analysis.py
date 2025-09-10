"""
Document Analysis Pipeline for EDNA Biodiversity Platform
Processes uploaded research documents and extracts relevant information
"""

import os
import json
import re
from typing import Dict, List, Any
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DocumentAnalyzer:
    """Analyzes research documents for biodiversity information"""
    
    def __init__(self):
        self.supported_formats = ['.pdf', '.txt', '.doc', '.docx', '.csv']
        self.taxonomy_keywords = [
            'species', 'genus', 'family', 'order', 'class', 'phylum', 'kingdom',
            'taxonomy', 'classification', 'biodiversity', 'marine', 'organism'
        ]
        
    def analyze_document(self, file_path: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze a single document and extract relevant information
        
        Args:
            file_path: Path to the document file
            metadata: Document metadata from upload
            
        Returns:
            Analysis results dictionary
        """
        try:
            logger.info(f"[v0] Analyzing document: {file_path}")
            
            # Extract text content based on file type
            text_content = self._extract_text(file_path)
            
            # Perform analysis
            analysis_results = {
                'document_id': metadata.get('originalName', 'unknown'),
                'file_path': file_path,
                'analysis_timestamp': datetime.now().isoformat(),
                'text_length': len(text_content),
                'extracted_entities': self._extract_entities(text_content),
                'taxonomy_mentions': self._find_taxonomy_mentions(text_content),
                'species_list': self._extract_species_names(text_content),
                'geographic_locations': self._extract_locations(text_content),
                'methodology_keywords': self._extract_methodology(text_content),
                'confidence_score': self._calculate_confidence(text_content)
            }
            
            logger.info(f"[v0] Document analysis completed for {metadata.get('originalName')}")
            return analysis_results
            
        except Exception as e:
            logger.error(f"[v0] Error analyzing document {file_path}: {str(e)}")
            return {
                'document_id': metadata.get('originalName', 'unknown'),
                'error': str(e),
                'analysis_timestamp': datetime.now().isoformat()
            }
    
    def _extract_text(self, file_path: str) -> str:
        """Extract text content from various file formats"""
        file_extension = os.path.splitext(file_path)[1].lower()
        
        if file_extension == '.txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        elif file_extension == '.pdf':
            # Simulate PDF text extraction
            return f"Extracted text from PDF: {os.path.basename(file_path)}\nMarine biodiversity research content..."
        elif file_extension in ['.doc', '.docx']:
            # Simulate Word document text extraction
            return f"Extracted text from Word document: {os.path.basename(file_path)}\nSpecies identification and analysis..."
        elif file_extension == '.csv':
            # Simulate CSV data extraction
            return f"Data from CSV: {os.path.basename(file_path)}\nSpecies,Location,Depth,Date\nExample data..."
        else:
            return f"Content from {os.path.basename(file_path)}"
    
    def _extract_entities(self, text: str) -> List[Dict[str, Any]]:
        """Extract named entities from text"""
        entities = []
        
        # Simple pattern matching for demonstration
        patterns = {
            'species': r'([A-Z][a-z]+ [a-z]+)',  # Binomial nomenclature
            'location': r'([A-Z][a-z]+ [A-Z][a-z]+|Arabian Sea|Indian Ocean)',
            'depth': r'(\d+\s*m|\d+\s*meters)',
            'coordinates': r'(\d+\.?\d*°[NS],?\s*\d+\.?\d*°[EW])'
        }
        
        for entity_type, pattern in patterns.items():
            matches = re.findall(pattern, text)
            for match in matches[:5]:  # Limit to first 5 matches
                entities.append({
                    'type': entity_type,
                    'value': match,
                    'confidence': 0.8
                })
        
        return entities
    
    def _find_taxonomy_mentions(self, text: str) -> List[str]:
        """Find mentions of taxonomic terms"""
        mentions = []
        text_lower = text.lower()
        
        for keyword in self.taxonomy_keywords:
            if keyword in text_lower:
                mentions.append(keyword)
        
        return list(set(mentions))  # Remove duplicates
    
    def _extract_species_names(self, text: str) -> List[Dict[str, Any]]:
        """Extract potential species names using pattern matching"""
        species_pattern = r'\b([A-Z][a-z]+ [a-z]+)\b'
        matches = re.findall(species_pattern, text)
        
        species_list = []
        for match in matches[:10]:  # Limit to first 10 matches
            species_list.append({
                'scientific_name': match,
                'confidence': 0.7,
                'context': 'extracted_from_document'
            })
        
        return species_list
    
    def _extract_locations(self, text: str) -> List[str]:
        """Extract geographic locations"""
        location_patterns = [
            r'Arabian Sea', r'Indian Ocean', r'Bay of Bengal',
            r'[A-Z][a-z]+ Sea', r'[A-Z][a-z]+ Ocean',
            r'\d+\.?\d*°[NS],?\s*\d+\.?\d*°[EW]'
        ]
        
        locations = []
        for pattern in location_patterns:
            matches = re.findall(pattern, text)
            locations.extend(matches)
        
        return list(set(locations))
    
    def _extract_methodology(self, text: str) -> List[str]:
        """Extract methodology-related keywords"""
        methodology_keywords = [
            'PCR', 'DNA sequencing', 'metabarcoding', 'environmental DNA',
            'eDNA', 'biodiversity assessment', 'species identification',
            'taxonomic classification', 'phylogenetic analysis'
        ]
        
        found_methods = []
        text_lower = text.lower()
        
        for method in methodology_keywords:
            if method.lower() in text_lower:
                found_methods.append(method)
        
        return found_methods
    
    def _calculate_confidence(self, text: str) -> float:
        """Calculate confidence score based on content analysis"""
        score = 0.5  # Base score
        
        # Increase score based on relevant content
        if any(keyword in text.lower() for keyword in self.taxonomy_keywords):
            score += 0.2
        
        if re.search(r'[A-Z][a-z]+ [a-z]+', text):  # Species names
            score += 0.2
        
        if any(method in text.lower() for method in ['pcr', 'dna', 'sequencing']):
            score += 0.1
        
        return min(score, 1.0)

def process_uploaded_documents(document_files: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Process all uploaded documents and return analysis results
    
    Args:
        document_files: List of document file metadata
        
    Returns:
        List of analysis results
    """
    analyzer = DocumentAnalyzer()
    results = []
    
    logger.info(f"[v0] Processing {len(document_files)} documents")
    
    for doc_metadata in document_files:
        try:
            # Simulate file path (in real implementation, this would be the actual file path)
            file_path = doc_metadata.get('storagePath', f"/tmp/{doc_metadata.get('originalName')}")
            
            # Analyze the document
            analysis_result = analyzer.analyze_document(file_path, doc_metadata)
            results.append(analysis_result)
            
        except Exception as e:
            logger.error(f"[v0] Error processing document {doc_metadata.get('originalName')}: {str(e)}")
            results.append({
                'document_id': doc_metadata.get('originalName', 'unknown'),
                'error': str(e),
                'analysis_timestamp': datetime.now().isoformat()
            })
    
    logger.info(f"[v0] Document processing completed. {len(results)} results generated.")
    return results

def integrate_with_taxonomy_database(analysis_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Integrate document analysis results with taxonomy database
    
    Args:
        analysis_results: Results from document analysis
        
    Returns:
        Integration summary
    """
    logger.info("[v0] Integrating analysis results with taxonomy database")
    
    total_species = 0
    new_species = 0
    updated_records = 0
    
    for result in analysis_results:
        if 'species_list' in result:
            species_count = len(result['species_list'])
            total_species += species_count
            
            # Simulate database integration
            new_species += max(0, species_count - 2)  # Assume some are new
            updated_records += min(species_count, 2)  # Assume some update existing
    
    integration_summary = {
        'total_documents_processed': len(analysis_results),
        'total_species_identified': total_species,
        'new_species_added': new_species,
        'updated_records': updated_records,
        'integration_timestamp': datetime.now().isoformat(),
        'status': 'completed'
    }
    
    logger.info(f"[v0] Integration completed: {integration_summary}")
    return integration_summary

if __name__ == "__main__":
    # Example usage
    sample_documents = [
        {
            'originalName': 'marine_biodiversity_study.pdf',
            'storagePath': '/uploads/documents/marine_biodiversity_study.pdf',
            'type': 'document'
        }
    ]
    
    # Process documents
    results = process_uploaded_documents(sample_documents)
    
    # Integrate with database
    integration_summary = integrate_with_taxonomy_database(results)
    
    print(f"Analysis completed. Results: {json.dumps(integration_summary, indent=2)}")
