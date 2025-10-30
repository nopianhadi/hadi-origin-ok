-- =============================================
-- Create Admin User for Portfolio Dashboard
-- =============================================
-- Jalankan SQL ini di Supabase SQL Editor untuk membuat admin user

-- CARA 1: Buat Admin User via Supabase Dashboard (RECOMMENDED)
-- ============================================================
-- 1. Buka Supabase Dashboard
-- 2. Klik "Authentication" > "Users"
-- 3. Klik "Add User" (tombol hijau)
-- 4. Isi form:
--    - Email: admin@portfoliohadi.com (atau email Anda)
--    - Password: [password yang kuat, minimal 6 karakter]
--    - Auto Confirm User: ✅ CENTANG INI!
-- 5. Klik "Create User"
-- 6. User siap digunakan untuk login!

-- CARA 2: Buat User via SQL (Alternative)
-- ========================================
-- Note: Ini hanya untuk development/testing
-- Untuk production, gunakan Cara 1 di atas

-- Cek apakah sudah ada user
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- =============================================
-- TESTING LOGIN
-- =============================================
-- Setelah membuat user, test login:
-- 1. Buka http://localhost:5174/auth
-- 2. Masukkan email dan password yang Anda buat
-- 3. Klik "Masuk"
-- 4. Jika berhasil, akan redirect ke /admin

-- =============================================
-- TROUBLESHOOTING
-- =============================================

-- Jika login gagal, cek:
-- 1. Email sudah confirmed?
SELECT email, email_confirmed_at FROM auth.users;

-- 2. Confirm email secara manual (jika belum):
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@portfoliohadi.com';

-- 3. Reset password (jika lupa):
-- Gunakan fitur "Reset Password" di Supabase Dashboard
-- Authentication > Users > Click user > Reset Password

-- =============================================
-- SECURITY NOTES
-- =============================================
-- ✅ Gunakan email yang valid
-- ✅ Password minimal 8 karakter dengan kombinasi huruf, angka, simbol
-- ✅ Jangan share kredensial admin
-- ✅ Enable 2FA di production (optional tapi recommended)
-- ✅ Untuk production, enable "Email Confirmations" di:
--    Authentication > Settings > Email Auth

-- =============================================
-- DEFAULT ADMIN CREDENTIALS (untuk testing)
-- =============================================
-- Email: admin@portfoliohadi.com
-- Password: [Anda yang tentukan saat create user]
-- 
-- PENTING: Ganti password ini setelah login pertama kali!
-- =============================================
