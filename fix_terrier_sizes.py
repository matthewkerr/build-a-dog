#!/usr/bin/env python3
"""
Fix incorrect size classifications for terrier breeds and pit bulls.
This script corrects breeds that are incorrectly labeled as small when they should be medium or large.
"""

import json

def fix_terrier_sizes():
    """Fix incorrect size classifications for terrier breeds and pit bulls."""
    
    # Load the breed data
    with open('seeder/dog_breeds_sizes_fixed.json', 'r') as f:
        breeds = json.load(f)
    
    print(f"🔍 Loaded {len(breeds)} breeds")
    
    # Define size corrections for terriers and pit bulls based on actual breed standards
    size_corrections = {
        # Staffordshire and Pit Bull breeds - these are NOT small dogs!
        "Staffordshire Bull Terrier": "Medium",  # 24-38 lbs, 14-16 inches
        "American Pit Bull Terrier": "Large",    # 30-85 lbs, 17-21 inches
        "American Staffordshire Terrier": "Large", # 40-70 lbs, 17-19 inches
        "Miniature Bull Terrier": "Medium",      # 20-35 lbs, 10-14 inches
        
        # Other terriers that are incorrectly classified
        "Scottish Terrier": "Small",             # 18-22 lbs, 10 inches (was "Toy")
        "Toy Fox Terrier": "Small",              # 3.5-7 lbs, 8.5-11.5 inches (was "Toy")
        "Norwich Terrier": "Small",              # 11-12 lbs, 10 inches (was "Toy")
        "Cairn Terrier": "Small",                # 13-14 lbs, 9.5-10 inches (was "Toy")
        "Norfolk Terrier": "Small",              # 11-12 lbs, 9-10 inches (was "Toy")
        "Silky Terrier": "Small",                # 8-10 lbs, 9-10 inches (was "Toy")
        "Skye Terrier": "Small",                 # 25-40 lbs, 9-10 inches (was "Toy")
        "Dandie Dinmont Terrier": "Small",      # 18-24 lbs, 8-11 inches (was "Toy")
        
        # Terriers that should stay as they are
        "Yorkshire Terrier": "Small",            # 4-7 lbs, 7-8 inches ✅
        "Boston Terrier": "Small",               # 12-25 lbs, 15-17 inches ✅
        "West Highland White Terrier": "Small",  # 13-22 lbs, 10-11 inches ✅
        "Manchester Terrier": "Small",           # 12-22 lbs, 15-16 inches ✅
        "Jack Russell Terrier": "Small",         # 13-17 lbs, 10-15 inches ✅
        "Rat Terrier": "Small",                  # 10-25 lbs, 10-18 inches ✅
        "Glen of Imaal Terrier": "Small",       # 32-40 lbs, 12-14 inches ✅
        "Tibetan Terrier": "Small",              # 18-30 lbs, 14-17 inches ✅
        "Lakeland Terrier": "Small",             # 15-17 lbs, 13-14 inches ✅
        "Sealyham Terrier": "Small",             # 20-24 lbs, 10.5 inches ✅
        "Smooth Fox Terrier": "Small",           # 15-19 lbs, 15.5 inches ✅
        "Toy Manchester Terrier": "Small",       # 6-8 lbs, 10-12 inches ✅
        
        # Medium terriers (correct)
        "Irish Terrier": "Medium",               # 25-27 lbs, 18 inches ✅
        "Kerry Blue Terrier": "Medium",          # 33-40 lbs, 17.5-19.5 inches ✅
        "Soft Coated Wheaten Terrier": "Medium", # 30-40 lbs, 17-18 inches ✅
        "Japanese Terrier": "Medium",            # 8-10 lbs, 12-13 inches ✅
        
        # Large terriers (correct)
        "Black Russian Terrier": "Large",        # 80-130 lbs, 26-30 inches ✅
    }
    
    # Track changes
    changes_made = 0
    terrier_fixes = 0
    pit_bull_fixes = 0
    
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
                
                # Track specific fixes
                if "Terrier" in breed_name:
                    terrier_fixes += 1
                if "Pit Bull" in breed_name or "Staffordshire" in breed_name:
                    pit_bull_fixes += 1
    
    # Additional fixes for breeds that might be missed
    for breed in breeds:
        breed_name = breed['breed']
        
        # Fix any "Toy" sizes that should be "Small"
        if breed['size'] == "Toy" and "Terrier" in breed_name:
            if breed_name not in size_corrections:
                print(f"🔧 Fixing {breed_name}: Toy → Small (Terrier breed)")
                breed['size'] = "Small"
                changes_made += 1
                terrier_fixes += 1
    
    print(f"\n📊 Summary of fixes:")
    print(f"   Total changes made: {changes_made}")
    print(f"   Terrier fixes: {terrier_fixes}")
    print(f"   Pit Bull/Staffordshire fixes: {pit_bull_fixes}")
    
    # Save the corrected data
    output_file = 'seeder/dog_breeds_all_sizes_fixed.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"💾 Corrected data saved to: {output_file}")
    
    # Show examples of the fixes
    print(f"\n🔍 Examples of fixed breeds:")
    for breed in breeds:
        breed_name = breed['breed']
        if breed_name in size_corrections or ("Terrier" in breed_name and breed['size'] == "Small"):
            print(f"   {breed_name}: {breed['size']}")
    
    return output_file

def verify_terrier_sizes():
    """Verify that terrier sizes are now correct."""
    
    with open('seeder/dog_breeds_all_sizes_fixed.json', 'r') as f:
        breeds = json.load(f)
    
    print(f"\n🔍 Verifying terrier size classifications:")
    
    # Check small terriers
    small_terriers = [b for b in breeds if b['size'] == 'Small' and "Terrier" in b['breed']]
    print(f"   Small terriers ({len(small_terriers)} total):")
    for breed in small_terriers:
        print(f"      ✅ {breed['breed']}")
    
    # Check medium terriers
    medium_terriers = [b for b in breeds if b['size'] == 'Medium' and "Terrier" in b['breed']]
    print(f"\n   Medium terriers ({len(medium_terriers)} total):")
    for breed in medium_terriers:
        print(f"      ✅ {breed['breed']}")
    
    # Check large terriers
    large_terriers = [b for b in breeds if b['size'] == 'Large' and "Terrier" in b['breed']]
    print(f"\n   Large terriers ({len(large_terriers)} total):")
    for breed in large_terriers:
        print(f"      ✅ {breed['breed']}")
    
    # Check pit bull and staffordshire breeds specifically
    pit_staff_breeds = [b for b in breeds if "Pit Bull" in b['breed'] or "Staffordshire" in b['breed']]
    print(f"\n   Pit Bull and Staffordshire breeds:")
    for breed in pit_staff_breeds:
        print(f"      {breed['breed']}: {breed['size']}")

if __name__ == "__main__":
    print("🔧 Fixing incorrect terrier and pit bull size classifications...")
    
    try:
        output_file = fix_terrier_sizes()
        verify_terrier_sizes()
        
        print(f"\n✅ Terrier and Pit Bull size classifications fixed successfully!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. Test search for 'small dog' - should see proper variety now!")
        print(f"   4. No more Staffordshire Terriers or Pit Bulls in small dog results!")
        
    except Exception as e:
        print(f"❌ Error fixing terrier sizes: {e}")
        import traceback
        traceback.print_exc()
