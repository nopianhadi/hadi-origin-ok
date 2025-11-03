# 🌐 Test Online URL Configuration

## 📋 Cara Test Aplikasi Online dengan TestSprite

Jika aplikasi Anda sudah di-deploy, Anda bisa test langsung ke production URL.

---

## 🔧 Setup untuk Testing Online

### Option 1: Test dengan Production URL

Jika aplikasi sudah online (Netlify/Vercel), TestSprite bisa langsung test ke URL tersebut.

### Step 1: Pastikan Aplikasi Online

1. **Cek Deployment**:
   - Netlify: https://app.netlify.com/
   - Vercel: https://vercel.com/
   - Atau custom domain Anda

2. **Verifikasi URL Accessible**:
   ```bash
   # Test dengan curl
   curl -I https://your-site.netlify.app
   ```

### Step 2: Update TestSprite Config

TestSprite akan menggunakan tunnel untuk access aplikasi. Jika aplikasi sudah online, tunnel akan connect ke production URL.

---

## 🧪 Manual Online Testing

### Quick Test Checklist:

1. **Buka Production URL** di browser:
   ```
   https://your-site.netlify.app
   ```

2. **Test Key Features**:
   - [ ] Home page loads
   - [ ] Navigation works
   - [ ] Authentication works
   - [ ] CRUD operations work
   - [ ] Images load
   - [ ] Forms submit
   - [ ] Mobile responsive

3. **Performance Check**:
   - Open DevTools (F12)
   - Lighthouse tab → Generate report
   - Check scores: Performance, Accessibility, SEO

4. **Security Check**:
   - Network tab → Check headers
   - Verify HTTPS enabled
   - Check security headers present

---

## 🔗 Production URL

**Jika aplikasi sudah deploy, silakan masukkan URL di sini:**

```
Production URL: ___________________________
```

**Contoh**:
- Netlify: `https://your-site.netlify.app`
- Vercel: `https://your-project.vercel.app`
- Custom: `https://yourdomain.com`

---

## 📝 Testing Tools Online

### Automated:
1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://www.webpagetest.org/
3. **GTmetrix**: https://gtmetrix.com/

### Security:
1. **Security Headers**: https://securityheaders.com/
2. **Mozilla Observatory**: https://observatory.mozilla.org/

---

## ✅ Next Steps

1. **Jika sudah deploy**: Test langsung di production URL
2. **Jika belum deploy**: Ikuti `DEPLOY-NETLIFY-GUIDE.md`
3. **Document results**: Gunakan checklist di `MANUAL_TEST_CHECKLIST.md`

---

*Note: Untuk test dengan TestSprite secara otomatis, pastikan aplikasi accessible (localhost atau production URL)*

