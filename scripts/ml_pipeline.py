"""
EDNA Biodiversity ML Pipeline
Advanced machine learning pipeline for taxonomic identification from eDNA sequences
"""

import numpy as np
import pandas as pd
import json
from datetime import datetime
from typing import Dict, List, Tuple, Optional
import re

class EDNAMLPipeline:
    """Main ML pipeline for eDNA sequence analysis and taxonomic identification"""
    
    def __init__(self):
        self.sequence_db = self._load_reference_database()
        self.taxonomy_hierarchy = self._load_taxonomy_hierarchy()
        self.ml_models = self._initialize_models()
        
    def _load_reference_database(self) -> Dict:
        """Load reference sequence database (simulated)"""
        return {
            "sequences": {
                "ATCGATCGATCGATCG": {"species": "Gadus morhua", "confidence": 0.95},
                "GCTAGCTAGCTAGCTA": {"species": "Calanus finmarchicus", "confidence": 0.92},
                "TTAATTAATTAATTAA": {"species": "Mytilus edulis", "confidence": 0.88},
                "CGGCCGGCCGGCCGGC": {"species": "Fucus vesiculosus", "confidence": 0.91},
            },
            "metadata": {
                "version": "2024.1",
                "total_sequences": 12847,
                "last_updated": "2024-01-15"
            }
        }
    
    def _load_taxonomy_hierarchy(self) -> Dict:
        """Load taxonomic hierarchy data"""
        return {
            "Gadus morhua": {
                "kingdom": "Animalia",
                "phylum": "Chordata", 
                "class": "Actinopterygii",
                "order": "Gadiformes",
                "family": "Gadidae",
                "genus": "Gadus",
                "species": "Gadus morhua"
            },
            "Calanus finmarchicus": {
                "kingdom": "Animalia",
                "phylum": "Arthropoda",
                "class": "Copepoda", 
                "order": "Calanoida",
                "family": "Calanidae",
                "genus": "Calanus",
                "species": "Calanus finmarchicus"
            },
            "Mytilus edulis": {
                "kingdom": "Animalia",
                "phylum": "Mollusca",
                "class": "Bivalvia",
                "order": "Mytilida", 
                "family": "Mytilidae",
                "genus": "Mytilus",
                "species": "Mytilus edulis"
            }
        }
    
    def _initialize_models(self) -> Dict:
        """Initialize ML models for sequence analysis"""
        return {
            "sequence_classifier": "RandomForest_v2.1",
            "taxonomy_predictor": "DeepNN_v1.3", 
            "quality_assessor": "SVM_v1.0",
            "diversity_calculator": "Custom_v2.0"
        }
    
    def preprocess_sequence(self, sequence: str) -> Dict:
        """Preprocess raw DNA sequence data"""
        # Clean sequence
        clean_seq = re.sub(r'[^ATCG]', '', sequence.upper())
        
        # Quality metrics
        gc_content = (clean_seq.count('G') + clean_seq.count('C')) / len(clean_seq) if clean_seq else 0
        length = len(clean_seq)
        
        # Complexity analysis
        complexity_score = len(set(clean_seq)) / 4.0 if clean_seq else 0
        
        return {
            "cleaned_sequence": clean_seq,
            "length": length,
            "gc_content": gc_content,
            "complexity_score": complexity_score,
            "quality_score": min(1.0, (gc_content * complexity_score * (length / 500)))
        }
    
    def identify_species(self, sequence: str) -> Dict:
        """Identify species from DNA sequence using ML models"""
        processed = self.preprocess_sequence(sequence)
        
        if processed["quality_score"] < 0.3:
            return {
                "status": "low_quality",
                "message": "Sequence quality too low for reliable identification",
                "quality_score": processed["quality_score"]
            }
        
        # Simulate ML-based species identification
        best_match = None
        best_score = 0
        
        for ref_seq, data in self.sequence_db["sequences"].items():
            # Simplified similarity calculation
            similarity = self._calculate_similarity(processed["cleaned_sequence"], ref_seq)
            if similarity > best_score:
                best_score = similarity
                best_match = data
        
        if best_score > 0.7:
            species = best_match["species"]
            taxonomy = self.taxonomy_hierarchy.get(species, {})
            
            return {
                "status": "identified",
                "species": species,
                "confidence": best_score * best_match["confidence"],
                "taxonomy": taxonomy,
                "quality_score": processed["quality_score"],
                "sequence_length": processed["length"],
                "gc_content": processed["gc_content"]
            }
        else:
            return {
                "status": "unknown",
                "message": "No reliable match found in reference database",
                "best_similarity": best_score,
                "quality_score": processed["quality_score"]
            }
    
    def _calculate_similarity(self, seq1: str, seq2: str) -> float:
        """Calculate sequence similarity (simplified)"""
        if not seq1 or not seq2:
            return 0.0
        
        min_len = min(len(seq1), len(seq2))
        matches = sum(1 for i in range(min_len) if seq1[i] == seq2[i])
        return matches / min_len
    
    def analyze_biodiversity(self, sequences: List[str]) -> Dict:
        """Analyze biodiversity metrics from multiple sequences"""
        results = []
        species_counts = {}
        
        for seq in sequences:
            result = self.identify_species(seq)
            results.append(result)
            
            if result["status"] == "identified":
                species = result["species"]
                species_counts[species] = species_counts.get(species, 0) + 1
        
        # Calculate diversity metrics
        total_identified = len([r for r in results if r["status"] == "identified"])
        unique_species = len(species_counts)
        
        # Shannon diversity index
        shannon_diversity = 0
        if total_identified > 0:
            for count in species_counts.values():
                p = count / total_identified
                shannon_diversity -= p * np.log(p)
        
        return {
            "total_sequences": len(sequences),
            "identified_sequences": total_identified,
            "unique_species": unique_species,
            "species_counts": species_counts,
            "shannon_diversity": shannon_diversity,
            "identification_rate": total_identified / len(sequences) if sequences else 0,
            "results": results
        }
    
    def generate_report(self, analysis_results: Dict) -> Dict:
        """Generate comprehensive analysis report"""
        return {
            "report_id": f"EDNA_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "total_sequences_analyzed": analysis_results["total_sequences"],
                "successful_identifications": analysis_results["identified_sequences"],
                "unique_species_detected": analysis_results["unique_species"],
                "biodiversity_index": round(analysis_results["shannon_diversity"], 3),
                "identification_success_rate": round(analysis_results["identification_rate"] * 100, 1)
            },
            "species_composition": analysis_results["species_counts"],
            "detailed_results": analysis_results["results"],
            "recommendations": self._generate_recommendations(analysis_results),
            "metadata": {
                "pipeline_version": "EDNA_ML_v2.1",
                "reference_db_version": self.sequence_db["metadata"]["version"],
                "models_used": list(self.ml_models.values())
            }
        }
    
    def _generate_recommendations(self, results: Dict) -> List[str]:
        """Generate recommendations based on analysis results"""
        recommendations = []
        
        if results["identification_rate"] < 0.5:
            recommendations.append("Consider improving sequence quality or using additional primers")
        
        if results["unique_species"] < 5:
            recommendations.append("Low species diversity detected - consider sampling additional locations")
        
        if results["shannon_diversity"] > 2.0:
            recommendations.append("High biodiversity detected - ecosystem appears healthy")
        
        return recommendations

