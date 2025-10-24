#!/usr/bin/env python3
"""
Fix all dog breed size classifications based on correct weight standards.
Using the proper classification:
- Toy: Under 10-12 pounds
- Small: 12-25 pounds  
- Medium: 25-60 pounds
- Large: 60+ pounds
- Giant: 100+ pounds
"""

import json
import re

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_fully_corrected.json', 'r') as f:
        return json.load(f)

def extract_weight_from_description(description):
    """Extract weight range from breed description."""
    # Look for weight patterns like "weighs 20-30 pounds" or "20 to 30 lbs"
    weight_patterns = [
        r'weighs?\s*(\d+)\s*[-–]\s*(\d+)\s*pounds?',  # weighs 20-30 pounds
        r'(\d+)\s*[-–]\s*(\d+)\s*pounds?',             # 20-30 pounds
        r'(\d+)\s*to\s*(\d+)\s*pounds?',                # 20 to 30 pounds
        r'(\d+)\s*[-–]\s*(\d+)\s*lbs?',                 # 20-30 lbs
        r'(\d+)\s*to\s*(\d+)\s*lbs?',                   # 20 to 30 lbs
        r'(\d+)\s*pounds?',                              # 20 pounds (single weight)
        r'(\d+)\s*lbs?',                                 # 20 lbs (single weight)
    ]
    
    for pattern in weight_patterns:
        matches = re.findall(pattern, description, re.IGNORECASE)
        if matches:
            if len(matches[0]) == 2:  # Range like 20-30
                try:
                    min_weight = int(matches[0][0])
                    max_weight = int(matches[0][1])
                    return min_weight, max_weight
                except ValueError:
                    continue
            elif len(matches[0]) == 1:  # Single weight like 20
                try:
                    weight = int(matches[0])
                    return weight, weight
                except ValueError:
                    continue
    
    return None, None

def classify_size_by_weight(min_weight, max_weight):
    """Classify size based on weight range."""
    if min_weight is None or max_weight is None:
        return "Medium"  # Default fallback
    
    # Use the higher end of the weight range for classification
    weight = max_weight
    
    if weight < 12:
        return "Toy"
    elif weight < 25:
        return "Small"
    elif weight < 60:
        return "Medium"
    elif weight < 100:
        return "Large"
    else:
        return "Giant"

def fix_sizes_by_weight():
    """Fix all breed size classifications based on weight."""
    breeds = load_breed_data()
    
    print(f"🔍 Fixing size classifications based on weight standards...")
    print(f"📊 Found {len(breeds)} breeds to review")
    
    # Define the correct weight standards
    weight_standards = {
        "Toy": "Under 10-12 pounds",
        "Small": "12-25 pounds", 
        "Medium": "25-60 pounds",
        "Large": "60+ pounds",
        "Giant": "100+ pounds"
    }
    
    print(f"\n📏 Weight-based size standards:")
    for size, standard in weight_standards.items():
        print(f"   {size}: {standard}")
    
    changes_made = 0
    size_distribution = {}
    
    for breed in breeds:
        breed_name = breed['breed']
        old_size = breed['size']
        description = breed.get('description', '')
        
        # Extract weight from description
        min_weight, max_weight = extract_weight_from_description(description)
        
        if min_weight is not None and max_weight is not None:
            new_size = classify_size_by_weight(min_weight, max_weight)
            
            if old_size != new_size:
                print(f"🔧 Fixing {breed_name}: {old_size} → {new_size} (Weight: {min_weight}-{max_weight} lbs)")
                breed['size'] = new_size
                changes_made += 1
            else:
                print(f"✅ {breed_name}: Already correct ({new_size}) - Weight: {min_weight}-{max_weight} lbs")
        else:
            # For breeds without clear weight info, use breed-specific knowledge
            new_size = get_size_from_breed_knowledge(breed_name, old_size)
            if new_size != old_size:
                print(f"🔧 Fixing {breed_name}: {old_size} → {new_size} (Based on breed knowledge)")
                breed['size'] = new_size
                changes_made += 1
            else:
                print(f"✅ {breed_name}: Using existing size ({old_size}) - No weight info found")
        
        # Track size distribution
        current_size = breed['size']
        size_distribution[current_size] = size_distribution.get(current_size, 0) + 1
    
    print(f"\n📊 Summary:")
    print(f"   Total breeds reviewed: {len(breeds)}")
    print(f"   Changes made: {changes_made}")
    
    print(f"\n📏 Final size distribution:")
    for size in ['Toy', 'Small', 'Medium', 'Large', 'Giant']:
        count = size_distribution.get(size, 0)
        print(f"   {size}: {count} breeds")
    
    # Save corrected data
    output_file = 'seeder/dog_breeds_weight_corrected.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"\n💾 Corrected data saved to: {output_file}")
    
    return output_file

