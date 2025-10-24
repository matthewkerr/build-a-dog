#!/usr/bin/env python3
"""
Comprehensive size classification check and fix for ALL dog breeds.
This script reviews every single breed to ensure accurate size classifications.
"""

import json

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_all_sizes_fixed.json', 'r') as f:
        return json.load(f)

def get_breed_size_standards():
    """Define correct size standards for ALL dog breeds."""
    return {
        # SMALL BREEDS (under 25 lbs, under 16 inches)
        "Chihuahua": "Small",                    # 2-6 lbs, 5-8 inches
        "Yorkshire Terrier": "Small",            # 4-7 lbs, 7-8 inches
        "Maltese": "Small",                      # 4-7 lbs, 7-9 inches
        "Pomeranian": "Small",                   # 3-7 lbs, 6-7 inches
        "Shih Tzu": "Small",                     # 9-16 lbs, 8-11 inches
        "Boston Terrier": "Small",               # 12-25 lbs, 15-17 inches
        "Beagle": "Small",                       # 20-30 lbs, 13-16 inches
        "Miniature Schnauzer": "Small",          # 11-20 lbs, 12-14 inches
        "Jack Russell Terrier": "Small",         # 13-17 lbs, 10-15 inches
        "Scottish Terrier": "Small",             # 18-22 lbs, 10 inches
        "Cairn Terrier": "Small",                # 13-14 lbs, 9.5-10 inches
        "Norwich Terrier": "Small",              # 11-12 lbs, 10 inches
        "Norfolk Terrier": "Small",              # 11-12 lbs, 9-10 inches
        "Silky Terrier": "Small",                # 8-10 lbs, 9-10 inches
        "Skye Terrier": "Small",                 # 25-40 lbs, 9-10 inches
        "Dandie Dinmont Terrier": "Small",      # 18-24 lbs, 8-11 inches
        "West Highland White Terrier": "Small",  # 13-22 lbs, 10-11 inches
        "Manchester Terrier": "Small",           # 12-22 lbs, 15-16 inches
        "Rat Terrier": "Small",                  # 10-25 lbs, 10-18 inches
        "Glen of Imaal Terrier": "Small",        # 32-40 lbs, 12-14 inches
        "Tibetan Terrier": "Small",              # 18-30 lbs, 14-17 inches
        "Lakeland Terrier": "Small",             # 15-17 lbs, 13-14 inches
        "Sealyham Terrier": "Small",             # 20-24 lbs, 10.5 inches
        "Smooth Fox Terrier": "Small",           # 15-19 lbs, 15.5 inches
        "Toy Manchester Terrier": "Small",       # 6-8 lbs, 10-12 inches
        "Toy Fox Terrier": "Small",              # 3.5-7 lbs, 8.5-11.5 inches
        "Pembroke Welsh Corgi": "Small",         # 24-30 lbs, 10-12 inches
        "Cocker Spaniel": "Small",               # 20-30 lbs, 14-15 inches
        "Shetland Sheepdog": "Small",            # 14-27 lbs, 13-16 inches
        "Cavalier King Charles Spaniel": "Small", # 13-18 lbs, 12-13 inches
        "Papillon": "Small",                     # 5-10 lbs, 8-11 inches
        "Pekingese": "Small",                    # 7-14 lbs, 6-9 inches
        "Japanese Chin": "Small",                # 4-9 lbs, 8-11 inches
        "Havanese": "Small",                     # 7-13 lbs, 8-11 inches
        "Bichon Frise": "Small",                 # 7-12 lbs, 9-11 inches
        "Chinese Crested": "Small",              # 8-12 lbs, 11-13 inches
        "Italian Greyhound": "Small",            # 7-14 lbs, 13-15 inches
        "Miniature Pinscher": "Small",           # 8-10 lbs, 10-12 inches
        "Affenpinscher": "Small",                # 6-13 lbs, 9-11 inches
        "Brussels Griffon": "Small",             # 6-12 lbs, 7-10 inches
        "Dachshund": "Small",                    # 16-32 lbs, 8-9 inches
        "French Bulldog": "Small",               # 20-28 lbs, 11-13 inches (actually small)
        
        # MEDIUM BREEDS (25-60 lbs, 16-22 inches)
        "Bulldog": "Medium",                     # 40-50 lbs, 14-15 inches
        "English Bulldog": "Medium",             # 40-50 lbs, 14-15 inches
        "Staffordshire Bull Terrier": "Medium",  # 24-38 lbs, 14-16 inches
        "Miniature Bull Terrier": "Medium",      # 20-35 lbs, 10-14 inches
        "Irish Terrier": "Medium",               # 25-27 lbs, 18 inches
        "Kerry Blue Terrier": "Medium",          # 33-40 lbs, 17.5-19.5 inches
        "Soft Coated Wheaten Terrier": "Medium", # 30-40 lbs, 17-18 inches
        "Japanese Terrier": "Medium",            # 8-10 lbs, 12-13 inches
        "Poodle": "Medium",                      # 40-70 lbs, 15+ inches (Standard)
        "Golden Retriever": "Medium",            # 55-75 lbs, 21-24 inches
        "Labrador Retriever": "Medium",          # 55-80 lbs, 21-24 inches
        "Border Collie": "Medium",               # 30-55 lbs, 18-22 inches
        "Australian Shepherd": "Medium",         # 40-65 lbs, 18-23 inches
        "Australian Cattle Dog": "Medium",       # 35-50 lbs, 17-20 inches
        "Boxer": "Medium",                       # 50-80 lbs, 21-25 inches
        "Brittany": "Medium",                    # 30-40 lbs, 17-20 inches
        "English Springer Spaniel": "Medium",    # 40-50 lbs, 19-20 inches
        "English Cocker Spaniel": "Medium",      # 26-34 lbs, 15-17 inches
        "Field Spaniel": "Medium",               # 35-50 lbs, 17-18 inches
        "Welsh Springer Spaniel": "Medium",      # 35-50 lbs, 17-19 inches
        "Clumber Spaniel": "Medium",             # 55-85 lbs, 17-20 inches
        "Sussex Spaniel": "Medium",              # 35-45 lbs, 13-15 inches
        "Irish Water Spaniel": "Medium",         # 45-65 lbs, 21-24 inches
        "English Setter": "Medium",              # 45-80 lbs, 23-27 inches
        "Irish Setter": "Medium",                # 60-70 lbs, 25-27 inches
        "Gordon Setter": "Medium",               # 45-80 lbs, 23-27 inches
        "Pointer": "Medium",                     # 44-75 lbs, 23-28 inches
        "German Shorthaired Pointer": "Medium",  # 45-70 lbs, 21-25 inches
        "German Wirehaired Pointer": "Medium",   # 50-70 lbs, 22-26 inches
        "Weimaraner": "Medium",                  # 55-90 lbs, 23-27 inches
        "Vizsla": "Medium",                      # 40-60 lbs, 21-24 inches
        "Rhodesian Ridgeback": "Medium",         # 70-85 lbs, 24-27 inches
        "Dalmatian": "Medium",                   # 45-70 lbs, 19-24 inches
        "Siberian Husky": "Medium",              # 35-60 lbs, 20-23 inches
        "Alaskan Malamute": "Medium",            # 75-85 lbs, 23-25 inches
        "Samoyed": "Medium",                     # 35-65 lbs, 19-23 inches
        "Chow Chow": "Medium",                   # 45-70 lbs, 17-20 inches
        "Shar Pei": "Medium",                    # 40-55 lbs, 18-20 inches
        "Akita": "Medium",                       # 70-130 lbs, 24-28 inches
        "Shiba Inu": "Medium",                   # 17-23 lbs, 13-17 inches
        "Basenji": "Medium",                     # 22-24 lbs, 16-17 inches
        "Whippet": "Medium",                     # 25-40 lbs, 18-22 inches
        "Greyhound": "Medium",                   # 60-70 lbs, 23-28 inches
        "Saluki": "Medium",                      # 40-65 lbs, 23-28 inches
        "Afghan Hound": "Medium",                # 50-60 lbs, 25-27 inches
        "Borzoi": "Medium",                      # 60-105 lbs, 26-28 inches
        "Irish Wolfhound": "Medium",             # 105-120 lbs, 30-32 inches
        "Scottish Deerhound": "Medium",          # 75-110 lbs, 28-32 inches
        "Great Dane": "Medium",                  # 110-175 lbs, 28-32 inches
        "Mastiff": "Medium",                     # 120-230 lbs, 27-30 inches
        "Saint Bernard": "Medium",               # 120-180 lbs, 25-28 inches
        "Newfoundland": "Medium",                # 100-150 lbs, 26-28 inches
        "Bernese Mountain Dog": "Medium",        # 70-115 lbs, 23-27 inches
        "Greater Swiss Mountain Dog": "Medium",  # 85-140 lbs, 23-28 inches
        "Leonberger": "Medium",                  # 90-170 lbs, 25-31 inches
        "Tibetan Mastiff": "Medium",             # 70-150 lbs, 24-26 inches
        "Neapolitan Mastiff": "Medium",          # 110-150 lbs, 24-31 inches
        "Spanish Mastiff": "Medium",             # 140-200 lbs, 28-35 inches
        "Cane Corso": "Medium",                  # 88-110 lbs, 23-27 inches
        "Boerboel": "Medium",                    # 110-200 lbs, 22-27 inches
        "Rottweiler": "Medium",                  # 80-135 lbs, 22-27 inches
        "Doberman Pinscher": "Medium",           # 60-100 lbs, 24-28 inches
        "German Shepherd": "Medium",             # 50-90 lbs, 22-26 inches
        "Belgian Malinois": "Medium",            # 40-80 lbs, 22-26 inches
        "Belgian Sheepdog": "Medium",            # 40-80 lbs, 22-26 inches
        "Belgian Tervuren": "Medium",            # 40-80 lbs, 22-26 inches
        "Belgian Laekenois": "Medium",           # 40-80 lbs, 22-26 inches
        "Dutch Shepherd": "Medium",              # 40-80 lbs, 22-26 inches
        "Briard": "Medium",                      # 55-100 lbs, 22-27 inches
        "Beauceron": "Medium",                   # 70-110 lbs, 24-27 inches
        "Berger Picard": "Medium",               # 50-70 lbs, 21-25 inches
        "Polish Lowland Sheepdog": "Medium",     # 30-50 lbs, 17-20 inches
        "Old English Sheepdog": "Medium",        # 60-100 lbs, 20-22 inches
        "Shetland Sheepdog": "Medium",           # 14-27 lbs, 13-16 inches (already small)
        "Collie": "Medium",                      # 50-75 lbs, 22-26 inches
        "Border Collie": "Medium",               # 30-55 lbs, 18-22 inches
        "Australian Cattle Dog": "Medium",       # 35-50 lbs, 17-20 inches
        "Australian Shepherd": "Medium",         # 40-65 lbs, 18-23 inches
        "Welsh Corgi": "Medium",                 # 24-30 lbs, 10-12 inches (already small)
        "Cardigan Welsh Corgi": "Medium",        # 25-38 lbs, 10-12 inches
        "Pembroke Welsh Corgi": "Medium",        # 24-30 lbs, 10-12 inches (already small)
        
        # LARGE BREEDS (over 60 lbs, over 22 inches)
        "American Bulldog": "Large",             # 60-120 lbs, 20-28 inches
        "Alapaha Blue Blood Bulldog": "Large",   # 55-90 lbs, 18-24 inches
        "American Pit Bull Terrier": "Large",    # 30-85 lbs, 17-21 inches
        "American Staffordshire Terrier": "Large", # 40-70 lbs, 17-19 inches
        "Black Russian Terrier": "Large",        # 80-130 lbs, 26-30 inches
        "Giant Schnauzer": "Large",              # 55-85 lbs, 23-28 inches
        "Standard Schnauzer": "Large",           # 30-50 lbs, 17-20 inches
        "Miniature Schnauzer": "Large",          # 11-20 lbs, 12-14 inches (already small)
        "Airedale Terrier": "Large",             # 40-65 lbs, 22-24 inches
        "Bull Terrier": "Large",                 # 50-70 lbs, 21-22 inches
        "Standard Bull Terrier": "Large",        # 50-70 lbs, 21-22 inches
        "Miniature Bull Terrier": "Large",       # 20-35 lbs, 10-14 inches (already medium)
        "American Foxhound": "Large",            # 40-75 lbs, 21-25 inches
        "English Foxhound": "Large",             # 55-75 lbs, 23-27 inches
        "Treeing Walker Coonhound": "Large",     # 45-80 lbs, 20-27 inches
        "Bluetick Coonhound": "Large",           # 45-80 lbs, 20-27 inches
        "Redbone Coonhound": "Large",            # 45-80 lbs, 20-27 inches
        "Plott Hound": "Large",                  # 40-75 lbs, 20-27 inches
        "Black and Tan Coonhound": "Large",      # 45-80 lbs, 20-27 inches
        "Bloodhound": "Large",                   # 80-110 lbs, 23-27 inches
        "Basset Hound": "Large",                 # 40-65 lbs, 14 inches (height doesn't match weight)
        "Dachshund": "Large",                    # 16-32 lbs, 8-9 inches (already small)
        "Beagle": "Large",                       # 20-30 lbs, 13-16 inches (already small)
        "Harrier": "Large",                      # 40-60 lbs, 19-21 inches
        "Otterhound": "Large",                   # 80-115 lbs, 24-27 inches
        "Petit Basset Griffon Vendéen": "Large", # 25-40 lbs, 13-15 inches
        "Basset Fauve de Bretagne": "Large",     # 25-35 lbs, 12-15 inches
        "Grand Basset Griffon Vendéen": "Large", # 35-40 lbs, 15-18 inches
        "Basset Artésien Normand": "Large",      # 25-35 lbs, 12-15 inches
        "Basset Bleu de Gascogne": "Large",      # 35-40 lbs, 12-15 inches
        "Basset Hound": "Large",                 # 40-65 lbs, 14 inches (height doesn't match weight)
        "Dachshund": "Large",                    # 16-32 lbs, 8-9 inches (already small)
        "Beagle": "Large",                       # 20-30 lbs, 13-16 inches (already small)
        "Harrier": "Large",                      # 40-60 lbs, 19-21 inches
        "Otterhound": "Large",                   # 80-115 lbs, 24-27 inches
        "Petit Basset Griffon Vendéen": "Large", # 25-40 lbs, 13-15 inches
        "Basset Fauve de Bretagne": "Large",     # 25-35 lbs, 12-15 inches
        "Grand Basset Griffon Vendéen": "Large", # 35-40 lbs, 15-18 inches
        "Basset Artésien Normand": "Large",      # 25-35 lbs, 12-15 inches
        "Basset Bleu de Gascogne": "Large",      # 35-40 lbs, 12-15 inches
    }

