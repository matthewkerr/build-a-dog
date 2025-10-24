#!/usr/bin/env python3
"""
Comprehensive audit of all dog breed descriptions.
This script checks for:
1. Descriptions that don't match the breed name
2. Incorrect weight/height information
3. Wrong temperament descriptions
4. Mismatched breed characteristics
5. Generic or placeholder descriptions
"""

import json
import re

def load_breed_data():
    """Load the current breed data."""
    with open('seeder/dog_breeds_bulldog_fixed.json', 'r') as f:
        return json.load(f)

def audit_descriptions():
    """Audit all breed descriptions for accuracy."""
    breeds = load_breed_data()
    
    print(f"🔍 Auditing descriptions for {len(breeds)} dog breeds...")
    
    issues_found = []
    correct_descriptions = []
    
    # Common issues to check for
    for breed in breeds:
        breed_name = breed['breed']
        description = breed.get('description', '')
        
        issues = []
        
        # Check 1: Description mentions wrong breed name
        if description and breed_name not in description:
            # Check if it mentions a completely different breed
            wrong_breed_patterns = [
                r'Basset Fauve de Bretagne',
                r'Rafeiro do Alentejo',
                r'Manchester Terrier',
                r'Staffordshire Bull Terrier',
                r'American Pit Bull Terrier',
                r'American Staffordshire Terrier',
                r'Bull Terrier',
                r'Standard Bull Terrier',
                r'Miniature Bull Terrier',
                r'English Bulldog',
                r'American Bulldog',
                r'Alapaha Blue Blood Bulldog',
                r'French Bulldog',
                r'Bulldog',
                r'Yorkshire Terrier',
                r'Chihuahua',
                r'Maltese',
                r'Pomeranian',
                r'Shih Tzu',
                r'Boston Terrier',
                r'Jack Russell Terrier',
                r'Scottish Terrier',
                r'Cairn Terrier',
                r'Norwich Terrier',
                r'Norfolk Terrier',
                r'Silky Terrier',
                r'Skye Terrier',
                r'Dandie Dinmont Terrier',
                r'West Highland White Terrier',
                r'Manchester Terrier',
                r'Rat Terrier',
                r'Glen of Imaal Terrier',
                r'Tibetan Terrier',
                r'Lakeland Terrier',
                r'Sealyham Terrier',
                r'Smooth Fox Terrier',
                r'Toy Manchester Terrier',
                r'Toy Fox Terrier',
                r'Cocker Spaniel',
                r'Cavalier King Charles Spaniel',
                r'Shetland Sheepdog',
                r'Pembroke Welsh Corgi',
                r'Cardigan Welsh Corgi',
                r'Bolognese',
                r'Puggle',
                r'Yorkipoo',
                r'Maltipoo',
                r'Cockapoo',
                r'Cavapoo',
                r'Chiweenie',
                r'Labrador Retriever',
                r'Golden Retriever',
                r'German Shepherd',
                r'Border Collie',
                r'Australian Shepherd',
                r'Boxer',
                r'Poodle',
                r'Rottweiler',
                r'Doberman Pinscher',
                r'Akita',
                r'Siberian Husky',
                r'Alaskan Malamute',
                r'Samoyed',
                r'Chow Chow',
                r'Shar Pei',
                r'Bernese Mountain Dog',
                r'Collie',
                r'Rhodesian Ridgeback',
                r'Dalmatian',
                r'Vizsla',
                r'Weimaraner',
                r'Newfoundland',
                r'Saint Bernard',
                r'Mastiff',
                r'Neapolitan Mastiff',
                r'Tibetan Mastiff',
                r'Cane Corso',
                r'Boerboel',
                r'Belgian Malinois',
                r'Belgian Sheepdog',
                r'Belgian Tervuren',
                r'Belgian Laekenois',
                r'Dutch Shepherd',
                r'Briard',
                r'Beauceron',
                r'Berger Picard',
                r'Polish Lowland Sheepdog',
                r'Old English Sheepdog',
                r'Greater Swiss Mountain Dog',
                r'Leonberger',
                r'Spanish Mastiff',
                r'Goldendoodle',
                r'Labradoodle',
                r'Aussiedoodle',
                r'Schnoodle',
                r'Pitsky',
                r'Sheepadoodle',
                r'Huskydoodle',
                r'Alusky',
                r'Morkie',
                r'Bernedoodle',
                r'Newfypoo',
                r'Shorkie',
                r'Havapoo',
                r'Peekapoo',
                r'Shihpoo',
                r'Brittany',
                r'English Springer Spaniel',
                r'English Cocker Spaniel',
                r'Field Spaniel',
                r'Welsh Springer Spaniel',
                r'Clumber Spaniel',
                r'Sussex Spaniel',
                r'Irish Water Spaniel',
                r'English Setter',
                r'Irish Setter',
                r'Gordon Setter',
                r'Pointer',
                r'German Shorthaired Pointer',
                r'German Wirehaired Pointer',
                r'Basset Hound',
                r'American Eskimo Dog',
                r'Australian Cattle Dog',
                r'Basenji',
                r'Whippet',
                r'Greyhound',
                r'Saluki',
                r'Afghan Hound',
                r'Borzoi',
                r'Irish Wolfhound',
                r'Scottish Deerhound',
                r'Great Dane',
                r'Chow Chow',
                r'Shar Pei',
                r'Bernese Mountain Dog',
                r'Collie',
                r'Rhodesian Ridgeback',
                r'Dalmatian',
                r'Vizsla',
                r'Weimaraner',
                r'Newfoundland',
                r'Saint Bernard',
                r'Mastiff',
                r'Neapolitan Mastiff',
                r'Tibetan Mastiff',
                r'Cane Corso',
                r'Boerboel',
                r'Belgian Malinois',
                r'Belgian Sheepdog',
                r'Belgian Tervuren',
                r'Belgian Laekenois',
                r'Dutch Shepherd',
                r'Briard',
                r'Beauceron',
                r'Berger Picard',
                r'Polish Lowland Sheepdog',
                r'Old English Sheepdog',
                r'Greater Swiss Mountain Dog',
                r'Leonberger',
                r'Spanish Mastiff',
                r'Goldendoodle',
                r'Labradoodle',
                r'Aussiedoodle',
                r'Schnoodle',
                r'Pitsky',
                r'Sheepadoodle',
                r'Huskydoodle',
                r'Alusky',
                r'Morkie',
                r'Bernedoodle',
                r'Newfypoo',
                r'Shorkie',
                r'Havapoo',
                r'Peekapoo',
                r'Shihpoo',
                r'Brittany',
                r'English Springer Spaniel',
                r'English Cocker Spaniel',
                r'Field Spaniel',
                r'Welsh Springer Spaniel',
                r'Clumber Spaniel',
                r'Sussex Spaniel',
                r'Irish Water Spaniel',
                r'English Setter',
                r'Irish Setter',
                r'Gordon Setter',
                r'Pointer',
                r'German Shorthaired Pointer',
                r'German Wirehaired Pointer',
                r'Basset Hound',
                r'American Eskimo Dog',
                r'Australian Cattle Dog',
                r'Basenji',
                r'Whippet',
                r'Greyhound',
                r'Saluki',
                r'Afghan Hound',
                r'Borzoi',
                r'Irish Wolfhound',
                r'Scottish Deerhound',
                r'Great Dane',
                r'Chow Chow',
                r'Shar Pei',
                r'Bernese Mountain Dog',
                r'Collie',
                r'Rhodesian Ridgeback',
                r'Dalmatian',
                r'Vizsla',
                r'Weimaraner',
                r'Newfoundland',
                r'Saint Bernard',
                r'Mastiff',
                r'Neapolitan Mastiff',
                r'Tibetan Mastiff',
                r'Cane Corso',
                r'Boerboel',
                r'Belgian Malinois',
                r'Breeds with issues found: {len(issues_found)}")
    print(f"✅ Correct descriptions: {len(correct_descriptions)}")
    
    if issues_found:
        print(f"\n🚫 Breeds with description issues:")
        print(f"{'Breed Name'.ljust(40)} {'Issue Type'.ljust(20)} {'Details'}")
        print("-" * 100)
        
        for issue in issues_found:
            breed = issue['breed'].ljust(40)
            issue_type = issue['type'].ljust(20)
            details = issue['details']
            print(f"{breed} {issue_type} {details}")
    
    # Save detailed audit report
    report_file = 'description_audit_report.md'
    with open(report_file, 'w') as f:
        f.write("# 🔍 Dog Breed Description Audit Report\n\n")
        f.write(f"**Total Breeds Audited**: {len(breeds)}\n")
        f.write(f"**Breeds with Issues**: {len(issues_found)}\n")
        f.write(f"**Correct Descriptions**: {len(correct_descriptions)}\n\n")
        
        if issues_found:
            f.write("## 🚫 Breeds with Description Issues:\n\n")
            f.write("| Breed Name | Issue Type | Details |\n")
            f.write("|------------|------------|---------|\n")
            
            for issue in issues_found:
                f.write(f"| {issue['breed']} | {issue['type']} | {issue['details']} |\n")
        
        f.write(f"\n## ✅ Breeds with Correct Descriptions:\n\n")
        for breed in correct_descriptions:
            f.write(f"- {breed}\n")
    
    print(f"\n💾 Detailed audit report saved to: {report_file}")
    
    return issues_found, correct_descriptions

if __name__ == "__main__":
    print("🔍 Auditing all dog breed descriptions...")
    
    try:
        issues_found, correct_descriptions = audit_descriptions()
        
        if issues_found:
            print(f"\n⚠️  Action needed:")
            print(f"   Found {len(issues_found)} breeds with description issues")
            print(f"   Review the audit report and fix incorrect descriptions")
        else:
            print(f"\n🎉 All descriptions are correct!")
        
    except Exception as e:
        print(f"❌ Error during description audit: {e}")
        import traceback
        traceback.print_exc()