def get_size_from_breed_knowledge(breed_name, current_size):
    """Use breed-specific knowledge for breeds without clear weight info."""
    breed_knowledge = {
        # Toy breeds (under 12 lbs)
        "Chihuahua": "Toy",
        "Yorkshire Terrier": "Toy", 
        "Maltese": "Toy",
        "Pomeranian": "Toy",
        "Papillon": "Toy",
        "Pekingese": "Toy",
        "Japanese Chin": "Toy",
        "Toy Fox Terrier": "Toy",
        "Toy Manchester Terrier": "Toy",
        "Norwich Terrier": "Toy",
        "Norfolk Terrier": "Toy",
        "Silky Terrier": "Toy",
        "Cairn Terrier": "Toy",
        "Dandie Dinmont Terrier": "Toy",
        "Miniature Pinscher": "Toy",
        "Affenpinscher": "Toy",
        "Brussels Griffon": "Toy",
        "Italian Greyhound": "Toy",
        "Havanese": "Toy",
        "Bichon Frise": "Toy",
        "Chinese Crested": "Toy",
        "Miniature Poodle": "Toy",
        
        # Small breeds (12-25 lbs)
        "Boston Terrier": "Small",
        "French Bulldog": "Small",
        "Beagle": "Small",
        "Dachshund": "Small",
        "Miniature Schnauzer": "Small",
        "Jack Russell Terrier": "Small",
        "Scottish Terrier": "Small",
        "West Highland White Terrier": "Small",
        "Manchester Terrier": "Small",
        "Rat Terrier": "Small",
        "Lakeland Terrier": "Small",
        "Sealyham Terrier": "Small",
        "Smooth Fox Terrier": "Small",
        "Cocker Spaniel": "Small",
        "Cavalier King Charles Spaniel": "Small",
        "Shetland Sheepdog": "Small",
        "Pembroke Welsh Corgi": "Small",
        "Cardigan Welsh Corgi": "Small",
        "Bolognese": "Small",
        "Puggle": "Small",
        "Yorkipoo": "Small",
        "Maltipoo": "Small",
        "Cockapoo": "Small",
        "Cavapoo": "Small",
        "Chiweenie": "Small",
        
        # Medium breeds (25-60 lbs)
        "Bulldog": "Medium",
        "English Bulldog": "Medium",
        "Staffordshire Bull Terrier": "Medium",
        "Miniature Bull Terrier": "Medium",
        "German Shepherd": "Medium",
        "Golden Retriever": "Medium",
        "Labrador Retriever": "Medium",
        "Border Collie": "Medium",
        "Australian Shepherd": "Medium",
        "Boxer": "Medium",
        "Poodle": "Medium",
        "Rottweiler": "Medium",
        "Doberman Pinscher": "Medium",
        "Akita": "Medium",
        "Siberian Husky": "Medium",
        "Alaskan Malamute": "Medium",
        "Samoyed": "Medium",
        "Chow Chow": "Medium",
        "Shar Pei": "Medium",
        "Bernese Mountain Dog": "Medium",
        "Collie": "Medium",
        "Rhodesian Ridgeback": "Medium",
        "Dalmatian": "Medium",
        "Vizsla": "Medium",
        "Weimaraner": "Medium",
        "Pointer": "Medium",
        "English Setter": "Medium",
        "Irish Setter": "Medium",
        "Gordon Setter": "Medium",
        "Brittany": "Medium",
        "English Springer Spaniel": "Medium",
        "English Cocker Spaniel": "Medium",
        "Field Spaniel": "Medium",
        "Welsh Springer Spaniel": "Medium",
        "Clumber Spaniel": "Medium",
        "Sussex Spaniel": "Medium",
        "Irish Water Spaniel": "Medium",
        "German Shorthaired Pointer": "Medium",
        "German Wirehaired Pointer": "Medium",
        "Basset Hound": "Medium",
        "Newfoundland": "Medium",
        "Saint Bernard": "Medium",
        "Mastiff": "Medium",
        "Neapolitan Mastiff": "Medium",
        "Tibetan Mastiff": "Medium",
        "Cane Corso": "Medium",
        "Boerboel": "Medium",
        "Belgian Malinois": "Medium",
        "Belgian Sheepdog": "Medium",
        "Belgian Tervuren": "Medium",
        "Belgian Laekenois": "Medium",
        "Dutch Shepherd": "Medium",
        "Briard": "Medium",
        "Beauceron": "Medium",
        "Berger Picard": "Medium",
        "Polish Lowland Sheepdog": "Medium",
        "Old English Sheepdog": "Medium",
        "Greater Swiss Mountain Dog": "Medium",
        "Leonberger": "Medium",
        "Spanish Mastiff": "Medium",
        "Goldendoodle": "Medium",
        "Labradoodle": "Medium",
        "Aussiedoodle": "Medium",
        "Schnoodle": "Medium",
        "Pitsky": "Medium",
        
        # Large breeds (60+ lbs)
        "American Bulldog": "Large",
        "Alapaha Blue Blood Bulldog": "Large",
        "American Pit Bull Terrier": "Large",
        "American Staffordshire Terrier": "Large",
        "Black Russian Terrier": "Large",
        "Giant Schnauzer": "Large",
        "Standard Schnauzer": "Large",
        "Airedale Terrier": "Large",
        "Bull Terrier": "Large",
        "Standard Bull Terrier": "Large",
        "American Foxhound": "Large",
        "English Foxhound": "Large",
        "Treeing Walker Coonhound": "Large",
        "Bluetick Coonhound": "Large",
        "Redbone Coonhound": "Large",
        "Plott Hound": "Large",
        "Black and Tan Coonhound": "Large",
        "Bloodhound": "Large",
        "Harrier": "Large",
        "Otterhound": "Large",
        "Petit Basset Griffon Vendéen": "Large",
        "Basset Fauve de Bretagne": "Large",
        "Grand Basset Griffon Vendéen": "Large",
        "Basset Artésien Normand": "Large",
        "Basset Bleu de Gascogne": "Large",
        
        # Giant breeds (100+ lbs)
        "Great Dane": "Giant",
        "Irish Wolfhound": "Giant",
        "Scottish Deerhound": "Giant",
    }
    
    return breed_knowledge.get(breed_name, current_size)

if __name__ == "__main__":
    print("🔧 Fixing size classifications based on weight standards...")
    
    try:
        output_file = fix_sizes_by_weight()
        print(f"\n✅ All size classifications fixed based on weight!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. All breed sizes should now be accurate based on weight!")
        
    except Exception as e:
        print(f"❌ Error during size correction: {e}")
        import traceback
        traceback.print_exc()
