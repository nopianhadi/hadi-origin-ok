-- ============================================
-- SETTINGS SEED DATA
-- Data awal untuk tabel settings
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.settings CASCADE;

-- Insert application settings
INSERT INTO public.settings (key, value, type, category, description, is_public, is_required) 
SELECT * FROM (VALUES

-- Site Configuration
(
  'site_title',
  '"Hadi Origin - Professional Web Development & Digital Solutions"'::jsonb,
  'string',
  'site',
  'Judul utama website yang ditampilkan di header dan meta tags',
  true,
  true
),
(
  'site_description',
  '"Hadi Origin adalah perusahaan pengembangan web profesional yang mengkhususkan diri dalam solusi digital inovatif, termasuk e-commerce, healthcare, dan platform fintech dengan teknologi modern."'::jsonb,
  'string',
  'site',
  'Deskripsi website untuk SEO dan meta tags',
  true,
  true
),
(
  'site_keywords',
  '["web development", "mobile app", "AI development", "e-commerce", "healthcare technology", "fintech", "digital transformation", "Indonesia", "Jakarta"]'::jsonb,
  'array',
  'site',
  'Keywords untuk SEO optimization',
  true,
  false
),
(
  'site_logo',
  '"https://hadiorigin.com/assets/logo.png"'::jsonb,
  'string',
  'site',
  'URL logo utama website',
  true,
  true
),
(
  'site_favicon',
  '"https://hadiorigin.com/assets/favicon.ico"'::jsonb,
  'string',
  'site',
  'URL favicon website',
  true,
  false
),

-- Contact Information
(
  'contact_email',
  '"contact@hadiorigin.com"'::jsonb,
  'string',
  'contact',
  'Email utama untuk kontak bisnis',
  true,
  true
),
(
  'contact_phone',
  '"+62 895-4061-81407"'::jsonb,
  'string',
  'contact',
  'Nomor telepon utama untuk kontak',
  true,
  true
),
(
  'contact_whatsapp',
  '"62895406181407"'::jsonb,
  'string',
  'contact',
  'Nomor WhatsApp untuk chat langsung',
  true,
  true
),
(
  'contact_address',
  '"Jl. Teknologi Digital No. 123, Jakarta Selatan, DKI Jakarta 12345, Indonesia"'::jsonb,
  'string',
  'contact',
  'Alamat kantor fisik',
  true,
  false
),

-- Social Media Links
(
  'social_links',
  '{
    "github": "https://github.com/hadiorigin",
    "linkedin": "https://linkedin.com/company/hadiorigin",
    "twitter": "https://twitter.com/hadiorigin",
    "instagram": "https://instagram.com/hadiorigin",
    "youtube": "https://youtube.com/@hadiorigin",
    "facebook": "https://facebook.com/hadiorigin"
  }'::jsonb,
  'json',
  'social',
  'Links ke semua social media profiles',
  true,
  false
),

-- Business Information
(
  'company_name',
  '"Hadi Origin"'::jsonb,
  'string',
  'business',
  'Nama resmi perusahaan',
  true,
  true
),
(
  'company_tagline',
  '"Transforming Ideas into Digital Reality"'::jsonb,
  'string',
  'business',
  'Tagline atau slogan perusahaan',
  true,
  false
),
(
  'company_founded_year',
  '2019'::jsonb,
  'number',
  'business',
  'Tahun didirikan perusahaan',
  true,
  false
),
(
  'company_location',
  '"Jakarta, Indonesia"'::jsonb,
  'string',
  'business',
  'Lokasi utama perusahaan',
  true,
  false
),

-- Display Settings
(
  'featured_projects_limit',
  '6'::jsonb,
  'number',
  'display',
  'Jumlah proyek featured yang ditampilkan di homepage',
  false,
  true
),
(
  'projects_per_page',
  '12'::jsonb,
  'number',
  'display',
  'Jumlah proyek per halaman dalam pagination',
  false,
  true
),
(
  'blog_posts_per_page',
  '9'::jsonb,
  'number',
  'display',
  'Jumlah blog posts per halaman',
  false,
  true
),
(
  'testimonials_limit',
  '8'::jsonb,
  'number',
  'display',
  'Jumlah testimonial yang ditampilkan',
  false,
  false
),

-- Theme Configuration
(
  'theme_primary_color',
  '"#3B82F6"'::jsonb,
  'string',
  'theme',
  'Warna utama theme (hex color)',
  true,
  true
),
(
  'theme_secondary_color',
  '"#10B981"'::jsonb,
  'string',
  'theme',
  'Warna sekunder theme (hex color)',
  true,
  false
),
(
  'theme_dark_mode_enabled',
  'true'::jsonb,
  'boolean',
  'theme',
  'Apakah dark mode tersedia untuk user',
  true,
  false
),
(
  'theme_default_mode',
  '"light"'::jsonb,
  'string',
  'theme',
  'Mode default theme (light/dark/system)',
  true,
  false
),

-- SEO Settings
(
  'seo_google_analytics_id',
  '"G-XXXXXXXXXX"'::jsonb,
  'string',
  'seo',
  'Google Analytics tracking ID',
  false,
  false
),
(
  'seo_google_tag_manager_id',
  '"GTM-XXXXXXX"'::jsonb,
  'string',
  'seo',
  'Google Tag Manager container ID',
  false,
  false
),
(
  'seo_facebook_pixel_id',
  '"123456789012345"'::jsonb,
  'string',
  'seo',
  'Facebook Pixel ID untuk tracking',
  false,
  false
),
(
  'seo_meta_image',
  '"https://hadiorigin.com/assets/og-image.jpg"'::jsonb,
  'string',
  'seo',
  'Default Open Graph image untuk social sharing',
  true,
  false
),

