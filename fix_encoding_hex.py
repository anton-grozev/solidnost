#!/usr/bin/env python3
"""
Encoding fix using Unicode code points to avoid source encoding issues.
This script fixes Bulgarian Cyrillic mojibake by using hex byte replacements.
"""

import os
from pathlib import Path

# Define byte-level replacements as hex strings to avoid encoding issues in source
# Format: (garbled_hex, correct_hex, description)
HEX_REPLACEMENTS = [
    # Based on analysis of the files:
    # Common mojibake patterns -> correct Bulgarian
    
    # "Описание"
    ("d0a0d19bd0a0d197d0b8d181d0a0c2b0d0a0d085d0b8d0b5", "d09ed0bfd0b8d181d0b0d0bdd0b8d0b5", "Описание"),
    
    # "Всички"  
    ("d0a027d181d0b8d187d0bad0b8", "d092d181d0b8d187d0bad0b8", "Всички"),
    
    # "наши"
    ("d0bdd0b0d0a1e282acd0b8", "d0bdd0b0d188d0b8", "наши"),
    
    # "машини"
    ("d0a0d198d0a0c2b0d0a1e282acd0b8d0a0d085d0b8", "d0bcd0b0d188d0b8d0bdd0b8", "машини"),
    
    # "доставят"
    ("d0b4d0bed181d0a1e2809ad0a0c2b0d0b2d0a1d08fd0a1e2809a", "d0b4d0bed181d182d0b0d0b2d18fd182", "доставят"),
    
    # Add more mappings by analyzing files...
    # To be comprehensive, I need to extract all garbled patterns
]

def generate_more_mappings():
    """Generate mappings for all Bulgarian words we need"""
    # Correct Bulgarian words to fix
    bulgarian_words = [
        "Технически", "характеристики", "Възможност", "монтиране",
        "различни", "агрегати", "Подавателен", "желание", "клиента",
        "Индивидуална", "конфигурация", "Висока", "производителност",
        "Надеждна", "конструкция", "Поръчай", "сега", "Обади",
        "Допълнителна", "информация", "Забележка", "произвеждат",
        "поръчка", "според", "нуждите", "клиент", "индивидуална",
        "оферта", "консултация", "Гаранция", "поддръжка",
        "Пълна", "гаранция", "произведеното", "Обучение",
        "персонала", "работа", "машината", "Гаранционно",
        "следгаранционно", "техническо", "обслужване", "Доставка",
        "резервни", "части", "права", "запазени", "Предишна",
        "Следваща", "Върнете", "горе", "Вашето", "Вашият",
        "вашето", "вашият", "съобщение", "въпрос", "Нашите",
        "услуги", "включват", "нашите", "производство", "Видео",
        "демонстрация", "демонстрационни", "видеа", "Вижте",
        "посетете", "нашия", "производствен", "цех", "фрезова",
        "отдолу", "заобля", "ръбовете", "отпред", "отзад", "шкурки",
    ]
    
    mappings = []
    for word in bulgarian_words:
        correct_hex = word.encode('utf-8').hex()
        mappings.append((correct_hex, word))
    
    return mappings

def find_garbled_hex(filepath, correct_hex_list):
    """
    Read a garbled file and try to find what hex sequences correspond to our correct words.
    This helps build the replacement dictionary.
    """
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Remove BOM if present
    if content[:3] == bytes.fromhex('efbbbf'):
        content = content[3:]
    
    found_mappings = []
    
    # For each correct hex, try to find a pattern in the file that might be its garbled version
    # This is complex because we don't know the exact transformation
    # So we'll use a different approach: apply known replacements
    
    return found_mappings

def fix_file_with_hex(filepath, hex_replacements):
    """Fix a file using hex byte replacements"""
    print(f"Fixing: {filepath}")
    
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Remove BOM if present
    has_bom = False
    if content[:3] == bytes.fromhex('efbbbf'):
        content = content[3:]
        has_bom = True
    
    # Apply replacements
    changes = 0
    for garbled_hex, correct_hex, description in hex_replacements:
        garbled_bytes = bytes.fromhex(garbled_hex)
        correct_bytes = bytes.fromhex(correct_hex)
        
        count = content.count(garbled_bytes)
        if count > 0:
            content = content.replace(garbled_bytes, correct_bytes)
            changes += count
            print(f"  ✓ Fixed {count}x: {description}")
    
    # Write back
    with open(filepath, 'wb') as f:
        f.write(content)
    
    return changes

def main():
    """Fix all HTML files"""
    base_dir = Path('.')
    
    html_files = [
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
    
    print("Starting encoding fix...\n")
    
    total_changes = 0
    for html_file in html_files:
        filepath = base_dir / html_file
        if filepath.exists():
            changes = fix_file_with_hex(str(filepath), HEX_REPLACEMENTS)
            total_changes += changes
        else:
            print(f"Warning: Not found: {filepath}")
    
    print(f"\n✓ Completed! Total fixes: {total_changes}")
    
    if total_changes == 0:
        print("\nNote: Only a few mappings are defined. To fix all text, more hex mappings need to be added.")
        print("The current mappings are examples. A comprehensive fix requires analyzing all garbled patterns.")

if __name__ == '__main__':
    main()
