// Test script to verify About page values array fix
import fs from 'fs';

// Read translation files
const idTranslations = JSON.parse(fs.readFileSync('./client/src/i18n/locales/id.json', 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync('./client/src/i18n/locales/en.json', 'utf8'));

console.log('🔍 Testing About Page Values Array...\n');

// Check if ourValues.values exists and has the right structure
const idValues = idTranslations.aboutPage?.ourValues?.values;
const enValues = enTranslations.aboutPage?.ourValues?.values;

if (idValues && enValues) {
  console.log(`✅ Indonesian values array: ${idValues.length} items`);
  console.log(`✅ English values array: ${enValues.length} items\n`);
  
  console.log('📋 Values content:');
  idValues.forEach((value, index) => {
    console.log(`${index + 1}. ID: ${value.title} | EN: ${enValues[index]?.title || 'Missing'}`);
  });
  
  // Check if we have enough icons and colors for all values
  const iconCount = 4; // [Rocket, Users, Award, Target]
  const colorCount = 4; // 4 color combinations
  
  console.log(`\n🎨 Icon/Color coverage:`);
  console.log(`   Icons available: ${iconCount}`);
  console.log(`   Colors available: ${colorCount}`);
  console.log(`   Values to display: ${idValues.length}`);
  
  if (iconCount >= idValues.length && colorCount >= idValues.length) {
    console.log(`✅ Perfect! We have enough icons and colors for all ${idValues.length} values.`);
  } else {
    console.log(`❌ Not enough icons or colors for ${idValues.length} values.`);
  }
  
} else {
  console.log('❌ ourValues.values array not found in translations');
}

console.log('\n🎉 Test complete!');