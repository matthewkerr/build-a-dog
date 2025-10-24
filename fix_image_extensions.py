#!/usr/bin/env python3
"""
Fix image filename extensions from .jpg to .png.
The data has .jpg extensions but actual images are .png files.
"""

import json

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_descriptions_fixed.json', 'r') as f:
        return json.load(f)

def fix_image_extensions():
    """Fix image filename extensions from .jpg to .png."""
    breeds = load_breed_data()
    
    print(f"🔧 Fixing image filename extensions for {len(breeds)} dog breeds...")
    
    changes_made = 0
    
    for breed in breeds:
        breed_name = breed['breed']
        image_filename = breed.get('image_filename', '')
        
        if image_filename and image_filename.endswith('.jpg'):
            old_filename = image_filename
            new_filename = image_filename.replace('.jpg', '.png')
            
            print(f"🔧 Fixing {breed_name}: {old_filename} → {new_filename}")
            breed['image_filename'] = new_filename
            changes_made += 1
        elif image_filename and image_filename.endswith('.png'):
            print(f"✅ {breed_name}: Already correct (.png)")
        elif not image_filename:
            print(f"⚠️  {breed_name}: No image filename")
    
    print(f"\n📊 Summary:")
    print(f"   Total breeds reviewed: {len(breeds)}")
    print(f"   Extensions fixed: {changes_made}")
    
    # Save corrected data
    output_file = 'seeder/dog_breeds_images_fixed.json'
    with open(output_file, 'w') as f:
        json.dump(breeds, f, indent=2)
    
    print(f"\n💾 Corrected data saved to: {output_file}")
    
    return output_file

if __name__ == "__main__":
    print("🔧 Fixing image filename extensions...")
    
    try:
        output_file = fix_image_extensions()
        print(f"\n✅ All image extensions fixed!")
        print(f"📱 Next steps:")
        print(f"   1. Use the Reset Database button in your app")
        print(f"   2. Or restart with: npx expo start --clear")
        print(f"   3. All breed images should now display correctly!")
        
    except Exception as e:
        print(f"❌ Error during extension correction: {e}")
        import traceback
        traceback.print_exc()