-- Feature Flags
(
  'feature_blog_enabled',
  'true'::jsonb,
  'boolean',
  'features',
  'Apakah fitur blog diaktifkan',
  false,
  false
),
(
  'feature_testimonials_enabled',
  'true'::jsonb,
  'boolean',
  'features',
  'Apakah fitur testimonials diaktifkan',
  false,
  false
),
(
  'feature_newsletter_enabled',
  'true'::jsonb,
  'boolean',
  'features',
  'Apakah fitur newsletter signup diaktifkan',
  false,
  false
),
(
  'feature_live_chat_enabled',
  'true'::jsonb,
  'boolean',
  'features',
  'Apakah fitur live chat diaktifkan',
  false,
  false
),
(
  'feature_analytics_enabled',
  'true'::jsonb,
  'boolean',
  'features',
  'Apakah tracking analytics diaktifkan',
  false,
  true
),

-- API Configuration
(
  'api_rate_limit_per_minute',
  '100'::jsonb,
  'number',
  'api',
  'Rate limit untuk API calls per menit',
  false,
  true
),
(
  'api_cache_duration_seconds',
  '300'::jsonb,
  'number',
  'api',
  'Durasi cache API dalam detik',
  false,
  false
),

-- Email Configuration
(
  'email_from_name',
  '"Hadi Origin Team"'::jsonb,
  'string',
  'email',
  'Nama pengirim untuk email otomatis',
  false,
  true
),
(
  'email_from_address',
  '"noreply@hadiorigin.com"'::jsonb,
  'string',
  'email',
  'Email address pengirim untuk email otomatis',
  false,
  true
),
(
  'email_reply_to',
  '"contact@hadiorigin.com"'::jsonb,
  'string',
  'email',
  'Email address untuk reply-to',
  false,
  false
),

-- Maintenance & System
(
  'maintenance_mode',
  'false'::jsonb,
  'boolean',
  'system',
  'Apakah website dalam maintenance mode',
  false,
  true
),
(
  'maintenance_message',
  '"Website sedang dalam pemeliharaan. Kami akan kembali segera!"'::jsonb,
  'string',
  'system',
  'Pesan yang ditampilkan saat maintenance mode',
  true,
  false
),
(
  'system_version',
  '"1.0.0"'::jsonb,
  'string',
  'system',
  'Versi sistem saat ini',
  false,
  false
),
(
  'last_backup_date',
  '"2024-01-15T10:30:00Z"'::jsonb,
  'string',
  'system',
  'Tanggal backup terakhir',
  false,
  false
),

-- Performance Settings
(
  'performance_image_optimization',
  'true'::jsonb,
  'boolean',
  'performance',
  'Apakah optimasi gambar diaktifkan',
  false,
  false
),
(
  'performance_lazy_loading',
  'true'::jsonb,
  'boolean',
  'performance',
  'Apakah lazy loading diaktifkan',
  false,
  false
),
(
  'performance_cdn_enabled',
  'true'::jsonb,
  'boolean',
  'performance',
  'Apakah CDN diaktifkan',
  false,
  false
),

-- Security Settings
(
  'security_csrf_protection',
  'true'::jsonb,
  'boolean',
  'security',
  'Apakah CSRF protection diaktifkan',
  false,
  true
),
(
  'security_rate_limiting',
  'true'::jsonb,
  'boolean',
  'security',
  'Apakah rate limiting diaktifkan',
  false,
  true
),
(
  'security_ssl_required',
  'true'::jsonb,
  'boolean',
  'security',
  'Apakah SSL/HTTPS wajib',
  false,
  true
)

) AS v(key, value, type, category, description, is_public, is_required)
WHERE NOT EXISTS (SELECT 1 FROM public.settings WHERE settings.key = v.key);

-- Verifikasi data
SELECT 
  category,
  COUNT(*) as setting_count,
  COUNT(*) FILTER (WHERE is_public = true) as public_settings,
  COUNT(*) FILTER (WHERE is_required = true) as required_settings
FROM public.settings
GROUP BY category
ORDER BY category;

-- Show all settings
SELECT 
  key,
  type,
  category,
  description,
  is_public,
  is_required,
  created_at
FROM public.settings
ORDER BY category, key;

-- Test functions
SELECT get_setting('site_title');
SELECT * FROM get_settings_by_category('contact');
SELECT * FROM get_public_settings() LIMIT 5;

-- ============================================
-- NOTES
-- ============================================
-- 1. Semua nilai dalam format JSON sesuai dengan tipe data
-- 2. is_public = true berarti setting bisa diakses tanpa autentikasi
-- 3. is_required = true berarti setting wajib ada untuk aplikasi berjalan
-- 4. Ganti nilai-nilai placeholder dengan data real:
--    - Email addresses
--    - Phone numbers
--    - Social media URLs
--    - Analytics IDs
--    - Company information
-- 5. Untuk production, pastikan:
--    - API keys dan sensitive data tidak di-set sebagai public
--    - Email configuration sesuai dengan SMTP provider
--    - Analytics IDs valid dan aktif
--    - Social media URLs mengarah ke akun yang benar
-- 6. Gunakan function set_setting() untuk update nilai
-- 7. Backup settings secara berkala dengan backup_settings()
-- 8. Validation rules bisa ditambahkan sesuai kebutuhan