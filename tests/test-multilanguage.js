// Multi-Language Testing Script
// Run this in browser console to test language functionality

console.log('🌐 Starting Multi-Language Test...');

// Test 1: Language Detection
function testLanguageDetection() {
  console.log('\n🔍 Language Detection Test:');
  
  const currentLang = localStorage.getItem('preferred-language') || 'id';
  const browserLang = navigator.language.split('-')[0];
  const documentLang = document.documentElement.lang;
  
  console.log(`Current Language: ${currentLang}`);
  console.log(`Browser Language: ${browserLang}`);
  console.log(`Document Lang: ${documentLang}`);
  console.log(`Supported: ${['id', 'en'].includes(currentLang) ? '✅' : '❌'}`);
}

// Test 2: Translation Loading
function testTranslationLoading() {
  console.log('\n📚 Translation Loading Test:');
  
  // Check if i18n is loaded
  if (window.i18n) {
    console.log('✅ i18next loaded');
    console.log(`Current Language: ${window.i18n.language}`);
    console.log(`Available Languages: ${Object.keys(window.i18n.store.data).join(', ')}`);
    
    // Test key translations
    const testKeys = [
      'nav.aiAnalyzer',
      'hero.title',
      'hero.description',
      'footer.contact'
    ];
    
    testKeys.forEach(key => {
      const translation = window.i18n.t(key);
      console.log(`${key}: ${translation.length > 0 ? '✅' : '❌'} "${translation}"`);
    });
  } else {
    console.log('❌ i18next not found');
  }
}

// Test 3: Language Switcher Elements
function testLanguageSwitcher() {
  console.log('\n🔄 Language Switcher Test:');
  
  // Check desktop switcher
  const desktopSwitcher = document.querySelector('[data-testid*="language"]') || 
                         document.querySelector('button[aria-label*="language"]') ||
                         document.querySelector('button:has(svg[data-testid="globe"])');
  
  console.log(`Desktop Switcher: ${desktopSwitcher ? '✅ Found' : '❌ Not found'}`);
  
  // Check mobile menu
  const mobileMenu = document.querySelector('#mobile-menu');
  console.log(`Mobile Menu: ${mobileMenu ? '✅ Found' : '❌ Not found'}`);
  
  // Check footer switcher
  const footerSwitcher = document.querySelector('footer button:has(span)');
  console.log(`Footer Switcher: ${footerSwitcher ? '✅ Found' : '❌ Not found'}`);
}

// Test 4: Language Switching Functionality
function testLanguageSwitching() {
  console.log('\n🔀 Language Switching Test:');
  
  if (!window.i18n) {
    console.log('❌ i18next not available for testing');
    return;
  }
  
  const originalLang = window.i18n.language;
  console.log(`Original Language: ${originalLang}`);
  
  // Test switching to English
  window.i18n.changeLanguage('en');
  setTimeout(() => {
    const newLang = window.i18n.language;
    console.log(`After switch to EN: ${newLang === 'en' ? '✅' : '❌'} ${newLang}`);
    
    // Test switching to Indonesian
    window.i18n.changeLanguage('id');
    setTimeout(() => {
      const finalLang = window.i18n.language;
      console.log(`After switch to ID: ${finalLang === 'id' ? '✅' : '❌'} ${finalLang}`);
      
      // Restore original language
      window.i18n.changeLanguage(originalLang);
    }, 100);
  }, 100);
}

// Test 5: Text Content Verification
function testTextContent() {
  console.log('\n📝 Text Content Test:');
  
  // Check if text is translated (not showing translation keys)
  const textElements = [
    { selector: 'nav a', name: 'Navigation Links' },
    { selector: 'h1', name: 'Main Heading' },
    { selector: 'button', name: 'Buttons' },
    { selector: 'footer p', name: 'Footer Text' }
  ];
  
  textElements.forEach(({ selector, name }) => {
    const elements = document.querySelectorAll(selector);
    let hasTranslationKeys = false;
    
    elements.forEach(el => {
      const text = el.textContent || '';
      if (text.includes('.') && text.split('.').length > 2) {
        hasTranslationKeys = true;
      }
    });
    
    console.log(`${name}: ${hasTranslationKeys ? '❌ Has translation keys' : '✅ Properly translated'}`);
  });
}

