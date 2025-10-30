-- ============================================
-- API KEYS SEED DATA
-- Data awal untuk tabel api_keys
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.api_keys CASCADE;

-- Insert sample API keys
INSERT INTO public.api_keys (name, description, endpoint, method, status, rate_limit, documentation, created_by, expires_at) 
SELECT * FROM (VALUES
  (
    'Portfolio API',
    'API untuk mengakses data portfolio dan proyek',
    '/api/v1/portfolio',
    'GET',
    'active',
    1000,
    'API untuk mengambil data portfolio, proyek, dan informasi publik lainnya. Mendukung filtering dan pagination.',
    'admin',
    NOW() + INTERVAL '1 year'
  ),
  (
    'Projects Management API',
    'API untuk manajemen CRUD proyek (admin only)',
    '/api/v1/projects',
    'POST',
    'active',
    100,
    'API untuk create, read, update, delete proyek. Memerlukan authentication dan role admin.',
    'admin',
    NOW() + INTERVAL '6 months'
  ),
  (
    'Analytics API',
    'API untuk mengakses data analytics dan statistik',
    '/api/v1/analytics',
    'GET',
    'active',
    500,
    'API untuk mengambil data analytics, visitor statistics, dan performance metrics.',
    'admin',
    NOW() + INTERVAL '1 year'
  ),
  (
    'Contact Form API',
    'API untuk submit form kontak',
    '/api/v1/contact',
    'POST',
    'active',
    50,
    'API untuk mengirim pesan melalui form kontak. Includes spam protection dan rate limiting.',
    'admin',
    NOW() + INTERVAL '2 years'
  ),
  (
    'Blog API',
    'API untuk mengakses artikel blog',
    '/api/v1/blog',
    'GET',
    'active',
    200,
    'API untuk mengambil artikel blog, berita, dan konten editorial. Mendukung search dan filtering.',
    'admin',
    NOW() + INTERVAL '1 year'
  ),
  (
    'Development API',
    'API untuk testing dan development',
    '/api/v1/dev',
    'GET',
    'inactive',
    10,
    'API khusus untuk development dan testing. Tidak untuk production use.',
    'admin',
    NOW() + INTERVAL '3 months'
  )
) AS v(name, description, endpoint, method, status, rate_limit, documentation, created_by, expires_at)
WHERE NOT EXISTS (SELECT 1 FROM public.api_keys WHERE api_keys.name = v.name);

-- Simulasi beberapa usage untuk demo
UPDATE public.api_keys 
SET 
  usage_count = FLOOR(RANDOM() * 100) + 1,
  last_used_at = NOW() - (RANDOM() * INTERVAL '30 days')
WHERE status = 'active';

-- Verifikasi data
SELECT 
  id,
  name,
  LEFT(api_key, 10) || '...' as api_key_preview,
  endpoint,
  method,
  status,
  rate_limit,
  usage_count,
  last_used_at,
  expires_at,
  created_at
FROM public.api_keys
ORDER BY created_at DESC;

-- ============================================
-- NOTES
-- ============================================
-- 1. API keys akan di-generate otomatis dengan format hadi_xxxxxxxx
-- 2. Rate limiting per window (default 1 hour)
-- 3. Usage tracking untuk monitoring dan analytics
-- 4. Expiration date untuk security
-- 5. Status management (active, inactive, revoked)
-- 6. Documentation field untuk API documentation
-- 7. Method field untuk HTTP methods yang diizinkan