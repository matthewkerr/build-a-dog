#!/usr/bin/env python3
"""
Fix incorrect breed size classifications in the dog breeds data.
This script corrects breeds that are incorrectly labeled as small when they should be medium or large.
"""

import json
import re

def fix_breed_sizes():
    """Fix incorrect size classifications for various dog breeds."""
    
    # Load the breed data
    with open('seeder/dog_breeds_with_shelter_scores.json', 'r') as f:
        breeds = json.load(f)
    
    print(f"🔍 Loaded {len(breeds)} breeds")
    
    # Define size corrections based on actual breed standards
    size_corrections = {
        # Bulldogs - these are NOT small dogs!
        "Bulldog": "Medium",  # 40-50 lbs, 14-15 inches
        "English Bulldog": "Medium",  # 40-50 lbs, 14-15 inches
        "American Bulldog": "Large",  # 60-120 lbs, 20-28 inches
        "Alapaha Blue Blood Bulldog": "Large",  # 55-90 lbs, 18-24 inches
        
        # Other breeds that are incorrectly classified
        "Poodle": "Medium",  # Standard Poodle is medium, but this should be more specific
        "Miniature Poodle": "Small",  # 10-15 lbs, 10-15 inches
        "Toy Poodle": "Small",  # 4-6 lbs, under 10 inches
        
        # Large breeds that might be misclassified
        "Great Dane": "Large",  # 110-175 lbs, 28-32 inches
        "Saint Bernard": "Large",  # 120-180 lbs, 25-28 inches
        "Mastiff": "Large",  # 120-230 lbs, 27-30 inches
        "Newfoundland": "Large",  # 100-150 lbs, 26-28 inches
        
        # Medium breeds that might be misclassified
        "Boxer": "Medium",  # 50-80 lbs, 21-25 inches
        "Rottweiler": "Large",  # 80-135 lbs, 22-27 inches
        "Doberman Pinscher": "Large",  # 60-100 lbs, 24-28 inches
        "German Shepherd": "Large",  # 50-90 lbs, 22-26 inches
        
        # Small breeds that should stay small
        "Chihuahua": "Small",  # 2-6 lbs, 5-8 inches
        "Yorkshire Terrier": "Small",  # 4-7 lbs, 7-8 inches
        "Maltese": "Small",  # 4-7 lbs, 7-9 inches
        "Pomeranian": "Small",  # 3-7 lbs, 6-7 inches
        "Shih Tzu": "Small",  # 9-16 lbs, 8-11 inches
        "Boston Terrier": "Small",  # 12-25 lbs, 15-17 inches
        "Cavalier King Charles Spaniel": "Small",  # 13-18 lbs, 12-13 inches
    }
    
    # Track changes
    changes_made = 0
    bulldog_fixes = 0
    
    # Apply corrections
    for breed in breeds:
        breed_name = breed['breed']
        
        if breed_name in size_corrections:
            old_size = breed['size']
            new_size = size_corrections[breed_name]
            
            if old_size != new_size:
                print(f"🔧 Fixing {breed_name}: {old_size} → {new_size}")
                breed['size'] = new_size
                changes_made += 1
                
                # Track bulldog fixes specifically
                if "Bulldog" in breed_name:
                    bulldog_fixes += 1
    
    # Additional fixes for breeds with "Bulldog" in the name that might be missed
    for breed in breeds:
        breed_name = breed['breed']
        
        # Fix any bulldog breeds that weren't in our corrections list
        if "Bulldog" in breed_name and breed_name not in size_corrections:
            if breed['size'] == "Small":
                print(f"🔧 Fixing {breed_name}: Small → Medium (Bulldog breed)")
                breed['size'] = "Medium"
                changes_made += 1
                bulldog_fixes += 1
    
    print(f"\n📊 Summary of fixes:")
    print(f"   Total changes made: {changes_made}")
    print(f"   Bulldog fixes: {bulldog_fixes}")
    
    # Save the corrected data
    output_file = 'seeder/dog_breeds_sizes_fixed.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"💾 Corrected data saved to: {output_file}")
    
    # Show some examples of the fixes
    print(f"\n🔍 Examples of fixed breeds:")
    for breed in breeds:
        breed_name = breed['breed']
        if breed_name in size_corrections or "Bulldog" in breed_name:
            print(f"   {breed_name}: {breed['size']}")
    
    return output_file

def verify_small_breeds():
    """Verify that small breeds are actually small."""
    
    with open('seeder/dog_breeds_sizes_fixed.json', 'r') as f:
        breeds = json.load(f)
    
    print(f"\n🔍 Verifying small breed classifications:")
    
    small_breeds = [b for b in breeds if b['size'] == 'Small']
    print(f"   Total small breeds: {len(small_breeds)}")
    
    # Check for any bulldogs still classified as small
    small_bulldogs = [b for b in small_breeds if "Bulldog" in b['breed']]
    if small_bulldogs:
        print(f"   ⚠️  WARNING: {len(small_bulldogs)} bulldog breeds still classified as small:")
        for breed in small_bulldogs:
            print(f"      - {breed['breed']}")
    else:
        print(f"   ✅ No bulldog breeds incorrectly classified as small")
    
    # Show some examples of small breeds
    print(f"\n   Examples of small breeds:")
    for breed in small_breeds[:10]:
        print(f"      - {breed['breed']}")

if __name__ == "__main__":
    print("🔧 Fixing incorrect breed size classifications...")
    
    try:
        output_file = fix_breed_sizes()
        verify_small_breeds()
        
        print(f"\n✅ Size classifications fixed successfully!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. Test search for 'small dog' - should see variety now!")
        
    except Exception as e:
        print(f"❌ Error fixing breed sizes: {e}")
        import traceback
        traceback.print_exc()
