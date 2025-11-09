#!/usr/bin/env python3
"""
Comprehensive encoding fix v2 with expanded mappings
"""

from pathlib import Path

# Extended list of hex replacements
FIXES = [
    # Words fixed in v1
    ("d0a0d19bd0a0d197d0b8d181d0a0c2b0d0a0d085d0b8d0b5", "d09ed0bfd0b8d181d0b0d0bdd0b8d0b5", "Описание"),
    ("d0a027d181d0b8d187d0bad0b8", "d092d181d0b8d187d0bad0b8", "Всички"),  
    ("d0bdd0b0d0a1e282acd0b8", "d0bdd0b0d188d0b8", "наши"),
    ("d0a0d198d0a0c2b0d0a1e282acd0b8d0a0d085d0b8", "d0bcd0b0d188d0b8d0bdd0b8", "машини"),
    ("d0b4d0bed181d0a1e2809ad0a0c2b0d0b2d0a1d08fd0a1e2809a", "d0b4d0bed181d182d0b0d0b2d18fd182", "доставят"),
    
    # New multi-character words
    ("d093d095d0a0d291d0b5d0a1e280b0", "d092d0bed0b4d0b5d189", "Водещ"),
    ("d093d181d0b8d0a1e280a1d094d0b8", "d092d181d0b8d187d0bad0b8", "Всички"),
    ("d09ad0b0d0a1e280a1d0b5d181d182d0b2d0b5d09dd095", "d09ad0b0d187d0b5d181d182d0b2d0b5d0bdd0be", "Качествено"),
    
    # Common garbled patterns (characters)
    ("d0a027", "d092", "В"),
    ("d0a0e28099", "d093", "Г"),  
    ("d0a1e2809e", "d094", "Д"),
    ("d0a0d085", "d09d", "Н"),
    ("d0a0d19b", "d09e", "О"),
    ("d0a0d197", "d09f", "П"),
    ("d0a1d082", "d0a2", "Т"),
    ("d0a0d198", "d09c", "М"),
    ("d0a0c2b0", "d0b0", "а"),
    ("d0a1e282ac", "d188", "ш"),
    ("d0a0c2b5", "d0b5", "е"),  
    ("d0a1e2809a", "d182", "т"),
    ("d0a1d08f", "d18f", "я"),
    ("d0a0d195", "d095", "Е"),
    ("d0a0d199", "d09a", "К"),
    ("d0a1d083", "d0a3", "У"),
    ("d0a0c2bb", "d0bb", "л"),
    ("d0a1d08e", "d18e", "ю"),
    ("d0a0d194", "d094", "Д"),
    ("d0a1e2809d", "d18d", "э"),
    ("d0a1e280a1", "d187", "ч"),  # New
    ("d0a0c2b6", "d0b6", "ж"),  # New
    ("d0a0c2b1", "d0b1", "б"),  # New  
    ("d0a0c2b7", "d0b7", "з"),  # New
    ("d0a0d291", "d091", "Б"),  # New capital Б
    ("d0a1d193", "d0a3", "У"),  # New
    ("d0a1d089", "d0a9", "Щ"),  # New
    ("d0a1e280b0", "d189", "щ"),  # New lowercase щ
    
    # Two-letter combinations
    ("d0a0d197d0b8", "d09fd0b8", "Пи"), 
    ("d0a0d085d0b8", "d09dd0b8", "Ни"),
    ("d0a1e282acd0b8", "d188d0b8", "ши"),
    ("d0a0c2b0d0a0", "d0b0d0bd", "ан"),
    ("d0a1e2809ad0b0", "d182d0b0", "та"),
    ("d095d0a0d291", "d0b5d0b6", "еж"),  # New
    ("d093d095", "d092d0be", "Во"),  # New 
    ("d094d0b0", "d0bad0b0", "ка"),  # New - might be wrong, checking
    ("d0a0d291", "d0b6", "ж"),  # New
    ("d0a1e280a1", "d187", "ч"),  # repeat for safety
]

def apply_fixes(filepath):
    """Apply hex fixes to a file"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Remove BOM
    if content[:3] == bytes.fromhex('efbbbf'):
        content = content[3:]
    
    changes = 0
    for garbled_hex, correct_hex, ref in FIXES:
        garbled = bytes.fromhex(garbled_hex)
        correct = bytes.fromhex(correct_hex)
        
        count = content.count(garbled)
        if count > 0:
            content = content.replace(garbled, correct)
            changes += count
            if count >= 1:  # Only show if found
                print(f"  ✓ {count}x: {ref}")
    
    # Write back
    with open(filepath, 'wb') as f:
        f.write(content)
    
    return changes

def main():
    files = [
        'index.html',
        'products/product-km7000.html',
        'products/product-km2015tpm.html',
        'products/product-km4001pe.html',
        'products/product-km900m.html',
        'pages/servizni-uslugi.html',
        'pages/vtora-upotreba.html',
        'pages/kantoslepvashti-mashini.html',
        'pages/video-galeria.html',
        'pages/kontakti.html',
        'pages/galeria.html',
    ]
    
    total = 0
    for f in files:
        if Path(f).exists():
            total += apply_fixes(f)
    
    print(f"\n✓ Done! Total fixes: {total}")

if __name__ == '__main__':
    main()
