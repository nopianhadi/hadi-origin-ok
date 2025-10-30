# 🚀 Setup Guide - Portfolio Web App

Panduan lengkap untuk setup aplikasi portfolio yang menggunakan **React + Vite + Supabase**.

---

## 📋 Prerequisites

- Node.js 18+ dan npm/yarn
- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- Git (optional)

---

## 🔧 Setup Steps

### 1. Clone & Install Dependencies

```bash
# Clone repository (jika dari git)
git clone <repository-url>
cd portfolio-web

# Install dependencies
npm install
```

### 2. Setup Supabase Project

#### A. Buat Project Baru
1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi:
   - **Name**: Portfolio Web
   - **Database Password**: [simpan password ini!]
   - **Region**: Southeast Asia (Singapore) - pilih yang terdekat
4. Tunggu ~2 menit sampai project selesai dibuat

#### B. Dapatkan API Keys
1. Di Supabase Dashboard, buka **Settings > API**
2. Copy:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public** key (key yang panjang)

#### C. Setup Environment Variables
1. Buat file `.env` di root folder:
```bash
# .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Ganti dengan URL dan key dari project Anda

### 3. Setup Database

#### A. Enable Email Authentication
1. Di Supabase Dashboard, buka **Authentication > Providers**
2. Pastikan **Email** provider sudah enabled
3. Untuk development, disable **"Confirm email"**:
   - Buka **Authentication > Settings**
   - Scroll ke **"Email Auth"**
   - Uncheck **"Enable email confirmations"**

#### B. Run Database Schema
1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik **"New Query"**
3. Copy seluruh isi file `database-setup.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan muncul pesan sukses

#### C. Verifikasi Database
1. Buka **Database > Tables**
2. Pastikan tabel **projects** sudah ada
3. Klik tabel **projects**, seharusnya ada 6 sample projects

### 4. Create Admin User

#### Option A: Via Supabase Dashboard (Recommended)
1. Buka **Authentication > Users**
2. Klik **"Add User"**
3. Isi:
   - **Email**: `admin@example.com` (atau email Anda)
   - **Password**: [password yang kuat]
   - **Auto Confirm User**: ✅ (centang ini)
4. Klik **"Create User"**

#### Option B: Via Sign Up Page
1. Jalankan aplikasi (lihat step 5)
2. Buka http://localhost:5173/auth
3. Klik **"Belum punya akun? Daftar di sini"**
4. Isi email dan password
5. Klik **"Daftar"**

### 5. Run Application

```bash
# Development mode
npm run dev

# Aplikasi akan berjalan di:
# http://localhost:5173
```

### 6. Test Application

#### A. Test Homepage
1. Buka http://localhost:5173
2. Pastikan homepage muncul dengan baik
3. Scroll ke bagian **"Proyek Portfolio"**
4. Pastikan 6 sample projects muncul

#### B. Test Authentication
1. Buka http://localhost:5173/auth
2. Login dengan kredensial admin yang dibuat di step 4
3. Seharusnya redirect ke `/admin`

#### C. Test Admin Dashboard
1. Setelah login, Anda akan di halaman `/admin`
2. Test fitur:
   - ✅ Lihat list projects
   - ✅ Tambah project baru
   - ✅ Edit project
   - ✅ Hapus project
   - ✅ Filter & search projects

---

## 🎨 Customization

### Update Branding
Edit file `client/src/pages/AuthPage.tsx`:
```typescript
// Ganti logo/nama
<h1 className="text-3xl font-bold">
  Masuk ke Admin  // ← Ganti ini
</h1>
```

### Update Homepage Content
Edit file `client/src/pages/Home.tsx`:
- Hero section
- Features
- Statistics
- dll.

### Update Styling
Edit file `client/src/index.css` untuk custom styles.

---

## 📦 Build for Production

```bash
# Build aplikasi
npm run build

# Preview build
npm run preview
```

File hasil build ada di folder `dist/`.

---

## 🚀 Deploy

### Deploy ke Netlify

1. **Connect Repository**
   - Login ke [Netlify](https://netlify.com)
   - Klik **"Add new site" > "Import an existing project"**
   - Connect ke Git repository Anda

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Add Environment Variables**
   - Buka **Site settings > Environment variables**
   - Tambahkan:
     ```
     VITE_SUPABASE_URL = https://xxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

4. **Deploy**
   - Klik **"Deploy site"**
   - Tunggu ~2 menit
   - Site Anda live! 🎉

### Deploy ke Vercel

1. **Import Project**
   - Login ke [Vercel](https://vercel.com)
   - Klik **"Add New" > "Project"**
   - Import Git repository

2. **Configure Project**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Add Environment Variables**
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Deploy**
   - Klik **"Deploy"**
   - Site Anda live! 🎉

---

## 🔒 Security Checklist

- ✅ **Environment Variables**: Jangan commit file `.env` ke Git
- ✅ **Supabase Keys**: Gunakan `anon` key untuk client, bukan `service_role` key
- ✅ **RLS Policies**: Sudah disetup di `database-setup.sql`
- ✅ **HTTPS**: Netlify/Vercel otomatis provide HTTPS
- ✅ **Email Confirmation**: Enable untuk production

---

## 🐛 Common Issues

### Issue: "Missing Supabase environment variables"
**Solution**: 
- Pastikan file `.env` ada di root folder
- Pastikan variable names benar: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
- Restart dev server setelah edit `.env`

### Issue: "Invalid login credentials"
**Solution**:
- Pastikan user sudah dibuat di Supabase Dashboard
- Pastikan email dan password benar
- Cek di **Authentication > Users** apakah user ada

### Issue: "new row violates row-level security policy"
**Solution**:
- Pastikan user sudah login
- Pastikan RLS policies sudah dijalankan (cek `database-setup.sql`)
- Cek di **Database > Tables > projects > Policies**

### Issue: Projects tidak muncul di homepage
**Solution**:
- Cek di **Database > Tables > projects** apakah ada data
- Jalankan ulang seed data dari `database-setup.sql`
- Cek console browser untuk error

### Issue: Build error saat deploy
**Solution**:
- Pastikan environment variables sudah diset di Netlify/Vercel
- Jalankan `npm run build` locally untuk test
- Cek build logs untuk error spesifik

---

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Netlify / Vercel

---

## 📞 Support

Jika ada masalah:
1. Cek file `MIGRATION-SUPABASE.md` untuk detail teknis
2. Cek Supabase Dashboard untuk logs
3. Cek browser console untuk error messages

---

## 🎉 Selamat!

Aplikasi portfolio Anda sudah siap digunakan! 

Next steps:
- 🎨 Customize design sesuai brand Anda
- 📝 Tambah projects Anda sendiri
- 🚀 Deploy ke production
- 📊 Setup analytics (optional)

Happy coding! 💻✨
