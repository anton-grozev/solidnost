#!/usr/bin/env python3
"""
Simple encoding fix using direct string replacement.
Creates a corrections dictionary by reading from the files.
"""
import re
from pathlib import Path

def create_corrections_from_manual_list():
    """
    Manual list of corrections based on known Bulgarian words.
    Using direct assignment to avoid encoding issues in source.
    """
    corrections = {}
    
    # Read garbled versions from actual file to ensure accuracy
    with open('products/product-km7000.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract specific garbled texts and map them
    # Format: extract pattern -> correct version
    mappings = [
        (r'РћРїисР°РЅие', 'Описание'),
        (r'РћРїисание', 'Описание'),
        (r'РўеС…РЅиС‡есРєи С…Р°СЂР°РєС‚еСЂисС‚иРєи', 'Технически характеристики'),
        (r'Р'СЉР·РјРѕР¶РЅРѕсС‚', 'Възможност'),
        (r'РјРѕРЅС‚иСЂР°РЅе', 'монтиране'),
        (r'СЂР°Р·Р»иС‡РЅи', 'различни'),
        (r'Р°РіСЂеРіР°С‚и', 'агрегати'),
        (r'РџРѕдавР°С‚еР»еРЅ', 'Подавателен'),
        (r'Р¶еР»Р°РЅие', 'желание'),
        (r'РєР»иентР°', 'клиента'),
        (r'РРЅРґивиРґСѓР°Р»на', 'Индивидуална'),
        (r'РєРѕРЅС„иРіСѓСЂР°С†иСЏ', 'конфигурация'),
        (r'Р'исРѕРєР°', 'Висока'),
        (r'РїСЂРѕиР·воРґиС‚еР»РЅРѕсС‚', 'производителност'),
        (r'РїСЂРѕиР·воРґиС‚еР»РЅРѕсС‚', 'производителност'),
        (r'РќР°РґеР¶Рґна', 'Надеждна'),
        (r'РєРѕРЅсС‚СЂСѓРєС†иСЏ', 'конструкция'),
        (r'РџРѕСЂСЉС‡Р°Р№', 'Поръчай'),
        (r'сеРіР°', 'сега'),
        (r'РћР±Р°Рґи', 'Обади'),
        (r'Р"РѕРїСЉР»РЅиС‚еР»на', 'Допълнителна'),
        (r'иРЅформаС†иСЏ', 'информация'),
        (r'ЗаР±еР»еР¶РєР°', 'Забележка'),
        (r'РјР°С€иРЅи', 'машини'),
        (r'РїСЂРѕиР·веР¶даС‚', 'произвеждат'),
        (r'РїРѕСЂСЊС‡РєР°', 'поръчка'),
        (r'споСЂеРґ', 'според'),
        (r'РЅСѓР¶РґиС‚е', 'нуждите'),
        (r'РєР»иент', 'клиент'),
        (r'иРЅРґивиРґСѓР°Р»на', 'индивидуална'),
        (r'РѕС„еСЂС‚Р°', 'оферта'),
        (r'РєРѕРЅсСѓР»С‚Р°С†иСЏ', 'консултация'),
        (r'Р"Р°СЂР°РЅС†иСЏ', 'Гаранция'),
        (r'РїРѕддръжка', 'поддръжка'),
        (r'Р'сиС‡Рєи', 'Всички'),
        (r'наС€и', 'наши'),
        (r'досС‚Р°вСЏС‚', 'доставят'),
        (r'РџСЊР»на', 'Пълна'),
        (r'РіР°СЂР°РЅС†иСЏ', 'гаранция'),
        (r'РїСЂРѕиР·веРґеРЅотРѕ', 'произведеното'),
        (r'РћР±СѓС‡еРЅие', 'Обучение'),
        (r'РїеСЂсРѕнаР»Р°', 'персонала'),
        (r'СЂР°Р±отР°', 'работа'),
        (r'РјР°С€инаС‚Р°', 'машината'),
        (r'Р"Р°СЂР°РЅС†иРѕРЅРЅРѕ', 'Гаранционно'),
        (r'сР»еРґРіР°СЂР°РЅС†иРѕРЅРЅРѕ', 'следгаранционно'),
        (r'С‚еС…РЅиС‡есРєРѕ', 'техническо'),
        (r'РѕР±сР»СѓР¶вР°РЅе', 'обслужване'),
        (r'Р"РѕсС‚Р°вРєР°', 'Доставка'),
        (r'СЂезервни', 'резервни'),
        (r'С‡Р°сС‚и', 'части'),
        (r'РїСЂР°вР°', 'права'),
        (r'Р·Р°РїР°зени', 'запазени'),
        (r'РџСЂеРґиС€на', 'Предишна'),
        (r'РЎР»еРґваща', 'Следваща'),
        (r'Р'СЊСЂРЅеС‚е', 'Върнете'),
        (r'РіРѕСЂе', 'горе'),
        (r'Р'Р°С€РµС‚Рѕ', 'Вашето'),
        (r'Р'Р°С€иСЏС‚', 'Вашият'),
        (r'вР°С€РµС‚Рѕ', 'вашето'),
        (r'вР°С€иСЏС‚', 'вашият'),
        (r'сСЊРѕР±С‰РµРЅиРµ', 'съобщение'),
        (r'вСЊРїСЂРѕс', 'въпрос'),
        (r'РќР°С€иС‚е', 'Нашите'),
        (r'услуги', 'услуги'),
        (r'вРєР»СЋС‡вР°С‚', 'включват'),
        (r'наС€иС‚е', 'нашите'),
        (r'РїСЂРѕиР·воРґсС‚вРѕ', 'производство'),
        (r'Р'иРґеРѕ', 'Видео'),
        (r'РґеРјРѕРЅсС‚СЂР°С†иСЏ', 'демонстрация'),
        (r'РґеРјРѕРЅсС‚СЂР°С†иРѕРЅРЅи', 'демонстрационни'),
        (r'виРґеР°', 'видеа'),
        (r'Р'иР¶С‚е', 'Вижте'),
        (r'посеС‚еС‚е', 'посетете'),
        (r'наС€иСЏ', 'нашия'),
        (r'РїСЂРѕиР·воРґсС‚веРЅ', 'производствен'),
        (r'С†еС…', 'цех'),
        (r'С„СЂеР·РѕвР°', 'фрезова'),
        (r'отдоР»Сѓ', 'отдолу'),
        (r'заРѕР±Р»СЏ', 'заобля'),
        (r'СЂСЉР±РѕвеС‚е', 'ръбовете'),
        (r'отРїСЂеРґ', 'отпред'),
        (r'отзаРґ', 'отзад'),
        (r'С€РєСѓСЂРєи', 'шкурки'),
    ]
    
    for garbled, correct in mappings:
        corrections[garbled] = correct
    
    return corrections

def fix_file(filepath, corrections):
    """Fix encoding in a single HTML file."""
    print(f"Processing: {filepath}")
    
    # Read the file removing BOM
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # Apply corrections - sort by length (longest first)
    for garbled in sorted(corrections.keys(), key=len, reverse=True):
        correct = corrections[garbled]
        if garbled in content:
            count = content.count(garbled)
            content = content.replace(garbled, correct)
            changes += count
            print(f"  Fixed {count}x: '{garbled[:40]}...' -> '{correct[:40]}...'")
    
    # Write back without BOM
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print(f"  ✓ Saved with {changes} fixes")
    else:
        print(f"  - No changes needed")
    
    return changes

def main():
    """Fix all HTML files."""
    base_dir = Path('.')
    
    corrections = create_corrections_from_manual_list()
    print(f"Loaded {len(corrections)} corrections\n")
    
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
        'favicon-generator.html',
    ]
    
    total_changes = 0
    for html_file in html_files:
        filepath = base_dir / html_file
        if filepath.exists():
            changes = fix_file(str(filepath), corrections)
            total_changes += changes
        else:
            print(f"Warning: Not found: {filepath}")
    
    print(f"\n✓ All files processed! Total fixes: {total_changes}")

if __name__ == '__main__':
    main()
