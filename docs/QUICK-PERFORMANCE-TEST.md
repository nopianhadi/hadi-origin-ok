# 🚀 Quick Performance Testing Guide

## Langkah-langkah Testing

### 1. **Build & Preview**
```bash
# Build optimized version
npm run build

# Start preview server
npm run preview
```

### 2. **Browser Testing**
1. Buka `http://localhost:4173/` di browser
2. Buka Developer Tools (F12)
3. Pilih tab **Console**
4. Copy-paste script dari `performance-test.js`
5. Lihat hasil analisis performa

### 3. **Mobile Device Simulation**
1. Di Chrome DevTools, klik **Toggle Device Toolbar** (Ctrl+Shift+M)
2. Pilih device: **iPhone 12 Pro** atau **Pixel 5**
3. Set network: **Slow 3G** untuk test koneksi lambat
4. Refresh halaman dan jalankan test

### 4. **Lighthouse Audit**
1. Di DevTools, pilih tab **Lighthouse**
2. Pilih **Mobile** device
3. Check **Performance**, **Accessibility**, **Best Practices**, **SEO**
4. Klik **Generate report**

## Target Performance Metrics

### ✅ **Excellent Performance**
- **Performance Score**: 90-100
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms
- **Bundle Size**: < 150KB gzipped

### ⚠️ **Good Performance**
- **Performance Score**: 70-89
- **FCP**: 1.5-3s
- **LCP**: 2.5-4s
- **CLS**: 0.1-0.25
- **FID**: 100-300ms

### ❌ **Needs Improvement**
- **Performance Score**: < 70
- **FCP**: > 3s
- **LCP**: > 4s
- **CLS**: > 0.25
- **FID**: > 300ms

## Quick Test Commands

### Console Commands
```javascript
// Run all performance tests
performanceTest.runAll()

// Test specific areas
performanceTest.bundleSize()  // Check file sizes
performanceTest.webVitals()   // Core Web Vitals
performanceTest.fps()         // Frame rate monitoring
performanceTest.device()      // Device capabilities
```

### Network Throttling Test
1. **Fast 3G**: Simulates good mobile connection
2. **Slow 3G**: Simulates poor mobile connection
3. **Offline**: Test offline functionality

### Device Testing Priority
1. **iPhone 12 Pro** (375x812) - iOS Safari simulation
2. **Pixel 5** (393x851) - Android Chrome simulation
3. **iPad Air** (820x1180) - Tablet view
4. **Desktop** (1920x1080) - Desktop view

## Expected Results

### Bundle Analysis
```
📦 Bundle Size Analysis:
Total Resources: ~180 KB
JavaScript: ~140 KB
CSS: ~27 KB
```

### Core Web Vitals
```
⚡ Core Web Vitals:
FCP: <1500ms
DOM Content Loaded: <2000ms
Load Complete: <3000ms
```

### Device Detection
```
📱 Device Capabilities:
✅ is-mobile (if mobile device)
✅ reduce-motion (if enabled)
❌ low-end-device (should be false on modern devices)
❌ slow-connection (depends on network)
```

### FPS Monitoring
```
🎯 FPS Monitoring:
Current FPS: 60 (ideal)
Current FPS: 30+ (acceptable)
Current FPS: <30 (needs optimization)
```

## Troubleshooting

### Low Performance Score
1. Check bundle sizes - should be < 200KB total
2. Verify lazy loading is working
3. Check if animations are disabled on mobile
4. Test on actual mobile device

### High Bundle Size
1. Run `npm run build:analyze` to see chunk breakdown
2. Check for unused dependencies
3. Verify tree shaking is working
4. Consider further code splitting

### Poor Mobile Experience
1. Test on real mobile device
2. Check touch targets (min 44px)
3. Verify text is readable (min 16px)
4. Test with slow network connection

## Real Device Testing

### iOS Testing
- Safari on iPhone/iPad
- Test touch interactions
- Check iOS-specific rendering

### Android Testing  
- Chrome on Android device
- Test different screen densities
- Check Android-specific behaviors

## Performance Monitoring in Production

### Setup Analytics
```javascript
// Add to production build
if ('web-vital' in window) {
  // Monitor Core Web Vitals
  // Send to analytics service
}
```

### Error Tracking
- Monitor JavaScript errors
- Track performance regressions
- Set up alerts for poor performance

## Next Steps After Testing

1. **Document Results**: Record performance scores
2. **Identify Issues**: Note any performance problems
3. **Prioritize Fixes**: Focus on critical issues first
4. **Re-test**: Verify improvements after fixes
5. **Monitor**: Set up ongoing performance monitoring

## Quick Commands Summary

```bash
# Development
npm run dev

# Build & Test
npm run build
npm run preview

# Performance Analysis
npm run build:analyze

# Update dependencies
npm update
npx update-browserslist-db@latest
```

Jalankan test ini secara berkala untuk memastikan performa tetap optimal! 🚀