-- ============================================
-- SETUP MISSING TABLES - QUICK FIX
-- ============================================
-- This script creates only the missing tables and populates them with data
-- Run this if you already have the basic tables (users, categories, projects, etc.)
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- CREATE MISSING TABLES
-- ============================================

-- 1. STATISTICS TABLE
CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label_en TEXT NOT NULL,
  label_id TEXT NOT NULL,
  value TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Briefcase',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. FEATURES TABLE
CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  icon TEXT NOT NULL DEFAULT 'Brain',
  variant TEXT NOT NULL DEFAULT 'blue' CHECK (variant IN ('purple', 'blue', 'orange', 'green')),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en TEXT NOT NULL DEFAULT 'General',
  category_id TEXT NOT NULL DEFAULT 'Umum',
  question_en TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TECHNOLOGY CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.technology_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.technology_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PROCESS STEPS TABLE
CREATE TABLE IF NOT EXISTS public.process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  duration_en TEXT NOT NULL DEFAULT '1-2 weeks',
  duration_id TEXT NOT NULL DEFAULT '1-2 minggu',
  icon TEXT NOT NULL DEFAULT 'MessageSquare',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BLOG CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::JSONB,
  author TEXT NOT NULL DEFAULT 'Hadi Origin',
  read_time TEXT NOT NULL DEFAULT '5 min read',
  publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_statistics_sort_order ON public.statistics (sort_order);
CREATE INDEX IF NOT EXISTS idx_statistics_is_active ON public.statistics (is_active);

CREATE INDEX IF NOT EXISTS idx_features_sort_order ON public.features (sort_order);
CREATE INDEX IF NOT EXISTS idx_features_is_active ON public.features (is_active);

