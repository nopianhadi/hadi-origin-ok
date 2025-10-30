// Test script to verify translation keys are working
import fs from 'fs';

// Read translation files
const idTranslations = JSON.parse(fs.readFileSync('./client/src/i18n/locales/id.json', 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync('./client/src/i18n/locales/en.json', 'utf8'));

// Test sections that were mentioned as not translated
const sectionsToTest = [
  'achievements.title',
  'readyToStart.title', 
  'specialTechnology.title',
  'clientTestimonials.title',
  'partnersClients.title',
  'industriesServed.title',
  'latestTipsInsights.title',
  'wantToLearnMore.title',
  'stillHaveQuestions.title',
  'aboutPage.hero.title',
  'aboutPage.visionMission.vision.title',
  'aboutPage.visionMission.mission.title',
  'aboutPage.ourValues.title',
  'contactPage.contactInfo.title',
  'contactPage.communicationMethods.title'
];

console.log('🔍 Testing Translation Keys...\n');

let allKeysExist = true;

sectionsToTest.forEach(key => {
  const keyPath = key.split('.');
  
  // Check Indonesian
  let idValue = idTranslations;
  let enValue = enTranslations;
  
  try {
    for (const part of keyPath) {
      idValue = idValue[part];
      enValue = enValue[part];
    }
    
    if (idValue && enValue) {
      console.log(`✅ ${key}:`);
      console.log(`   ID: ${idValue}`);
      console.log(`   EN: ${enValue}\n`);
    } else {
      console.log(`❌ ${key}: Missing translation`);
      allKeysExist = false;
    }
  } catch (error) {
    console.log(`❌ ${key}: Key not found`);
    allKeysExist = false;
  }
});

if (allKeysExist) {
  console.log('🎉 All translation keys exist and have values!');
} else {
  console.log('⚠️  Some translation keys are missing.');
}