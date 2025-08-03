#!/usr/bin/env python3
"""
Script to fix the corrupted dog breed dataset by matching breed names
with accurate data from the AKC dataset.
"""

import json
import csv
import re
from typing import Dict, List, Optional

def load_corrupted_breeds() -> List[str]:
    """Extract breed names from the corrupted dataset (names are correct)."""
    with open('dog_breeds_cleaned_real.json', 'r') as f:
        corrupted_data = json.load(f)
    
    breed_names = [breed['breed'] for breed in corrupted_data]
    print(f"Found {len(breed_names)} breed names in corrupted dataset")
    return breed_names

def load_akc_data() -> Dict[str, Dict]:
    """Load and parse the AKC dataset."""
    akc_breeds = {}
    
    with open('akc-data-latest.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            breed_name = row[''].strip()  # First column is breed name
            akc_breeds[breed_name] = row
    
    print(f"Loaded {len(akc_breeds)} breeds from AKC dataset")
    return akc_breeds

def normalize_breed_name(name: str) -> str:
    """Normalize breed names for better matching."""
    # Remove common variations and normalize
    name = name.strip()
    name = re.sub(r'\s+', ' ', name)  # Multiple spaces to single
    
    # Handle common variations
    variations = {
        'Pit Bull': 'American Pit Bull Terrier',
        'Pitbull': 'American Pit Bull Terrier',
        'German Shorthaired Pointer': 'German Shorthaired Pointer',
        'Cocker Spaniel': 'Cocker Spaniel',
        'English Springer Spaniel': 'English Springer Spaniel',
        'Pembroke Welsh Corgi': 'Pembroke Welsh Corgi',
        'Cardigan Welsh Corgi': 'Cardigan Welsh Corgi',
    }
    
    return variations.get(name, name)

def find_best_match(target_breed: str, akc_breeds: Dict[str, Dict]) -> Optional[Dict]:
    """Find the best matching breed in AKC data."""
    target_normalized = normalize_breed_name(target_breed)
    
    # Exact match first
    if target_normalized in akc_breeds:
        return akc_breeds[target_normalized]
    
    # Try partial matches
    for akc_breed in akc_breeds:
        if target_normalized.lower() in akc_breed.lower() or akc_breed.lower() in target_normalized.lower():
            return akc_breeds[akc_breed]
    
    # Try word-by-word matching
    target_words = set(target_normalized.lower().split())
    best_match = None
    best_score = 0
    
    for akc_breed in akc_breeds:
        akc_words = set(akc_breed.lower().split())
        common_words = target_words.intersection(akc_words)
        score = len(common_words) / max(len(target_words), len(akc_words))
        
        if score > best_score and score > 0.5:  # At least 50% word match
            best_score = score
            best_match = akc_breeds[akc_breed]
    
    return best_match

def map_size(min_height: float, max_height: float) -> str:
    """Map height to size categories."""
    avg_height = (min_height + max_height) / 2
    
    # Convert cm to inches for easier categorization
    avg_height_inches = avg_height / 2.54
    
    if avg_height_inches <= 10:
        return "Toy"
    elif avg_height_inches <= 16:
        return "Small"
    elif avg_height_inches <= 24:
        return "Medium"
    else:
        return "Large"

def map_energy_level(energy_value: float, energy_category: str) -> str:
    """Map AKC energy data to our categories."""
    if energy_value <= 0.4:
        return "Low"
    elif energy_value <= 0.7:
        return "Moderate"
    else:
        return "High"

def map_trainability(trainability_value: float, trainability_category: str) -> str:
    """Map AKC trainability data to our categories."""
    if trainability_value <= 0.4:
        return "Low"
    elif trainability_value <= 0.7:
        return "Medium"
    else:
        return "High"

def map_grooming(grooming_value: float, grooming_category: str) -> str:
    """Map AKC grooming data to our categories."""
    if grooming_value <= 0.4:
        return "Low"
    elif grooming_value <= 0.7:
        return "Medium"
    else:
        return "High"

def determine_good_with_kids(temperament: str, demeanor_category: str) -> bool:
    """Determine if breed is good with kids based on temperament."""
    kid_friendly_traits = [
        'gentle', 'patient', 'friendly', 'calm', 'even-tempered', 
        'good-natured', 'tolerant', 'playful', 'affectionate'
    ]
    
    kid_unfriendly_traits = [
        'aggressive', 'dominant', 'territorial', 'aloof', 'wary',
        'suspicious', 'protective', 'reserved'
    ]
    
    temp_lower = temperament.lower()
    demeanor_lower = demeanor_category.lower()
    
    # Check for kid-friendly traits
    friendly_score = sum(1 for trait in kid_friendly_traits if trait in temp_lower or trait in demeanor_lower)
    unfriendly_score = sum(1 for trait in kid_unfriendly_traits if trait in temp_lower or trait in demeanor_lower)
    
    # Default to True if no strong indicators either way
    return friendly_score >= unfriendly_score

def determine_good_with_pets(temperament: str, demeanor_category: str) -> bool:
    """Determine if breed is good with other pets."""
    pet_friendly_traits = [
        'social', 'friendly', 'gentle', 'tolerant', 'easy-going',
        'peaceful', 'good-natured'
    ]
    
    pet_unfriendly_traits = [
        'dominant', 'territorial', 'aggressive', 'prey drive',
        'hunting', 'chasing', 'protective'
    ]
    
    temp_lower = temperament.lower()
    demeanor_lower = demeanor_category.lower()
    
    friendly_score = sum(1 for trait in pet_friendly_traits if trait in temp_lower or trait in demeanor_lower)
    unfriendly_score = sum(1 for trait in pet_unfriendly_traits if trait in temp_lower or trait in demeanor_lower)
    
    return friendly_score > unfriendly_score

def determine_role(group: str, temperament: str) -> str:
    """Determine primary role based on breed group and temperament."""
    guardian_groups = ['Working Group', 'Herding Group']
    guardian_traits = ['protective', 'guard', 'courageous', 'alert', 'watchful']
    
    temp_lower = temperament.lower()
    
    if group in guardian_groups or any(trait in temp_lower for trait in guardian_traits):
        # Check if also good companion traits
        companion_traits = ['friendly', 'affectionate', 'gentle', 'loyal']
        if any(trait in temp_lower for trait in companion_traits):
            return "Both"
        else:
            return "Guardian"
    
    return "Companion"

def create_breed_entry(breed_name: str, akc_data: Dict) -> Dict:
    """Create a breed entry in our format from AKC data."""
    try:
        min_height = float(akc_data.get('min_height', 30))
        max_height = float(akc_data.get('max_height', 40))
        energy_value = float(akc_data.get('energy_level_value', 0.5))
        trainability_value = float(akc_data.get('trainability_value', 0.5))
        grooming_value = float(akc_data.get('grooming_frequency_value', 0.5))
        
        temperament = akc_data.get('temperament', '')
        energy_category = akc_data.get('energy_level_category', '')
        trainability_category = akc_data.get('trainability_category', '')
        grooming_category = akc_data.get('grooming_frequency_category', '')
        demeanor_category = akc_data.get('demeanor_category', '')
        group = akc_data.get('group', '')
        description = akc_data.get('description', f"{breed_name} is a wonderful breed suitable for adoption.")
        
        # Create breed entry
        breed_entry = {
            "breed": breed_name,
            "size": map_size(min_height, max_height),
            "energy_level": map_energy_level(energy_value, energy_category),
            "good_with_kids": 1 if determine_good_with_kids(temperament, demeanor_category) else 0,
            "good_with_pets": 1 if determine_good_with_pets(temperament, demeanor_category) else 0,
            "trainability": map_trainability(trainability_value, trainability_category),
            "grooming_needs": map_grooming(grooming_value, grooming_category),
            "companion_or_guardian": determine_role(group, temperament),
            "senior_friendly": 1,  # Most breeds can be senior friendly with proper care
            "special_needs_possible": 1,  # Most breeds may have special needs individuals
            "description": description[:200] + "..." if len(description) > 200 else description,
            "image_filename": f"{breed_name.lower().replace(' ', '_').replace('-', '_')}.jpg"
        }
        
        return breed_entry
        
    except Exception as e:
        print(f"Error processing {breed_name}: {e}")
        return None

def create_fallback_entry(breed_name: str) -> Dict:
    """Create a fallback entry for breeds not found in AKC data."""
    return {
        "breed": breed_name,
        "size": "Medium",
        "energy_level": "Moderate",
        "good_with_kids": 1,
        "good_with_pets": 1,
        "trainability": "Medium",
        "grooming_needs": "Medium",
        "companion_or_guardian": "Companion",
        "senior_friendly": 1,
        "special_needs_possible": 1,
        "description": f"{breed_name} is a wonderful breed that can make a great companion for the right family. Available through shelters and rescues.",
        "image_filename": f"{breed_name.lower().replace(' ', '_').replace('-', '_')}.jpg"
    }

def main():
    print("Starting breed data correction process...")
    
    # Load data
    breed_names = load_corrupted_breeds()
    akc_breeds = load_akc_data()
    
    # Process breeds
    corrected_breeds = []
    matched_count = 0
    fallback_count = 0
    
    for breed_name in breed_names:
        print(f"Processing: {breed_name}")
        
        # Find matching AKC data
        akc_match = find_best_match(breed_name, akc_breeds)
        
        if akc_match:
            breed_entry = create_breed_entry(breed_name, akc_match)
            if breed_entry:
                corrected_breeds.append(breed_entry)
                matched_count += 1
                print(f"  ✓ Matched with AKC data")
            else:
                corrected_breeds.append(create_fallback_entry(breed_name))
                fallback_count += 1
                print(f"  ⚠ Used fallback (processing error)")
        else:
            corrected_breeds.append(create_fallback_entry(breed_name))
            fallback_count += 1
            print(f"  ⚠ Used fallback (no match found)")
    
    # Save corrected data
    with open('dog_breeds_corrected.json', 'w') as f:
        json.dump(corrected_breeds, f, indent=2)
    
    print(f"\n✅ Correction complete!")
    print(f"Total breeds: {len(corrected_breeds)}")
    print(f"Matched with AKC data: {matched_count}")
    print(f"Used fallback data: {fallback_count}")
    print(f"Saved to: dog_breeds_corrected.json")

if __name__ == "__main__":
    main()