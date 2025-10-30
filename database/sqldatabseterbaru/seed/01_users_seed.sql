-- ============================================
-- USERS SEED DATA
-- Data awal untuk tabel users
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.users CASCADE;

-- Insert admin users (DEVELOPMENT ONLY - menggunakan plaintext password)
INSERT INTO public.users (username, password, email, full_name, role, is_active) 
SELECT * FROM (VALUES
  (
    'admin', 
    'Admin123', -- DEVELOPMENT ONLY: plaintext password
    'admin@hadiorigin.com',
    'Administrator',
    'admin',
    true
  ),
  (
    'editor', 
    'Editor123', -- DEVELOPMENT ONLY: plaintext password
    'editor@hadiorigin.com',
    'Content Editor',
    'editor',
    true
  ),
  (
    'viewer', 
    'Viewer123', -- DEVELOPMENT ONLY: plaintext password
    'viewer@hadiorigin.com',
    'Content Viewer',
    'viewer',
    true
  ),
  (
    'demo', 
    'Demo123', -- DEVELOPMENT ONLY: plaintext password
    'demo@hadiorigin.com',
    'Demo User',
    'admin',
    true
  )
) AS v(username, password, email, full_name, role, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.users WHERE users.username = v.username);

-- Update last_login untuk admin
UPDATE public.users 
SET last_login = NOW() - INTERVAL '1 hour'
WHERE username = 'admin';

-- Verifikasi data
SELECT 
  id,
  username,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM public.users
ORDER BY created_at;

-- ============================================
-- NOTES
-- ============================================
-- 1. Ganti password hash dengan bcrypt hash yang benar di production
-- 2. Untuk generate bcrypt hash, gunakan:
--    - Node.js: bcrypt.hashSync('password', 10)
--    - Python: bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())
-- 3. Lebih baik gunakan Supabase Auth daripada custom user table
-- 4. Pastikan email address valid dan accessible
-- 5. Hapus atau nonaktifkan demo user di production