const fs = require('fs');
const path = require('path');

// Mapping of garbled text to correct Cyrillic
const replacements = {
  'РЎРѕР»РёРґРЅРѕСЃС‚': 'Солидност',
  'РљРѕРЅС‚Р°РєС‚Рё': 'Контакти',
  'РџСЂРѕРёР·РІРѕРґСЃС‚РІРѕ': 'Производство',
  'РљР°РЅС‚РѕСЃР»РµРїРІР°С‰Рё': 'Кантослепващи',
  'РњР°С€РёРЅРё': 'Машини',
  'РЎРІСЉСЂР¶РµС‚Рµ': 'Свържете',
  'С‚РµР»РµС„РѕРЅ': 'телефон',
  'РёРјРµР№Р»': 'имейл',
  'Р°РґСЂРµСЃ': 'адрес',
  'РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ': 'производство',
  'Р СѓСЃРµ': 'Русе',
  'Р'СЉР»РіР°СЂРёСЏ': 'България',
  'РєР°РЅС‚РѕСЃР»РµРїРІР°С‰Рё': 'кантослепващи',
  'РјР°С€РёРЅРё': 'машини',
  'РєР°РЅС‚РёСЂР°С‰Р°': 'кантираща',
  'РјР°С€РёРЅР°': 'машина',
  'РјРµР±РµР»РЅРѕ': 'мебелно',
  'РѕР±РѕСЂСѓРґРІР°РЅРµ': 'оборудване',
  'РєР°РЅС‚РѕСЃР»РµРїРІР°РЅРµ': 'кантослепване',
  'Р'РѕРґРµС‰': 'Водещ',
  'Р±СЉР»РіР°СЂСЃРєРё': 'български',
  'РїСЂРѕРёР·РІРѕРґРёС‚РµР»': 'производител',
  'РљР°С‡РµСЃС‚РІРѕ': 'Качество',
  'РЅР°РґРµР¶РґРЅРѕСЃС‚': 'надеждност',
  'РїСЂРѕС„РµСЃРёРѕРЅР°Р»РёР·СЉРј': 'професионализъм',
  'РњРљРђРќРўРћРЎР›Р•РџР'РђР©Р': 'КАНТОСЛЕПВАЩИ',
  'РњРђРЁРРќР': 'МАШИНИ',
  'РЎР•Р Р'РР—РќР': 'СЕРВИЗНИ',
  'РЈРЎР›РЈР"Р': 'УСЛУГИ',
  'Р'РўРћР Рђ': 'ВТОРА',
  'РЈРџРћРўР Р•Р'Рђ': 'УПОТРЕБА',
  'Р"РђР›Р•Р РРЇ': 'ГАЛЕРИЯ',
  'РЎРќРРњРљР': 'СНИМКИ',
  'Р'РР"Р•Рћ': 'ВИДЕО',
  'РљРћРќРўРђРљРўР': 'КОНТАКТИ',
  'РќРђР§РђР›Рћ': 'НАЧАЛО',
  'РЎРћР›РР"РќРћРЎРў': 'СОЛИДНОСТ'
};

// Files to process
const files = [
  'pages/kontakti.html',
  'pages/galeria.html',
  'pages/kantoslepvashti-mashini.html',
  'pages/servizni-uslugi.html',
  'pages/vtora-upotreba.html',
  'pages/video-galeria.html',
  'products/product-km7000.html',
  'products/product-km4001pe.html',
  'products/product-km900m.html',
  'products/product-km2015tpm.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply all replacements
    Object.entries(replacements).forEach(([wrong, correct]) => {
      content = content.replaceAll(wrong, correct);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log('\nDone!');
