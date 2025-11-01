# 🚀 Panduan Deploy ke Netlify - Step by Step

## Metode 1: Deploy via Netlify Dashboard (RECOMMENDED)

### Step 1: Persiapan File
✅ Sudah siap - tidak perlu action

### Step 2: Build Lokal (Optional - untuk test)
```bash
npm install
npm run build
```

Jika build berhasil, akan ada folder `dist` yang berisi file production.

### Step 3: Deploy ke Netlify

#### A. Via Drag & Drop (Paling Cepat)

1. **Buka Netlify:**
   - Go to: https://app.netlify.com/
   - Login atau Sign up (bisa pakai GitHub/Email)

2. **Deploy Site:**
   - Klik "Add new site" → "Deploy manually"
   - Drag & drop folder `dist` ke area upload
   - Tunggu 1-2 menit

3. **Set Environment Variables:**
   - Setelah deploy, klik site name
   - Go to: Site settings → Environment variables
   - Add variables:
     ```
     VITE_SUPABASE_URL = https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY = your-anon-key-here
     VITE_GEMINI_API_KEY = your-key (optional)
     ```

4. **Redeploy:**
   - Klik "Deploys" tab
   - Klik "Trigger deploy" → "Deploy site"

#### B. Via Git (Auto Deploy)

1. **Push ke GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

2. **Connect di Netlify:**
   - Klik "Add new site" → "Import an existing project"
   - Pilih GitHub
   - Pilih repository Anda
   - Build settings (auto-detect):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Klik "Deploy"

3. **Set Environment Variables:**
   - Site settings → Environment variables
   - Add semua variables seperti di atas

---

## Metode 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```

### Step 3: Build
```bash
npm run build
```

### Step 4: Deploy
```bash
# Deploy preview
netlify deploy

# Deploy production
netlify deploy --prod
```

---

## 🔧 Troubleshooting

### Build Failed?
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### Environment Variables Not Working?
- Pastikan nama variable diawali dengan `VITE_`
- Redeploy setelah menambah variables
- Check di Netlify build logs

### 404 Errors?
- Pastikan `netlify.toml` ada di root folder
- Check redirects configuration

---

## ✅ Checklist Sebelum Deploy

- [ ] Build berhasil lokal: `npm run build`
- [ ] File `netlify.toml` ada di root
- [ ] Supabase project sudah aktif
- [ ] Punya Supabase URL & Anon Key
- [ ] (Optional) Execute RLS SQL script

---

## 📝 Setelah Deploy

1. **Test Website:**
   - Buka URL Netlify (e.g., `your-site.netlify.app`)
   - Test semua halaman
   - Check browser console untuk errors

2. **Custom Domain (Optional):**
   - Site settings → Domain management
   - Add custom domain
   - Update DNS records

3. **Monitor:**
   - Check Netlify Analytics
   - Monitor Supabase usage
   - Check error logs

---

## 🎯 Quick Deploy Commands

```bash
# Build lokal
npm run build

# Deploy via CLI (production)
netlify deploy --prod

# Check deploy status
netlify status

# Open site in browser
netlify open:site
```

---

**Estimasi Waktu Total:** 10-15 menit
**Difficulty:** ⭐⭐☆☆☆ (Easy)
