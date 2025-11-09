#!/usr/bin/env python3
"""
Final comprehensive encoding fix with all discovered patterns
"""

from pathlib import Path

# Complete list of ALL hex replacements discovered
FIXES = [
    # === Phase 1: Initial words ===
    ("d0a0d19bd0a0d197d0b8d181d0a0c2b0d0a0d085d0b8d0b5", "d09ed0bfd0b8d181d0b0d0bdd0b8d0b5", "Описание"),
    ("d0a027d181d0b8d187d0bad0b8", "d092d181d0b8d187d0bad0b8", "Всички"),  
    ("d0bdd0b0d0a1e282acd0b8", "d0bdd0b0d188d0b8", "наши"),
    ("d0a0d198d0a0c2b0d0a1e282acd0b8d0a0d085d0b8", "d0bcd0b0d188d0b8d0bdd0b8", "машини"),
    ("d0b4d0bed181d0a1e2809ad0a0c2b0d0b2d0a1d08fd0a1e2809a", "d0b4d0bed181d182d0b0d0b2d18fd182", "доставят"),
    
    # === Phase 2: Multi-character words ===
    ("d093d095d0a0d291d0b5d0a1e280b0", "d092d0bed0b4d0b5d189", "Водещ"),
    ("d093d181d0b8d0a1e280a1d094d0b8", "d092d181d0b8d187d0bad0b8", "Всички-v2"),
    ("d09ad0b0d0a1e280a1d0b5d181d182d0b2d0b5d09dd095", "d09ad0b0d187d0b5d181d182d0b2d0b5d0bdd0be", "Качествено"),
    
    # === Phase 3: Final complete words and phrases ===
    ("d0a0d19ed0b5d0a1e280a6d09dd0b8d187d0b5d181d094d0b820d0a1e280a6d0b0d0a2d0b0d094d182d0b5d0a2d0b8d181d182d0b8d094d0b83a", "d0a2d0b5d185d0bdd0b8d187d0b5d181d0bad0b820d185d0b0d180d0b0d0bad182d0b5d180d0b8d181d182d0b8d0bad0b83a", "Технически характеристики:"),
    ("d093d0a9d0b7d09cd095d0b6d09dd095d181d182", "d092d18ad0b7d0bcd0bed0b6d0bdd0bed181d182", "Възможност"),
    ("d09cd095d09dd182d0b8d0a2d0b0d09dd0b5", "d0bcd0bed0bdd182d0b8d180d0b0d0bdd0b5", "монтиране"),
    ("d0a2d0b0d0b7d0bbd0b8d187d09dd0b8", "d180d0b0d0b7d0bbd0b8d187d0bdd0b8", "різни"),
    ("d0b0d0a0d196d0a2d0b5d0a0d196d0b0d182d0b8", "d0b0d0b3d180d0b5d0b3d0b0d182d0b8", "агрегати"),
    ("d0a0d19fd095d0b4d0b0d0b2d0b0d182d0b5d0bbd0b5d09d", "d09fd0bed0b4d0b0d0b2d0b0d182d0b5d0bbd0b5d0bd", "Подавателен"),
    ("d0b6d0b5d0bbd0b0d09dd0b8d0b5", "d0b6d0b5d0bbd0b0d0bdd0b8d0b5", "желание"),
    ("d094d095d09dd094d0b8d0a0d196d0a3d0a2d0b0d0a1e280a0d0b8d18f", "d0bad0bed0bdd184d0b8d0b3d183d180d0b0d186d0b8d18f", "конфигурация"),
    ("d093d0b8d181d095d0bad0b0", "d092d0b8d181d0bed0bad0b0", "Висока"),
    ("d0bfd180d0bed0b8d0b7d0b2d0bed0b4d0b8d182d0b5d0bbd09dd095d181d182", "d0bfd180d0bed0b8d0b7d0b2d0bed0b4d0b8d182d0b5d0bbd0bdd0bed181d182", "производителност"),
    ("d0a0d19cd0b0d091d0b5d0b6d091d0bdd0b0", "d09dd0b0d0b4d0b5d0b6d0b4d0bdd0b0", "Надеждна"),
    ("d094d095d09dd181d182d0a2d0a3d094d0a1e280a0d0b8d18f", "d0bad0bed0bdd181d182d180d183d0bad186d0b8d18f", "конструкция"),
    
    # === Single character replacements ===
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
    ("d0a1e280a1", "d187", "ч"),
    ("d0a0c2b6", "d0b6", "ж"),
    ("d0a0c2b1", "d0b1", "б"),  
    ("d0a0c2b7", "d0b7", "з"),
    ("d0a0d291", "d091", "Б"),
    ("d0a1d193", "d0a3", "У"),
    ("d0a1d089", "d0a9", "Щ"),
    ("d0a1e280b0", "d189", "щ"),
    ("d0a0d196", "d0b3", "г"),  # New lowercase г
    ("d0a1e280a0", "d186", "ц"),  # New lowercase ц
    ("d0a1e280a6", "d185", "х"),  # New lowercase х
    ("d0a0d19e", "d09e", "О"),  # Repeat for safety
    
    # === Two/three-letter combinations ===
    ("d0a0d197d0b8", "d09fd0b8", "Пи"), 
    ("d0a0d085d0b8", "d09dd0b8", "Ни"),
    ("d0a1e282acd0b8", "d188d0b8", "ши"),
    ("d0a0c2b0d0a0", "d0b0d0bd", "ан"),
    ("d0a1e2809ad0b0", "d182d0b0", "та"),
    ("d095d0a0d291", "d0b5d0b6", "еж"),
    ("d093d095", "d092d0be", "Во"),
    ("d094d0b0", "d0bad0b0", "ка"),
    ("d0a0d291", "d0b6", "ж"),
]

def apply_fixes(filepath):
    """Apply hex fixes to a file"""
    print(f"Processing: {filepath.name}")
    
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Remove BOM
    if content[:3] == bytes.fromhex('efbbbf'):
        content = content[3:]
    
    changes = 0
    # Sort by length (longest first) to avoid partial replacements
    sorted_fixes = sorted(FIXES, key=lambda x: len(x[0]), reverse=True)
    
    for garbled_hex, correct_hex, ref in sorted_fixes:
        garbled = bytes.fromhex(garbled_hex)
        correct = bytes.fromhex(correct_hex)
        
        count = content.count(garbled)
        if count > 0:
            content = content.replace(garbled, correct)
            changes += count
            if count >= 1 and len(garbled) > 4:  # Only show significant fixes
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
        filepath = Path(f)
        if filepath.exists():
            total += apply_fixes(filepath)
        else:
            print(f"Warning: {f} not found")
    
    print(f"\n{'='*50}")
    print(f"✓ Done! Total fixes: {total}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
