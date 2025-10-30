// Performance Testing Script
// Run this in browser console to test mobile performance

console.log('🚀 Starting Mobile Performance Test...');

// Test 1: Bundle Size Analysis
function testBundleSize() {
  console.log('\n📦 Bundle Size Analysis:');
  
  const resources = performance.getEntriesByType('resource');
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  
  resources.forEach(resource => {
    if (resource.transferSize) {
      totalSize += resource.transferSize;
      
      if (resource.name.includes('.js')) {
        jsSize += resource.transferSize;
      } else if (resource.name.includes('.css')) {
        cssSize += resource.transferSize;
      }
    }
  });
  
  console.log(`Total Resources: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`JavaScript: ${(jsSize / 1024).toFixed(2)} KB`);
  console.log(`CSS: ${(cssSize / 1024).toFixed(2)} KB`);
}

// Test 2: Core Web Vitals
function testCoreWebVitals() {
  console.log('\n⚡ Core Web Vitals:');
  
  // FCP - First Contentful Paint
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry) {
    console.log(`FCP: ${fcpEntry.startTime.toFixed(2)}ms`);
  }
  
  // Navigation timing
  const navEntry = performance.getEntriesByType('navigation')[0];
  if (navEntry) {
    console.log(`DOM Content Loaded: ${navEntry.domContentLoadedEventEnd - navEntry.fetchStart}ms`);
    console.log(`Load Complete: ${navEntry.loadEventEnd - navEntry.fetchStart}ms`);
  }
}

// Test 3: FPS Monitoring
function testFPS() {
  console.log('\n🎯 FPS Monitoring (10 seconds):');
  
  let frames = 0;
  let lastTime = performance.now();
  
  function measureFPS() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      console.log(`Current FPS: ${fps}`);
      
      frames = 0;
      lastTime = currentTime;
    }
    
    if (currentTime < lastTime + 10000) {
      requestAnimationFrame(measureFPS);
    }
  }
  
  requestAnimationFrame(measureFPS);
}

// Test 4: Device Capabilities
function testDeviceCapabilities() {
  console.log('\n📱 Device Capabilities:');
  
  console.log(`Screen: ${window.innerWidth}x${window.innerHeight}`);
  console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);
  console.log(`Hardware Concurrency: ${navigator.hardwareConcurrency || 'Unknown'}`);
  console.log(`Device Memory: ${navigator.deviceMemory || 'Unknown'} GB`);
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    console.log(`Connection Type: ${connection.effectiveType}`);
    console.log(`Downlink: ${connection.downlink} Mbps`);
  }
}

// Test 5: Mobile Performance Classes
function testPerformanceClasses() {
  console.log('\n🔧 Performance Classes Applied:');
  
  const classes = document.documentElement.classList;
  const performanceClasses = ['is-mobile', 'low-end-device', 'slow-connection', 'reduce-motion', 'low-performance'];
  
  performanceClasses.forEach(className => {
    if (classes.contains(className)) {
      console.log(`✅ ${className}`);
    } else {
      console.log(`❌ ${className}`);
    }
  });
}

// Test 6: Animation Performance
function testAnimationPerformance() {
  console.log('\n🎨 Animation Performance Test:');
  
  const testElement = document.createElement('div');
  testElement.style.cssText = `
    position: fixed;
    top: -100px;
    left: 50%;
    width: 50px;
    height: 50px;
    background: blue;
    border-radius: 50%;
    z-index: 9999;
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(testElement);
  
  let startTime = performance.now();
  let frameCount = 0;
  
  function animateTest() {
    frameCount++;
    testElement.style.transform = `translateY(${Math.sin(performance.now() * 0.01) * 100}px)`;
    
    if (performance.now() - startTime < 3000) {
      requestAnimationFrame(animateTest);
    } else {
      const avgFPS = Math.round(frameCount / 3);
      console.log(`Animation FPS: ${avgFPS}`);
      document.body.removeChild(testElement);
    }
  }
  
  requestAnimationFrame(animateTest);
}

// Run all tests
function runAllTests() {
  testBundleSize();
  testCoreWebVitals();
  testDeviceCapabilities();
  testPerformanceClasses();
  testFPS();
  testAnimationPerformance();
  
  console.log('\n✅ Performance test completed! Check results above.');
  console.log('\n📊 Recommendations:');
  console.log('- FCP should be < 1500ms');
  console.log('- Load time should be < 3000ms');
  console.log('- FPS should be 30+ (60+ ideal)');
  console.log('- Bundle size should be < 200KB total');
}

// Auto-run tests
setTimeout(runAllTests, 2000);

// Export for manual testing
window.performanceTest = {
  runAll: runAllTests,
  bundleSize: testBundleSize,
  webVitals: testCoreWebVitals,
  fps: testFPS,
  device: testDeviceCapabilities,
  classes: testPerformanceClasses,
  animation: testAnimationPerformance
};

console.log('📋 Available commands:');
console.log('- performanceTest.runAll() - Run all tests');
console.log('- performanceTest.bundleSize() - Test bundle sizes');
console.log('- performanceTest.webVitals() - Test Core Web Vitals');
console.log('- performanceTest.fps() - Monitor FPS for 10s');
console.log('- performanceTest.device() - Show device info');
console.log('- performanceTest.classes() - Check performance classes');
console.log('- performanceTest.animation() - Test animation performance');