CREATE INDEX IF NOT EXISTS idx_faqs_category_en ON public.faqs (category_en);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs (sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs (is_active);

CREATE INDEX IF NOT EXISTS idx_technology_categories_sort_order ON public.technology_categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_is_active ON public.technology_categories (is_active);

CREATE INDEX IF NOT EXISTS idx_technologies_category_id ON public.technologies (category_id);
CREATE INDEX IF NOT EXISTS idx_technologies_sort_order ON public.technologies (sort_order);
CREATE INDEX IF NOT EXISTS idx_technologies_is_active ON public.technologies (is_active);

CREATE INDEX IF NOT EXISTS idx_process_steps_sort_order ON public.process_steps (sort_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_is_active ON public.process_steps (is_active);

CREATE INDEX IF NOT EXISTS idx_blog_categories_name ON public.blog_categories (name);
CREATE INDEX IF NOT EXISTS idx_blog_categories_post_count ON public.blog_categories (post_count DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts (is_published);

-- ============================================
-- DISABLE RLS FOR DEVELOPMENT
-- ============================================

ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.features DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INSERT SEED DATA
-- ============================================

-- Statistics data
INSERT INTO public.statistics (
  label_en, label_id, value, description_en, description_id, icon, color, sort_order
) VALUES
('Projects Completed', 'Proyek Selesai', '50+', 'Successfully delivered projects', 'Proyek yang berhasil diselesaikan', 'Briefcase', 'from-blue-500 to-cyan-500', 1),
('Happy Clients', 'Klien Puas', '100%', 'Client satisfaction rate', 'Tingkat kepuasan klien', 'Users', 'from-green-500 to-emerald-500', 2),
('Support Available', 'Dukungan Tersedia', '24/7', 'Round the clock support', 'Dukungan sepanjang waktu', 'Clock', 'from-purple-500 to-pink-500', 3),
('Growth Rate', 'Tingkat Pertumbuhan', '200%', 'Business growth achieved', 'Pertumbuhan bisnis yang dicapai', 'TrendingUp', 'from-orange-500 to-red-500', 4)
ON CONFLICT DO NOTHING;

-- Features data
INSERT INTO public.features (
  title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order
) VALUES
('AI Business Analyzer', 'Analisis Bisnis AI', 'Advanced AI-powered business analysis and recommendations', 'Analisis bisnis bertenaga AI dan rekomendasi lanjutan', '["Real-time market analysis", "Competitor insights", "Growth predictions", "Risk assessment"]', '["Analisis pasar real-time", "Wawasan kompetitor", "Prediksi pertumbuhan", "Penilaian risiko"]', 'Brain', 'purple', 1),
('Lightning Fast Performance', 'Performa Super Cepat', 'Optimized for speed and performance across all devices', 'Dioptimalkan untuk kecepatan dan performa di semua perangkat', '["Sub-second loading times", "Mobile-first design", "CDN optimization", "Caching strategies"]', '["Waktu loading di bawah 1 detik", "Desain mobile-first", "Optimasi CDN", "Strategi caching"]', 'Zap', 'blue', 2),
('Seamless Integration', 'Integrasi Mulus', 'Easy integration with existing systems and third-party services', 'Integrasi mudah dengan sistem yang ada dan layanan pihak ketiga', '["API-first architecture", "Webhook support", "Database migration", "Legacy system support"]', '["Arsitektur API-first", "Dukungan webhook", "Migrasi database", "Dukungan sistem lama"]', 'Link2', 'orange', 3),
('Enterprise Security', 'Keamanan Enterprise', 'Bank-level security with advanced encryption', 'Keamanan tingkat bank dengan enkripsi lanjutan', '["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "GDPR compliance"]', '["Enkripsi end-to-end", "Autentikasi multi-faktor", "Audit keamanan berkala", "Kepatuhan GDPR"]', 'Shield', 'green', 4)
ON CONFLICT DO NOTHING;

-- FAQs data
INSERT INTO public.faqs (
  category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order
) VALUES
('General', 'Umum', 'What services do you offer?', 'Layanan apa saja yang Anda tawarkan?', 'We offer comprehensive web development, mobile app development, UI/UX design, and digital consulting services.', 'Kami menawarkan layanan pengembangan web komprehensif, pengembangan aplikasi mobile, desain UI/UX, dan konsultasi digital.', 1),
('General', 'Umum', 'How do you ensure project quality?', 'Bagaimana Anda memastikan kualitas proyek?', 'We follow industry best practices including code reviews, automated testing, and continuous integration.', 'Kami mengikuti praktik terbaik industri termasuk review kode, pengujian otomatis, dan integrasi berkelanjutan.', 2),
('Timeline', 'Timeline', 'How long does a typical project take?', 'Berapa lama waktu yang dibutuhkan untuk proyek biasa?', 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, complex applications take 8-16 weeks.', 'Timeline proyek bervariasi berdasarkan kompleksitas. Website sederhana membutuhkan 2-4 minggu, aplikasi kompleks membutuhkan 8-16 minggu.', 3),
('Pricing', 'Harga', 'How do you structure your pricing?', 'Bagaimana struktur harga Anda?', 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements.', 'Kami menawarkan model harga fleksibel termasuk proyek harga tetap, tarif per jam, dan perjanjian retainer.', 4)
ON CONFLICT DO NOTHING;

-- Technology categories data
INSERT INTO public.technology_categories (
  title_en, title_id, description_en, description_id, icon, color, sort_order
) VALUES
('Frontend Development', 'Pengembangan Frontend', 'Modern frontend frameworks and libraries', 'Framework dan library frontend modern', 'Code', 'from-blue-500 to-cyan-500', 1),
('Mobile Development', 'Pengembangan Mobile', 'Cross-platform mobile app development', 'Pengembangan aplikasi mobile cross-platform', 'Smartphone', 'from-green-500 to-emerald-500', 2),
('Backend & Database', 'Backend & Database', 'Server-side technologies and databases', 'Teknologi server-side dan database', 'Database', 'from-purple-500 to-pink-500', 3),
('Cloud & DevOps', 'Cloud & DevOps', 'Cloud platforms and DevOps tools', 'Platform cloud dan tools DevOps', 'Cloud', 'from-orange-500 to-red-500', 4)
ON CONFLICT DO NOTHING;

-- Technologies data
INSERT INTO public.technologies (
  category_id, name, level, color, sort_order
) VALUES
((SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'), 'React', 'Expert', 'bg-blue-500', 1),
((SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'), 'Next.js', 'Expert', 'bg-gray-800', 2),
((SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'), 'TypeScript', 'Advanced', 'bg-blue-600', 3),
((SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'), 'Tailwind CSS', 'Expert', 'bg-cyan-500', 4),
((SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'), 'React Native', 'Expert', 'bg-blue-500', 1),
((SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'), 'Expo', 'Advanced', 'bg-gray-800', 2),
((SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'), 'Node.js', 'Expert', 'bg-green-600', 1),
((SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'), 'PostgreSQL', 'Expert', 'bg-blue-700', 2),
((SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'), 'Supabase', 'Expert', 'bg-green-500', 3),
((SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'), 'AWS', 'Advanced', 'bg-orange-500', 1),
((SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'), 'Vercel', 'Expert', 'bg-gray-800', 2)
ON CONFLICT DO NOTHING;

-- Process steps data
INSERT INTO public.process_steps (
  title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, sort_order
) VALUES
('Discovery & Planning', 'Penemuan & Perencanaan', 'Understanding your business needs', 'Memahami kebutuhan bisnis Anda', '["Requirements gathering", "Market research", "Technical feasibility"]', '["Pengumpulan kebutuhan", "Riset pasar", "Kelayakan teknis"]', '1-2 weeks', '1-2 minggu', 'MessageSquare', 'from-blue-500 to-cyan-500', 1),
('Design & Prototyping', 'Desain & Prototyping', 'Creating user-centered designs', 'Membuat desain berpusat pada pengguna', '["User experience design", "User interface design", "Wireframing"]', '["Desain pengalaman pengguna", "Desain antarmuka pengguna", "Wireframing"]', '2-3 weeks', '2-3 minggu', 'Settings', 'from-purple-500 to-pink-500', 2),
('Development', 'Pengembangan', 'Building your application', 'Membangun aplikasi Anda', '["Frontend development", "Backend development", "Database design"]', '["Pengembangan frontend", "Pengembangan backend", "Desain database"]', '4-8 weeks', '4-8 minggu', 'Code', 'from-green-500 to-emerald-500', 3),
('Testing & Deployment', 'Pengujian & Deployment', 'Testing and deployment to production', 'Pengujian dan deployment ke produksi', '["Automated testing", "Manual testing", "Production deployment"]', '["Pengujian otomatis", "Pengujian manual", "Deployment produksi"]', '1-2 weeks', '1-2 minggu', 'Rocket', 'from-orange-500 to-red-500', 4)
ON CONFLICT DO NOTHING;

-- Blog categories data
INSERT INTO public.blog_categories (
  name, description, color
) VALUES
('Web Development', 'Articles about modern web development', 'bg-blue-500'),
('Mobile Development', 'Mobile app development tutorials', 'bg-green-500'),
('UI/UX Design', 'Design principles and case studies', 'bg-purple-500'),
('Technology Trends', 'Latest technology trends and insights', 'bg-orange-500')
ON CONFLICT DO NOTHING;

-- Blog posts data
INSERT INTO public.blog_posts (
  title, excerpt, content, image, category, tags, author, read_time, is_published, is_featured, meta_title, meta_description
) VALUES
('Building Modern Web Applications with React', 'Learn how to create scalable web applications using React and Next.js', '# Building Modern Web Applications\n\nReact and Next.js have revolutionized web development...', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 'Web Development', '["React", "Next.js", "JavaScript"]', 'Hadi Origin', '8 min read', true, true, 'Building Modern Web Applications with React', 'Learn React and Next.js best practices'),
('Mobile App Development with React Native', 'Discover cross-platform mobile development with React Native', '# Mobile App Development\n\nReact Native enables cross-platform development...', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop', 'Mobile Development', '["React Native", "Mobile", "Cross-platform"]', 'Hadi Origin', '10 min read', true, true, 'Mobile App Development with React Native', 'Cross-platform mobile development guide')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  'statistics' as table_name, COUNT(*) as records FROM public.statistics
UNION ALL
SELECT 'features', COUNT(*) FROM public.features
UNION ALL
SELECT 'faqs', COUNT(*) FROM public.faqs
UNION ALL
SELECT 'technology_categories', COUNT(*) FROM public.technology_categories
UNION ALL
SELECT 'technologies', COUNT(*) FROM public.technologies
UNION ALL
SELECT 'process_steps', COUNT(*) FROM public.process_steps
UNION ALL
SELECT 'blog_categories', COUNT(*) FROM public.blog_categories
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM public.blog_posts
ORDER BY table_name;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Missing tables created and populated!
-- Your 404 errors should now be resolved.
-- ============================================