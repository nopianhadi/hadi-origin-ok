# 🌐 Quick Multi-Language Testing Guide

## Langkah-langkah Testing

### 1. **Start Preview Server**
```bash
npm run build
npm run preview
```
Server akan berjalan di: `http://localhost:4174/`

### 2. **Desktop Testing**

#### **Navigation Language Switcher**
1. Buka `http://localhost:4174/`
2. Lihat navigation bar (kanan atas)
3. Klik tombol dengan icon 🌐 dan "ID"
4. Pilih "🇺🇸 English" dari dropdown
5. **Verifikasi**: Semua text berubah ke English

#### **Persistence Test**
1. Ganti bahasa ke English
2. Refresh halaman (F5)
3. **Verifikasi**: Bahasa tetap English (tersimpan di localStorage)

### 3. **Mobile Testing**

#### **Mobile Menu Language Switcher**
1. Resize browser ke mobile (< 768px) atau gunakan DevTools mobile mode
2. Klik hamburger menu (☰)
3. Scroll ke bawah, lihat section "Language / Bahasa"
4. Klik tombol bahasa yang diinginkan
5. **Verifikasi**: Text berubah dan menu tertutup

#### **Touch Interaction**
1. Test di device mobile asli
2. Pastikan tombol language mudah di-tap (min 44px)
3. **Verifikasi**: Smooth transition tanpa lag

### 4. **Footer Language Switcher**

#### **Footer Testing**
1. Scroll ke footer
2. Lihat bagian kanan bawah "Language:"
3. Klik "🇮🇩 ID" atau "🇺🇸 EN"
4. **Verifikasi**: Bahasa berubah instantly

### 5. **Browser Console Testing**

#### **Automated Testing**
1. Buka Developer Tools (F12)
2. Pilih tab **Console**
3. Copy-paste script dari `test-multilanguage.js`
4. Lihat hasil automated test

#### **Manual Commands**
```javascript
// Test semua fungsi
multiLanguageTest.runAll()

// Test spesifik
multiLanguageTest.detection()    // Language detection
multiLanguageTest.switching()    // Language switching
multiLanguageTest.performance()  // Performance impact
```

## Expected Results

### ✅ **Successful Tests**

#### **Language Detection**
```
🔍 Language Detection Test:
Current Language: id
Browser Language: en
Document Lang: id
Supported: ✅
```

#### **Translation Loading**
```
📚 Translation Loading Test:
✅ i18next loaded
Current Language: id
Available Languages: id, en
nav.aiAnalyzer: ✅ "AI Analyzer"
hero.title: ✅ "Bangun"
```

#### **Language Switching**
```
🔀 Language Switching Test:
Original Language: id
After switch to EN: ✅ en
After switch to ID: ✅ id
```

#### **Performance**
```
⚡ Performance Impact Test:
Language switching time: 45.23ms
Performance: ✅ Fast
```

### ❌ **Common Issues & Solutions**

#### **Translation Keys Showing**
- **Problem**: Text shows "nav.aiAnalyzer" instead of "AI Analyzer"
- **Solution**: Check if i18n is properly initialized
- **Fix**: Refresh page or check console for errors

#### **Language Not Persisting**
- **Problem**: Language resets to Indonesian on refresh
- **Solution**: Check localStorage
- **Fix**: Clear browser cache and try again

#### **Mobile Switcher Not Working**
- **Problem**: Mobile language switcher not responding
- **Solution**: Check mobile menu is properly opened
- **Fix**: Ensure viewport width < 768px

## Visual Verification Checklist

### 🇮🇩 **Indonesian (Default)**
- [ ] Navigation: "AI Analyzer", "Layanan", "Portfolio", "Testimoni", "Harga"
- [ ] Hero: "Bangun Website & Mobile App yang Mengembangkan Bisnis"
- [ ] Button: "Konsultasi Gratis", "Coba AI Analyzer"
- [ ] Footer: "Hubungi Saya", "Link Cepat"

### 🇺🇸 **English**
- [ ] Navigation: "AI Analyzer", "Services", "Portfolio", "Testimonials", "Pricing"
- [ ] Hero: "Build Website & Mobile App that Grow Your Business"
- [ ] Button: "Free Consultation", "Try AI Analyzer"
- [ ] Footer: "Contact", "Quick Links"

## Performance Benchmarks

### **Bundle Size Impact**
- **Before i18n**: 595KB (140KB gzipped)
- **After i18n**: 666KB (163KB gzipped)
- **Impact**: +71KB (+23KB gzipped) ✅ **Acceptable**

### **Runtime Performance**
- **Language Switch**: < 100ms ✅ **Fast**
- **Initial Load**: < 1.5s ✅ **Good**
- **Memory Usage**: +2-3MB ✅ **Minimal**

## Browser Compatibility

### ✅ **Supported Browsers**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- iOS Safari 14+ ✅
- Android Chrome 90+ ✅

### **Feature Support**
- localStorage ✅
- navigator.language ✅
- document.documentElement.lang ✅
- CSS :lang() selector ✅

## SEO Testing

### **Language Attributes**
1. Check `<html lang="id">` or `<html lang="en">`
2. Verify meta description changes with language
3. Check proper text direction (LTR)

### **Search Engine Optimization**
```html
<!-- Indonesian -->
<html lang="id">
<meta name="description" content="Agency profesional...">

<!-- English -->
<html lang="en">
<meta name="description" content="Professional agency...">
```

## Accessibility Testing

### **Screen Reader Support**
1. Test with screen reader (NVDA/JAWS)
2. Verify language announcements
3. Check proper heading structure

### **Keyboard Navigation**
1. Tab through language switcher
2. Press Enter/Space to activate
3. Verify focus indicators

## Mobile Device Testing

### **Real Device Testing**
1. **iPhone**: Safari + Chrome
2. **Android**: Chrome + Samsung Browser
3. **iPad**: Safari landscape/portrait

### **Touch Targets**
- Language buttons: min 44px ✅
- Dropdown items: min 44px ✅
- Footer buttons: min 44px ✅

## Troubleshooting

### **Common Issues**

#### **1. Language Not Changing**
```javascript
// Check in console
console.log(window.i18n.language);
console.log(localStorage.getItem('preferred-language'));
```

#### **2. Translation Missing**
```javascript
// Check translation exists
console.log(window.i18n.t('nav.services'));
```

#### **3. Performance Issues**
```javascript
// Monitor performance
console.time('language-switch');
window.i18n.changeLanguage('en');
console.timeEnd('language-switch');
```

## Success Criteria

### ✅ **All Tests Pass When:**
1. Language switcher visible in all variants (desktop/mobile/footer)
2. All text translates correctly between ID ↔ EN
3. Language preference persists after refresh
4. Performance impact < 100ms for switching
5. Mobile touch interactions work smoothly
6. No console errors during language changes
7. SEO attributes update properly
8. Accessibility features work correctly

## Next Steps After Testing

1. **Document any issues found**
2. **Test with real users** (Indonesian & English speakers)
3. **Monitor performance** in production
4. **Plan additional languages** if needed
5. **Implement URL-based routing** (/en/, /id/) for better SEO

Selamat testing! 🚀 Happy testing! 🌍