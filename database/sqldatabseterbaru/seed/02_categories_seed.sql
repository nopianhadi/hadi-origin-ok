-- ============================================
-- CATEGORIES SEED DATA
-- Data awal untuk tabel categories
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.categories CASCADE;

-- Insert categories
INSERT INTO public.categories (name, description, color, icon, sort_order, is_active) 
SELECT * FROM (VALUES
  (
    'Web Development', 
    'Aplikasi web full-stack, website responsif, dan progressive web apps dengan teknologi modern',
    '#3B82F6',
    'Globe',
    1,
    true
  ),
  (
    'Mobile App', 
    'Aplikasi mobile native dan cross-platform untuk iOS dan Android dengan performa tinggi',
    '#10B981',
    'Smartphone',
    2,
    true
  ),
  (
    'AI/ML', 
    'Artificial Intelligence, Machine Learning, dan proyek Data Science dengan algoritma canggih',
    '#8B5CF6',
    'Brain',
    3,
    true
  ),
  (
    'Finance', 
    'Teknologi finansial, sistem pembayaran, dan solusi fintech untuk berbagai kebutuhan',
    '#F59E0B',
    'DollarSign',
    4,
    true
  ),
  (
    'Healthcare', 
    'Teknologi kesehatan, sistem medis, dan platform telemedicine untuk layanan kesehatan',
    '#EF4444',
    'Heart',
    5,
    true
  ),
  (
    'E-Commerce', 
    'Platform belanja online, sistem retail, dan solusi marketplace untuk bisnis digital',
    '#EC4899',
    'ShoppingCart',
    6,
    true
  ),
  (
    'Education', 
    'Teknologi pendidikan, platform e-learning, dan sistem LMS untuk institusi pendidikan',
    '#06B6D4',
    'BookOpen',
    7,
    true
  ),
  (
    'Productivity', 
    'Tools produktivitas, manajemen proyek, dan otomasi workflow untuk efisiensi kerja',
    '#14B8A6',
    'Zap',
    8,
    true
  ),
  (
    'Analytics', 
    'Analitik data, business intelligence, dan dashboard pelaporan untuk insight bisnis',
    '#6366F1',
    'BarChart3',
    9,
    true
  ),
  (
    'Social', 
    'Platform media sosial, sistem komunitas, dan aplikasi networking untuk interaksi sosial',
    '#F97316',
    'Users',
    10,
    true
  ),
  (
    'IoT', 
    'Internet of Things, smart devices, dan sistem monitoring untuk solusi connected',
    '#84CC16',
    'Wifi',
    11,
    true
  ),
  (
    'Security', 
    'Keamanan siber, sistem autentikasi, dan solusi security untuk perlindungan data',
    '#DC2626',
    'Shield',
    12,
    true
  )
) AS v(name, description, color, icon, sort_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE categories.name = v.name);

-- Update project_count (akan diupdate otomatis oleh trigger setelah projects diinsert)
-- Untuk saat ini set ke 0
UPDATE public.categories SET project_count = 0;

-- Verifikasi data
SELECT 
  id,
  name,
  slug,
  description,
  color,
  icon,
  sort_order,
  project_count,
  is_active,
  created_at
FROM public.categories
ORDER BY sort_order;

-- ============================================
-- NOTES
-- ============================================
-- 1. Slug akan di-generate otomatis oleh trigger
-- 2. project_count akan diupdate otomatis saat projects diinsert
-- 3. Icon menggunakan nama dari Lucide React icons
-- 4. Color menggunakan format hex color
-- 5. Tambahkan kategori baru sesuai kebutuhan bisnis
-- 6. sort_order menentukan urutan tampilan di frontend