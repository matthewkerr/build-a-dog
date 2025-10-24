#!/usr/bin/env python3
"""
Identify which dog breeds don't have corresponding images.
This script checks the breed data against the actual image files.
"""

import json
import os
from pathlib import Path

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_fully_corrected.json', 'r') as f:
        return json.load(f)

def get_existing_images():
    """Get list of existing image files in the assets folder."""
    assets_path = Path('assets/images/breeds')
    
    if not assets_path.exists():
        print(f"❌ Assets folder not found: {assets_path}")
        return set()
    
    # Get all image files
    image_files = set()
    for ext in ['*.png', '*.jpg', '*.jpeg']:
        for img_file in assets_path.glob(ext):
            # Remove extension and convert to lowercase for comparison
            filename = img_file.stem.lower().replace('_', ' ').replace('-', ' ')
            image_files.add(filename)
    
    return image_files

def identify_missing_images():
    """Identify breeds without images."""
    breeds = load_breed_data()
    existing_images = get_existing_images()
    
    print(f"🔍 Analyzing {len(breeds)} breeds for missing images...")
    print(f"📁 Found {len(existing_images)} existing images")
    
    missing_images = []
    has_images = []
    
    for breed in breeds:
        breed_name = breed['breed']
        image_filename = breed.get('image_filename', '')
        
        # Check if breed has an image file
        if image_filename:
            # Remove extension and convert to lowercase for comparison
            clean_filename = image_filename.lower().replace('_', ' ').replace('-', ' ').replace('.jpg', '').replace('.png', '').replace('.jpeg', '')
            
            if clean_filename in existing_images:
                has_images.append(breed_name)
            else:
                missing_images.append({
                    'breed': breed_name,
                    'expected_image': image_filename,
                    'clean_name': clean_filename
                })
        else:
            missing_images.append({
                'breed': breed_name,
                'expected_image': 'NO_IMAGE_FILENAME',
                'clean_name': breed_name.lower()
            })
    
    print(f"\n📊 Results:")
    print(f"   ✅ Breeds with images: {len(has_images)}")
    print(f"   ❌ Breeds missing images: {len(missing_images)}")
    
    if missing_images:
        print(f"\n🚫 Breeds missing images:")
        print(f"{'Breed Name'.ljust(40)} {'Expected Image'.ljust(30)} {'Clean Name'}")
        print("-" * 90)
        
        for missing in missing_images:
            breed = missing['breed'].ljust(40)
            expected = missing['expected_image'].ljust(30)
            clean = missing['clean_name']
            print(f"{breed} {expected} {clean}")
    
    # Show some examples of existing images for reference
    print(f"\n📸 Sample of existing images:")
    sample_images = list(existing_images)[:10]
    for img in sample_images:
        print(f"   ✅ {img}")
    
    if len(existing_images) > 10:
        print(f"   ... and {len(existing_images) - 10} more")
    
    # Generate a summary report
    print(f"\n📋 Summary Report:")
    print(f"   Total breeds: {len(breeds)}")
    print(f"   Breeds with images: {len(has_images)} ({len(has_images)/len(breeds)*100:.1f}%)")
    print(f"   Breeds missing images: {len(missing_images)} ({len(missing_images)/len(breeds)*100:.1f}%)")
    
    # Save detailed report to file
    report_file = 'missing_images_report.md'
    with open(report_file, 'w') as f:
        f.write("# 🚫 Missing Dog Breed Images Report\n\n")
        f.write(f"**Total Breeds**: {len(breeds)}\n")
        f.write(f"**Breeds with Images**: {len(has_images)} ({len(has_images)/len(breeds)*100:.1f}%)\n")
        f.write(f"**Breeds Missing Images**: {len(missing_images)} ({len(missing_images)/len(breeds)*100:.1f}%)\n\n")
        
        f.write("## ❌ Breeds Missing Images:\n\n")
        f.write("| Breed Name | Expected Image | Clean Name |\n")
        f.write("|------------|----------------|------------|\n")
        
        for missing in missing_images:
            f.write(f"| {missing['breed']} | {missing['expected_image']} | {missing['clean_name']} |\n")
        
        f.write(f"\n## ✅ Breeds with Images:\n\n")
        for breed in has_images:
            f.write(f"- {breed}\n")
    
    print(f"\n💾 Detailed report saved to: {report_file}")
    
    return missing_images, has_images

if __name__ == "__main__":
    print("🔍 Identifying missing dog breed images...")
    
    try:
        missing_images, has_images = identify_missing_images()
        
        if missing_images:
            print(f"\n⚠️  Action needed:")
            print(f"   You have {len(missing_images)} breeds without images")
            print(f"   Consider adding images or updating image filenames")
        else:
            print(f"\n🎉 All breeds have images!")
        
    except Exception as e:
        print(f"❌ Error during analysis: {e}")
        import traceback
        traceback.print_exc()
