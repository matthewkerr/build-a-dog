#!/usr/bin/env python3
"""
Fix remaining designer breed size issues and incorrect descriptions.
This script corrects the final size classifications and fixes mismatched descriptions.
"""

import json

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_final_corrected.json', 'r') as f:
        return json.load(f)

def fix_designer_breeds_and_descriptions():
    """Fix designer breed sizes and incorrect descriptions."""
    breeds = load_breed_data()
    
    print(f"🔍 Fixing designer breed sizes and descriptions...")
    print(f"📊 Found {len(breeds)} breeds to review")
    
    # Define the size corrections based on user feedback
    size_corrections = {
        # SMALL BREEDS (under 25 lbs, under 16 inches)
        "Yorkipoo": "Small",                    # 3-14 lbs, 7-15 inches - SMALL
        "Maltipoo": "Small",                    # 5-20 lbs, 8-14 inches - SMALL
        "Cockapoo": "Small",                    # 12-24 lbs, 10-15 inches - SMALL
        "Cavapoo": "Small",                     # 9-25 lbs, 9-14 inches - SMALL
        "Chiweenie": "Small",                   # 5-12 lbs, 6-10 inches - SMALL
        
        # LARGE BREEDS (over 60 lbs, over 22 inches)
        "Pitsky": "Large",                      # 30-80 lbs, 18-24 inches - LARGE (upper end)
    }
    
    # Define description corrections for breeds with wrong descriptions
    description_corrections = {
        "Goldendoodle": "A designer breed that combines the intelligence and trainability of the Golden Retriever with the low-shedding coat of the Poodle. Goldendoodles typically weigh 50-90 pounds and stand 20-26 inches tall, depending on the size of the Poodle parent. They are known for their friendly, intelligent, and family-oriented temperament, making them excellent companions for active families.",
        
        "Labradoodle": "A designer breed that combines the friendly, outgoing nature of the Labrador Retriever with the intelligence and low-shedding coat of the Poodle. Labradoodles typically weigh 50-80 pounds and stand 21-24 inches tall, depending on the size of the Poodle parent. They are highly intelligent, trainable, and make excellent family pets and therapy dogs.",
        
        "Aussiedoodle": "A designer breed that combines the intelligence and herding instincts of the Australian Shepherd with the low-shedding coat of the Poodle. Aussiedoodles typically weigh 25-70 pounds and stand 15-23 inches tall, depending on the size of the Poodle parent. They are highly intelligent, energetic, and excel in dog sports and activities.",
        
        "Schnoodle": "A designer breed that combines the intelligence and loyalty of the Schnauzer with the low-shedding coat of the Poodle. Schnoodles can vary significantly in size depending on the parent Poodle size: Miniature Schnoodles weigh 20-35 pounds and stand 10-15 inches, while Standard Schnoodles weigh 40-75 pounds and stand 15-26 inches. They are intelligent, loyal, and make excellent family companions.",
        
        "Yorkipoo": "A designer breed that combines the spunky personality of the Yorkshire Terrier with the intelligence and low-shedding coat of the Poodle. Yorkipoos typically weigh 3-14 pounds and stand 7-15 inches tall, depending on the size of the Poodle parent. They are intelligent, affectionate, and make excellent companion dogs for apartment living.",
        
        "Maltipoo": "A designer breed that combines the gentle, affectionate nature of the Maltese with the intelligence and low-shedding coat of the Poodle. Maltipoos typically weigh 5-20 pounds and stand 8-14 inches tall, depending on the size of the Poodle parent. They are gentle, loving, and make excellent lap dogs and family companions.",
        
        "Cockapoo": "A designer breed that combines the friendly, outgoing nature of the Cocker Spaniel with the intelligence and low-shedding coat of the Poodle. Cockapoos typically weigh 12-24 pounds and stand 10-15 inches tall, depending on the size of the Poodle parent. They are affectionate, intelligent, and make excellent family pets.",
        
        "Cavapoo": "A designer breed that combines the gentle, affectionate nature of the Cavalier King Charles Spaniel with the intelligence and low-shedding coat of the Poodle. Cavapoos typically weigh 9-25 pounds and stand 9-14 inches tall, depending on the size of the Poodle parent. They are gentle, loving, and make excellent companion dogs.",
        
        "Pitsky": "A designer breed that combines the strength and loyalty of the American Pit Bull Terrier with the energy and endurance of the Siberian Husky. Pitskies typically weigh 30-80 pounds and stand 18-24 inches tall, depending on the parent breeds. They are intelligent, energetic, and require experienced owners who can provide proper training and exercise.",
        
        "Chiweenie": "A designer breed that combines the spunky personality of the Chihuahua with the playful nature of the Dachshund. Chiweenies typically weigh 5-12 pounds and stand 6-10 inches tall. They are small, energetic, and make excellent companion dogs for apartment living, though they can be stubborn and require patient training."
    }
    
    changes_made = 0
    size_changes = 0
    description_changes = 0
    
    for breed in breeds:
        breed_name = breed['breed']
        
        # Fix size if needed
        if breed_name in size_corrections:
            old_size = breed['size']
            new_size = size_corrections[breed_name]
            
            if old_size != new_size:
                print(f"🔧 Fixing {breed_name} size: {old_size} → {new_size}")
                breed['size'] = new_size
                size_changes += 1
                changes_made += 1
            else:
                print(f"✅ {breed_name} size: Already correct ({new_size})")
        
        # Fix description if needed
        if breed_name in description_corrections:
            old_description = breed['description']
            new_description = description_corrections[breed_name]
            
            if old_description != new_description:
                print(f"📝 Fixing {breed_name} description (was incorrect)")
                breed['description'] = new_description
                description_changes += 1
                changes_made += 1
            else:
                print(f"✅ {breed_name} description: Already correct")
    
    print(f"\n📊 Summary:")
    print(f"   Total breeds reviewed: {len(breeds)}")
    print(f"   Size changes made: {size_changes}")
    print(f"   Description changes made: {description_changes}")
    print(f"   Total changes made: {changes_made}")
    
    # Save corrected data
    output_file = 'seeder/dog_breeds_fully_corrected.json'
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
    
    # Show designer breeds and their final sizes
    designer_breeds = ['Yorkipoo', 'Schnoodle', 'Goldendoodle', 'Labradoodle', 'Maltipoo', 
                       'Aussiedoodle', 'Cockapoo', 'Cavapoo', 'Pitsky', 'Chiweenie']
    
    print(f"\n🎨 Designer breeds final sizes:")
    for breed_name in designer_breeds:
        breed = next((b for b in breeds if b['breed'] == breed_name), None)
        if breed:
            print(f"   {breed_name}: {breed['size']} ✅")
    
    return output_file

if __name__ == "__main__":
    print("🔧 Fixing designer breed sizes and descriptions...")
    
    try:
        output_file = fix_designer_breeds_and_descriptions()
        print(f"\n✅ All designer breed issues fixed!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. All breed sizes and descriptions should now be accurate!")
        
    except Exception as e:
        print(f"❌ Error during correction: {e}")
        import traceback
        traceback.print_exc()