// Test 6: Performance Impact
function testPerformanceImpact() {
  console.log('\n⚡ Performance Impact Test:');
  
  const startTime = performance.now();
  
  // Simulate language switching
  if (window.i18n) {
    const originalLang = window.i18n.language;
    
    // Switch languages multiple times
    window.i18n.changeLanguage('en');
    window.i18n.changeLanguage('id');
    window.i18n.changeLanguage('en');
    window.i18n.changeLanguage(originalLang);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`Language switching time: ${duration.toFixed(2)}ms`);
    console.log(`Performance: ${duration < 100 ? '✅ Fast' : duration < 300 ? '⚠️ Acceptable' : '❌ Slow'}`);
  }
  
  // Check bundle size impact
  const scripts = document.querySelectorAll('script[src]');
  let totalSize = 0;
  
  scripts.forEach(script => {
    if (script.src.includes('index-')) {
      console.log(`Main bundle: ${script.src.split('/').pop()}`);
    }
  });
}

// Test 7: Mobile Responsiveness
function testMobileResponsiveness() {
  console.log('\n📱 Mobile Responsiveness Test:');
  
  const isMobile = window.innerWidth <= 768;
  console.log(`Current viewport: ${window.innerWidth}x${window.innerHeight}`);
  console.log(`Mobile mode: ${isMobile ? '✅ Yes' : '❌ No'}`);
  
  if (isMobile) {
    // Check mobile-specific elements
    const mobileMenu = document.querySelector('#mobile-menu');
    const mobileLanguageSwitcher = document.querySelector('#mobile-menu [class*="language"]');
    
    console.log(`Mobile menu: ${mobileMenu ? '✅ Found' : '❌ Not found'}`);
    console.log(`Mobile language switcher: ${mobileLanguageSwitcher ? '✅ Found' : '❌ Not found'}`);
  }
}

// Test 8: Accessibility
function testAccessibility() {
  console.log('\n♿ Accessibility Test:');
  
  // Check language switcher accessibility
  const languageButtons = document.querySelectorAll('button[aria-label*="language"], button[aria-label*="Language"]');
  console.log(`Accessible language buttons: ${languageButtons.length > 0 ? '✅' : '❌'} (${languageButtons.length} found)`);
  
  // Check document lang attribute
  const docLang = document.documentElement.lang;
  console.log(`Document lang attribute: ${docLang ? '✅' : '❌'} "${docLang}"`);
  
  // Check for proper heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  console.log(`Heading elements: ${headings.length > 0 ? '✅' : '❌'} (${headings.length} found)`);
}

// Run all tests
function runAllTests() {
  testLanguageDetection();
  testTranslationLoading();
  testLanguageSwitcher();
  testLanguageSwitching();
  testTextContent();
  testPerformanceImpact();
  testMobileResponsiveness();
  testAccessibility();
  
  console.log('\n✅ Multi-Language test completed!');
  console.log('\n📋 Manual Tests to Perform:');
  console.log('1. Click language switcher in navigation');
  console.log('2. Verify all text changes to selected language');
  console.log('3. Refresh page and check language persistence');
  console.log('4. Test on mobile device with touch interactions');
  console.log('5. Check footer language switcher');
  console.log('6. Verify smooth transitions without flickers');
}

// Auto-run tests after page load
setTimeout(runAllTests, 2000);

// Export for manual testing
window.multiLanguageTest = {
  runAll: runAllTests,
  detection: testLanguageDetection,
  loading: testTranslationLoading,
  switcher: testLanguageSwitcher,
  switching: testLanguageSwitching,
  content: testTextContent,
  performance: testPerformanceImpact,
  mobile: testMobileResponsiveness,
  accessibility: testAccessibility
};

console.log('📋 Available commands:');
console.log('- multiLanguageTest.runAll() - Run all tests');
console.log('- multiLanguageTest.detection() - Test language detection');
console.log('- multiLanguageTest.loading() - Test translation loading');
console.log('- multiLanguageTest.switcher() - Test switcher elements');
console.log('- multiLanguageTest.switching() - Test language switching');
console.log('- multiLanguageTest.content() - Test text content');
console.log('- multiLanguageTest.performance() - Test performance impact');
console.log('- multiLanguageTest.mobile() - Test mobile responsiveness');
console.log('- multiLanguageTest.accessibility() - Test accessibility');