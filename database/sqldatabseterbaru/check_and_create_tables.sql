-- ============================================
-- CHECK AND CREATE MISSING TABLES
-- ============================================
-- First check what tables exist, then create missing ones
-- ============================================

-- Check what tables currently exist
SELECT 
  schemaname,
  tablename
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- ============================================
-- CREATE MISSING TABLES ONE BY ONE
-- ============================================

-- 1. STATISTICS TABLE
DROP TABLE IF EXISTS public.statistics CASCADE;
CREATE TABLE public.statistics (
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

ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;

INSERT INTO public.statistics (label_en, label_id, value, description_en, description_id, icon, color, sort_order) VALUES
('Projects Completed', 'Proyek Selesai', '50+', 'Successfully delivered projects', 'Proyek yang berhasil diselesaikan', 'Briefcase', 'from-blue-500 to-cyan-500', 1),
('Happy Clients', 'Klien Puas', '100%', 'Client satisfaction rate', 'Tingkat kepuasan klien', 'Users', 'from-green-500 to-emerald-500', 2),
('Support Available', 'Dukungan Tersedia', '24/7', 'Round the clock support', 'Dukungan sepanjang waktu', 'Clock', 'from-purple-500 to-pink-500', 3),
('Growth Rate', 'Tingkat Pertumbuhan', '200%', 'Business growth achieved', 'Pertumbuhan bisnis yang dicapai', 'TrendingUp', 'from-orange-500 to-red-500', 4);

-- 2. FEATURES TABLE
DROP TABLE IF EXISTS public.features CASCADE;
CREATE TABLE public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  icon TEXT NOT NULL DEFAULT 'Brain',
  variant TEXT NOT NULL DEFAULT 'blue',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.features DISABLE ROW LEVEL SECURITY;

INSERT INTO public.features (title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order) VALUES
('AI Business Analyzer', 'Analisis Bisnis AI', 'Advanced AI-powered business analysis', 'Analisis bisnis bertenaga AI', '["Real-time analysis", "Competitor insights"]', '["Analisis real-time", "Wawasan kompetitor"]', 'Brain', 'purple', 1),
('Lightning Fast Performance', 'Performa Super Cepat', 'Optimized for speed and performance', 'Dioptimalkan untuk kecepatan', '["Sub-second loading", "Mobile-first design"]', '["Loading di bawah 1 detik", "Desain mobile-first"]', 'Zap', 'blue', 2),
('Seamless Integration', 'Integrasi Mulus', 'Easy integration with existing systems', 'Integrasi mudah dengan sistem yang ada', '["API-first architecture", "Webhook support"]', '["Arsitektur API-first", "Dukungan webhook"]', 'Link2', 'orange', 3);

-- 3. FAQS TABLE
DROP TABLE IF EXISTS public.faqs CASCADE;
CREATE TABLE public.faqs (
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

ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;

INSERT INTO public.faqs (category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order) VALUES
('General', 'Umum', 'What services do you offer?', 'Layanan apa saja yang Anda tawarkan?', 'We offer web development, mobile app development, and UI/UX design services.', 'Kami menawarkan layanan pengembangan web, aplikasi mobile, dan desain UI/UX.', 1),
('General', 'Umum', 'How do you ensure project quality?', 'Bagaimana Anda memastikan kualitas proyek?', 'We follow industry best practices including code reviews and testing.', 'Kami mengikuti praktik terbaik industri termasuk review kode dan pengujian.', 2),
('Timeline', 'Timeline', 'How long does a project take?', 'Berapa lama waktu proyek?', 'Project timelines vary from 2-16 weeks based on complexity.', 'Timeline proyek bervariasi dari 2-16 minggu berdasarkan kompleksitas.', 3);

-- 4. TECHNOLOGY CATEGORIES TABLE
DROP TABLE IF EXISTS public.technology_categories CASCADE;
CREATE TABLE public.technology_categories (
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

ALTER TABLE public.technology_categories DISABLE ROW LEVEL SECURITY;

INSERT INTO public.technology_categories (title_en, title_id, description_en, description_id, icon, color, sort_order) VALUES
('Frontend Development', 'Pengembangan Frontend', 'Modern frontend frameworks and libraries', 'Framework dan library frontend modern', 'Code', 'from-blue-500 to-cyan-500', 1),
('Mobile Development', 'Pengembangan Mobile', 'Cross-platform mobile app development', 'Pengembangan aplikasi mobile cross-platform', 'Smartphone', 'from-green-500 to-emerald-500', 2),
('Backend & Database', 'Backend & Database', 'Server-side technologies and databases', 'Teknologi server-side dan database', 'Database', 'from-purple-500 to-pink-500', 3),
('Cloud & DevOps', 'Cloud & DevOps', 'Cloud platforms and DevOps tools', 'Platform cloud dan tools DevOps', 'Cloud', 'from-orange-500 to-red-500', 4);

-- 5. TECHNOLOGIES TABLE
DROP TABLE IF EXISTS public.technologies CASCADE;
CREATE TABLE public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.technology_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate',
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;

-- Insert technologies with explicit category lookups
INSERT INTO public.technologies (category_id, name, level, color, sort_order)
SELECT 
  tc.id,
  tech.name,
  tech.level,
  tech.color,
  tech.sort_order
FROM public.technology_categories tc
CROSS JOIN (
  VALUES 
    ('Frontend Development', 'React', 'Expert', 'bg-blue-500', 1),
    ('Frontend Development', 'Next.js', 'Expert', 'bg-gray-800', 2),
    ('Frontend Development', 'TypeScript', 'Advanced', 'bg-blue-600', 3),
    ('Mobile Development', 'React Native', 'Expert', 'bg-blue-500', 1),
    ('Mobile Development', 'Expo', 'Advanced', 'bg-gray-800', 2),
    ('Backend & Database', 'Node.js', 'Expert', 'bg-green-600', 1),
    ('Backend & Database', 'PostgreSQL', 'Expert', 'bg-blue-700', 2),
    ('Backend & Database', 'Supabase', 'Expert', 'bg-green-500', 3),
    ('Cloud & DevOps', 'AWS', 'Advanced', 'bg-orange-500', 1),
    ('Cloud & DevOps', 'Vercel', 'Expert', 'bg-gray-800', 2)
) AS tech(category_name, name, level, color, sort_order)
WHERE tc.title_en = tech.category_name;

-- 6. PROCESS STEPS TABLE
DROP TABLE IF EXISTS public.process_steps CASCADE;
CREATE TABLE public.process_steps (
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

ALTER TABLE public.process_steps DISABLE ROW LEVEL SECURITY;

INSERT INTO public.process_steps (title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, sort_order) VALUES
('Discovery & Planning', 'Penemuan & Perencanaan', 'Understanding your business needs', 'Memahami kebutuhan bisnis Anda', '["Requirements gathering", "Market research"]', '["Pengumpulan kebutuhan", "Riset pasar"]', '1-2 weeks', '1-2 minggu', 'MessageSquare', 'from-blue-500 to-cyan-500', 1),
('Design & Prototyping', 'Desain & Prototyping', 'Creating user-centered designs', 'Membuat desain berpusat pada pengguna', '["User experience design", "Wireframing"]', '["Desain pengalaman pengguna", "Wireframing"]', '2-3 weeks', '2-3 minggu', 'Settings', 'from-purple-500 to-pink-500', 2),
('Development', 'Pengembangan', 'Building your application', 'Membangun aplikasi Anda', '["Frontend development", "Backend development"]', '["Pengembangan frontend", "Pengembangan backend"]', '4-8 weeks', '4-8 minggu', 'Code', 'from-green-500 to-emerald-500', 3),
('Testing & Deployment', 'Pengujian & Deployment', 'Testing and deployment to production', 'Pengujian dan deployment ke produksi', '["Automated testing", "Production deployment"]', '["Pengujian otomatis", "Deployment produksi"]', '1-2 weeks', '1-2 minggu', 'Rocket', 'from-orange-500 to-red-500', 4);

-- 7. BLOG CATEGORIES TABLE
DROP TABLE IF EXISTS public.blog_categories CASCADE;
CREATE TABLE public.blog_categories (
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

ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;

INSERT INTO public.blog_categories (name, slug, description, color) VALUES
('Web Development', 'web-development', 'Modern web development articles', 'bg-blue-500'),
('Mobile Development', 'mobile-development', 'Mobile app development tutorials', 'bg-green-500'),
('UI/UX Design', 'ui-ux-design', 'Design principles and case studies', 'bg-purple-500'),
('Technology Trends', 'technology-trends', 'Latest technology trends', 'bg-orange-500');

-- 8. BLOG POSTS TABLE
DROP TABLE IF EXISTS public.blog_posts CASCADE;
CREATE TABLE public.blog_posts (
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

ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

INSERT INTO public.blog_posts (title, slug, excerpt, content, image, category, tags, author, read_time, is_published, is_featured) VALUES
('Building Modern Web Applications with React', 'building-modern-web-applications-react', 'Learn how to create scalable web applications using React and Next.js', '# Building Modern Web Applications\n\nReact and Next.js have revolutionized web development...', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 'Web Development', '["React", "Next.js", "JavaScript"]', 'Hadi Origin', '8 min read', true, true),
('Mobile App Development with React Native', 'mobile-app-development-react-native', 'Discover cross-platform mobile development with React Native', '# Mobile App Development\n\nReact Native enables cross-platform development...', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop', 'Mobile Development', '["React Native", "Mobile", "Cross-platform"]', 'Hadi Origin', '10 min read', true, true);

-- ============================================
-- FINAL VERIFICATION
-- ============================================

-- Check all tables were created
SELECT 
  'statistics' as table_name, COUNT(*) as record_count FROM public.statistics
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

-- Test a simple query to make sure everything works
SELECT 'Tables created successfully!' as status;