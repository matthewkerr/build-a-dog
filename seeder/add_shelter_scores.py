#!/usr/bin/env python3
"""
Add shelter availability scores to existing breed data.
This script adds a shelter_availability_score field to each breed based on
how commonly they are found in shelters and rescues.
"""

import json
import os

# Shelter availability scores (1-10) for breeds
# Higher scores = more commonly available in shelters
SHELTER_SCORES = {
    # Score 10: Extremely common in shelters
    "pit bull terrier": 10, "american pit bull terrier": 10, "american staffordshire terrier": 10,
    "chihuahua": 10, "german shepherd": 10, "labrador retriever": 10, "boxer": 10,
    
    # Score 9: Very common in shelters (including popular doodles and terrier mixes)
    "bulldog": 9, "beagle": 9, "dachshund": 9, "rottweiler": 9, "husky": 9,
    "labradoodle": 9, "goldendoodle": 9, "bernedoodle": 9, "aussiedoodle": 9,
    "cockapoo": 9, "maltipoo": 9, "yorkipoo": 9, "peekapoo": 9, "havapoo": 9,
    "cavapoo": 9, "morkie": 9, "newfypoo": 9, "shorkie": 9, "schnoodle": 9,
    "jack russell terrier": 9, "yorkshire terrier": 9, "west highland white terrier": 9,
    "scottish terrier": 9, "cairn terrier": 9, "norwich terrier": 9, "norfolk terrier": 9,
    "border terrier": 9, "welsh terrier": 9, "irish terrier": 9,
    "australian terrier": 9, "silky terrier": 9, "tibetan terrier": 9,
    # Yorkie mixes (extremely common in shelters)
    "yorkipoo": 9, "morkie": 9, "shorkie": 9, "yorkie mix": 9, "yorkshire mix": 9,
    
    # Score 8: Common in shelters
    "golden retriever": 8, "border collie": 8, "australian cattle dog": 8, 
    "great dane": 8, "mastiff": 8, "french bulldog": 8,
    
    # Score 7: Somewhat common in shelters
    "cocker spaniel": 7, "poodle": 7, "bernese mountain dog": 7, 
    "newfoundland": 7, "saint bernard": 7, "miniature poodle": 7, "toy poodle": 7,
    
    # Score 6: Occasionally found in shelters
    "collie": 6, "shetland sheepdog": 6, "australian shepherd": 6, 
    "brittany": 6, "english setter": 6, "irish setter": 6, "english springer spaniel": 6,
    
    # Score 5: Rarely found in shelters
    "vizsla": 5, "weimaraner": 5, "rhodesian ridgeback": 5, "doberman pinscher": 5,
    "german shorthaired pointer": 5, "german wirehaired pointer": 5,
    
    # Score 4: Very rarely found in shelters
    "siberian husky": 4, "alaskan malamute": 4, "samoyed": 4, "chow chow": 4, "akita": 4,
    
    # Score 3: Extremely rare in shelters
    "shiba inu": 3, "basenji": 3, "norwegian elkhound": 3, "finnish spitz": 3, "keeshond": 3,
    
    # Score 2: Almost never in shelters
    "pembroke welsh corgi": 2, "cardigan welsh corgi": 2, "swedish vallhund": 2,
    "icelandic sheepdog": 2, "norwegian buhund": 2,
    
    # Score 1: Virtually never in shelters
    "lapphund": 1, "vallhund": 1, "swedish lapphund": 1, "norwegian lundehund": 1
}

def get_shelter_score(breed_name):
    """Get shelter availability score for a breed."""
    breed_lower = breed_name.lower().strip()
    
    # Check exact match first
    if breed_lower in SHELTER_SCORES:
        return SHELTER_SCORES[breed_lower]
    
    # Special handling for doodles and terrier mixes
    if any(doodle in breed_lower for doodle in ['doodle', 'poo', 'mix']):
        return 9  # Most doodles and mixes are very common in shelters
    
    # Check for terrier variations
    if 'terrier' in breed_lower:
        # Most terriers are common in shelters
        return 8
    
    # Check for Yorkie variations (very common in shelters)
    if any(yorkie in breed_lower for yorkie in ['yorkie', 'yorkshire', 'york']):
        return 9  # Yorkies and Yorkie mixes are extremely common in shelters
    
    # Check partial matches for variations
    for key, score in SHELTER_SCORES.items():
        if key in breed_lower or breed_lower in key:
            return score
    
    # Default score for breeds not in our research
    return 5

def add_shelter_scores():
    """Add shelter availability scores to breed data."""
    
    # Load existing breed data
    input_file = "dog_breeds_corrected.json"
    output_file = "dog_breeds_with_shelter_scores.json"
    
    if not os.path.exists(input_file):
        print(f"❌ Input file {input_file} not found!")
        return
    
    print(f"📖 Loading breed data from {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        breeds = json.load(f)
    
    print(f"🐕 Found {len(breeds)} breeds to process")
    
    # Add shelter scores to each breed
    updated_breeds = []
    for breed in breeds:
        breed_copy = breed.copy()
        breed_copy['shelter_availability_score'] = get_shelter_score(breed['breed'])
        updated_breeds.append(breed_copy)
    
    # Save updated data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(updated_breeds, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Updated breed data saved to {output_file}")
    
    # Show some examples
    print("\n📊 Sample breeds with shelter scores:")
    for breed in updated_breeds[:10]:
        score = breed['shelter_availability_score']
        print(f"  {breed['breed']}: Score {score}")
    
    # Count by score
    score_counts = {}
    for breed in updated_breeds:
        score = breed['shelter_availability_score']
        score_counts[score] = score_counts.get(score, 0) + 1
    
    print("\n📈 Score distribution:")
    for score in sorted(score_counts.keys()):
        count = score_counts[score]
        print(f"  Score {score}: {count} breeds")

if __name__ == "__main__":
    add_shelter_scores()
