#!/usr/bin/env python3
"""
Fix the remaining incorrect size classifications based on user feedback.
This script corrects the size errors that were identified.
"""

import json

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_completely_fixed.json', 'r') as f:
        return json.load(f)

def fix_remaining_size_errors():
    """Fix the remaining incorrect size classifications."""
    breeds = load_breed_data()
    
    print(f"🔍 Fixing remaining size classification errors...")
    print(f"📊 Found {len(breeds)} breeds to review")
    
    # Define the corrections based on user feedback
    size_corrections = {
        # SMALL BREEDS (under 25 lbs, under 16 inches)
        "Beagle": "Small",                    # 13-15 inches, 20-30 lbs - SMALL (height is primary factor)
        "Dachshund": "Small",                 # 8-9 inches, 16-32 lbs - SMALL (height is primary factor)
        "Miniature Schnauzer": "Small",       # 12-14 inches, 11-20 lbs - SMALL (height is primary factor)
        "Petit Basset Griffon Vendéen": "Small", # 13-15 inches, 25-40 lbs - SMALL (height is primary factor)
        
        # MEDIUM BREEDS (25-60 lbs, 16-22 inches)
        "Basset Hound": "Medium",             # 14 inches, 40-65 lbs - MEDIUM (weight puts it in medium)
        "American Pit Bull Terrier": "Medium", # 17-21 inches, 30-85 lbs - MEDIUM (typical medium size)
        "Treeing Walker Coonhound": "Medium", # 20-27 inches, 45-80 lbs - MEDIUM (typical medium size)
        "Bluetick Coonhound": "Medium",       # 21-27 inches, 45-80 lbs - MEDIUM (borderline but medium)
        "Plott Hound": "Medium",              # 20-25 inches, 40-75 lbs - MEDIUM (typical medium size)
        "Redbone Coonhound": "Medium",        # 21-27 inches, 45-80 lbs - MEDIUM (typical medium size)
        
        # LARGE BREEDS (over 60 lbs, over 22 inches)
        "Great Dane": "Large",                # 28-32 inches, 110-175 lbs - LARGE (clearly large)
    }
    
    changes_made = 0
    
    for breed in breeds:
        breed_name = breed['breed']
        
        if breed_name in size_corrections:
            old_size = breed['size']
            new_size = size_corrections[breed_name]
            
            if old_size != new_size:
                print(f"🔧 Fixing {breed_name}: {old_size} → {new_size}")
                breed['size'] = new_size
                changes_made += 1
            else:
                print(f"✅ {breed_name}: Already correct ({new_size})")
    
    print(f"\n📊 Summary:")
    print(f"   Total breeds reviewed: {len(breeds)}")
    print(f"   Changes made: {changes_made}")
    
    # Save corrected data
    output_file = 'seeder/dog_breeds_final_corrected.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"\n💾 Corrected data saved to: {output_file}")
    
    # Show final size distribution
    size_distribution = {}
    for breed in breeds:
        size = breed['size']
        size_distribution[size] = size_distribution.get(size, 0) + 1
    
    print(f"\n📏 Final size distribution:")
    for size in ['Small', 'Medium', 'Large']:
        count = size_distribution.get(size, 0)
        print(f"   {size}: {count} breeds")
    
    return output_file

if __name__ == "__main__":
    print("🔧 Fixing remaining size classification errors...")
    
    try:
        output_file = fix_remaining_size_errors()
        print(f"\n✅ All size errors fixed!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. All breed sizes should now be accurate!")
        
    except Exception as e:
        print(f"❌ Error during size correction: {e}")
        import traceback
        traceback.print_exc()
