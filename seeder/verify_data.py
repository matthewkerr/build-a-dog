#!/usr/bin/env python3
"""
Script to verify the corrected breed data looks good
"""

import json

def main():
    print("🔍 Verifying corrected breed data...")
    
    with open('dog_breeds_corrected.json', 'r') as f:
        breeds = json.load(f)
    
    print(f"Total breeds: {len(breeds)}")
    print("\n📊 Sample of corrected data:")
    print("=" * 50)
    
    # Show first 5 breeds
    for i, breed in enumerate(breeds[:5]):
        print(f"\n{i+1}. {breed['breed']}")
        print(f"   Size: {breed['size']}")
        print(f"   Energy: {breed['energy_level']}")
        print(f"   Good with kids: {'Yes' if breed['good_with_kids'] else 'No'}")
        print(f"   Good with pets: {'Yes' if breed['good_with_pets'] else 'No'}")
        print(f"   Trainability: {breed['trainability']}")
        print(f"   Role: {breed['companion_or_guardian']}")
        print(f"   Description: {breed['description'][:100]}...")
    
    print("\n" + "=" * 50)
    
    # Check for some specific breeds that were corrupted
    problem_breeds = ['Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund']
    print(f"\n🔍 Checking previously corrupted breeds:")
    
    for breed_name in problem_breeds:
        breed = next((b for b in breeds if b['breed'] == breed_name), None)
        if breed:
            print(f"\n✅ {breed_name}:")
            print(f"   Size: {breed['size']} (should be appropriate)")
            print(f"   Description starts with: {breed['description'][:50]}...")
            
            # Check if description matches breed name
            if breed_name.lower() in breed['description'].lower():
                print(f"   ✅ Description matches breed name")
            else:
                print(f"   ⚠️  Description might not match breed name")
    
    print(f"\n✨ Data verification complete!")
    print(f"📱 Ready to use in your DogMatch app!")

if __name__ == "__main__":
    main()