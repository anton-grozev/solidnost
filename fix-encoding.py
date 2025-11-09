# -*- coding: utf-8 -*-
import os
import re

# Правилни замени
replacements = {
    'РЎРѕР»РёРґРЅРѕСЃС‚': 'Солидност',
    'РџСЂРѕРёР·РІРѕРґСЃС‚РІРѕ': 'Производство',
    'РљР°РЅС‚РѕСЃР»РµРїРІР°С‰Рё': 'Кантослепващи',
    'РњР°С€РёРЅРё': 'Машини',
    'Р СѓСЃРµ': 'Русе',
    'Р'СЉР»РіР°СЂРёСЏ': 'България',
}

# Обработка на всички HTML файлове  
html_files = [
    'index.html',
    'pages/galeria.html',
    'pages/kontakti.html',
    'pages/kantoslepvashti-mashini.html',
    'pages/servizni-uslugi.html',
    'pages/vtora-upotreba.html', 
    'pages/video-galeria.html',
    'products/product-km7000.html',
    'products/product-km4001pe.html',
    'products/product-km900m.html',
    'products/product-km2015tpm.html'
]

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for wrong, correct in replacements.items():
            content = content.replace(wrong, correct)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Fixed: {file}')

print('All files fixed!')