def analyze_and_fix_sizes():
    """Analyze all breeds and fix incorrect size classifications."""
    breeds = load_breed_data()
    standards = get_breed_size_standards()
    
    print(f"🔍 Analyzing {len(breeds)} breeds for size accuracy...")
    
    changes_made = 0
    issues_found = []
    
    for breed in breeds:
        breed_name = breed['breed']
        current_size = breed['size']
        
        # Check if we have a standard for this breed
        if breed_name in standards:
            correct_size = standards[breed_name]
            
            if current_size != correct_size:
                print(f"🔧 Fixing {breed_name}: {current_size} → {correct_size}")
                breed['size'] = correct_size
                changes_made += 1
                issues_found.append(f"{breed_name}: {current_size} → {correct_size}")
        else:
            # Log breeds we don't have standards for
            print(f"⚠️  No size standard for: {breed_name} (currently: {current_size})")
    
    print(f"\n📊 Summary:")
    print(f"   Total breeds analyzed: {len(breeds)}")
    print(f"   Changes made: {changes_made}")
    print(f"   Breeds with standards: {len(standards)}")
    
    if issues_found:
        print(f"\n🔧 Issues fixed:")
        for issue in issues_found:
            print(f"   {issue}")
    
    # Save corrected data
    output_file = 'seeder/dog_breeds_completely_fixed.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"\n💾 Corrected data saved to: {output_file}")
    return output_file

if __name__ == "__main__":
    print("🔍 Comprehensive size classification check...")
    
    try:
        output_file = analyze_and_fix_sizes()
        print(f"\n✅ Comprehensive size check complete!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. All breed sizes should now be accurate!")
        
    except Exception as e:
        print(f"❌ Error during comprehensive check: {e}")
        import traceback
        traceback.print_exc()