# Example usage and testing
if __name__ == "__main__":
    pipeline = EDNAMLPipeline()
    
    # Test sequences
    test_sequences = [
        "ATCGATCGATCGATCGATCGATCG",
        "GCTAGCTAGCTAGCTAGCTAGCTA", 
        "TTAATTAATTAATTAATTAATTAA",
        "CGGCCGGCCGGCCGGCCGGCCGGC",
        "NNNATCGATCGATCGANNNN"  # Low quality sequence
    ]
    
    print("EDNA Biodiversity ML Pipeline - Test Run")
    print("=" * 50)
    
    # Analyze biodiversity
    results = pipeline.analyze_biodiversity(test_sequences)
    report = pipeline.generate_report(results)
    
    print(f"Analysis Complete!")
    print(f"Report ID: {report['report_id']}")
    print(f"Species Identified: {report['summary']['unique_species_detected']}")
    print(f"Biodiversity Index: {report['summary']['biodiversity_index']}")
    print(f"Success Rate: {report['summary']['identification_success_rate']}%")
    
    print("\nSpecies Composition:")
    for species, count in report['species_composition'].items():
        print(f"  {species}: {count} sequences")
    
    print(f"\nRecommendations:")
    for rec in report['recommendations']:
        print(f"  • {rec}")
