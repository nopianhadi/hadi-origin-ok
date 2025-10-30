-- ============================================
-- MANUAL TABLE CREATION FOR SUPABASE
-- ============================================
-- Copy and paste this entire script into Supabase SQL Editor
-- Run it all at once to create all missing tables
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

-- Insert statistics data
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

-- Insert features data
INSERT INTO public.features (title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order) VALUES
('AI Business Analyzer', 'Analisis Bisnis AI', 'Advanced AI-powered business analysis and recommendations', 'Analisis bisnis bertenaga AI dan rekomendasi lanjutan', '["Real-time market analysis", "Competitor insights", "Growth predictions", "Risk assessment"]', '["Analisis pasar real-time", "Wawasan kompetitor", "Prediksi pertumbuhan", "Penilaian risiko"]', 'Brain', 'purple', 1),
('Lightning Fast Performance', 'Performa Super Cepat', 'Optimized for speed and performance across all devices', 'Dioptimalkan untuk kecepatan dan performa di semua perangkat', '["Sub-second loading times", "Mobile-first design", "CDN optimization", "Caching strategies"]', '["Waktu loading di bawah 1 detik", "Desain mobile-first", "Optimasi CDN", "Strategi caching"]', 'Zap', 'blue', 2),
('Seamless Integration', 'Integrasi Mulus', 'Easy integration with existing systems and third-party services', 'Integrasi mudah dengan sistem yang ada dan layanan pihak ketiga', '["API-first architecture", "Webhook support", "Database migration", "Legacy system support"]', '["Arsitektur API-first", "Dukungan webhook", "Migrasi database", "Dukungan sistem lama"]', 'Link2', 'orange', 3),
('Comprehensive Documentation', 'Dokumentasi Lengkap', 'Detailed documentation and guides for easy maintenance', 'Dokumentasi dan panduan lengkap untuk pemeliharaan mudah', '["Step-by-step guides", "API documentation", "Video tutorials", "24/7 support"]', '["Panduan langkah demi langkah", "Dokumentasi API", "Tutorial video", "Dukungan 24/7"]', 'FileText', 'green', 4),
('Scalable Architecture', 'Arsitektur Scalable', 'Built to grow with your business needs', 'Dibangun untuk berkembang sesuai kebutuhan bisnis Anda', '["Microservices architecture", "Auto-scaling", "Load balancing", "Cloud-native design"]', '["Arsitektur microservices", "Auto-scaling", "Load balancing", "Desain cloud-native"]', 'Users', 'blue', 5),
('Enterprise Security', 'Keamanan Enterprise', 'Bank-level security with advanced encryption', 'Keamanan tingkat bank dengan enkripsi lanjutan', '["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "GDPR compliance"]', '["Enkripsi end-to-end", "Autentikasi multi-faktor", "Audit keamanan berkala", "Kepatuhan GDPR"]', 'Shield', 'purple', 6);

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

-- Insert FAQs data
INSERT INTO public.faqs (category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order) VALUES
('General', 'Umum', 'What services do you offer?', 'Layanan apa saja yang Anda tawarkan?', 'We offer comprehensive web development, mobile app development, UI/UX design, and digital consulting services. Our expertise includes modern frameworks like React, Next.js, React Native, and backend technologies.', 'Kami menawarkan layanan pengembangan web komprehensif, pengembangan aplikasi mobile, desain UI/UX, dan konsultasi digital. Keahlian kami meliputi framework modern seperti React, Next.js, React Native, dan teknologi backend.', 1),
('General', 'Umum', 'How do you ensure project quality?', 'Bagaimana Anda memastikan kualitas proyek?', 'We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Every project goes through rigorous quality assurance before delivery.', 'Kami mengikuti praktik terbaik industri termasuk review kode, pengujian otomatis, integrasi berkelanjutan, dan sesi feedback klien reguler. Setiap proyek melalui jaminan kualitas yang ketat sebelum diserahkan.', 2),
('General', 'Umum', 'Do you provide ongoing support?', 'Apakah Anda menyediakan dukungan berkelanjutan?', 'Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer different support packages to meet your needs.', 'Ya, kami menyediakan dukungan pasca-peluncuran komprehensif termasuk perbaikan bug, pembaruan keamanan, optimasi performa, dan peningkatan fitur. Kami menawarkan berbagai paket dukungan sesuai kebutuhan Anda.', 3),
('Timeline', 'Timeline', 'How long does a typical project take?', 'Berapa lama waktu yang dibutuhkan untuk proyek biasa?', 'Project timelines vary based on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 8-16 weeks. We provide detailed timelines during the planning phase.', 'Timeline proyek bervariasi berdasarkan kompleksitas dan cakupan. Website sederhana biasanya membutuhkan 2-4 minggu, sedangkan aplikasi web kompleks atau aplikasi mobile bisa membutuhkan 8-16 minggu. Kami memberikan timeline detail selama fase perencanaan.', 4),
('Timeline', 'Timeline', 'Can you work with tight deadlines?', 'Bisakah Anda bekerja dengan deadline ketat?', 'Yes, we can accommodate urgent projects with tight deadlines. We have a dedicated team for rush projects and can scale resources as needed. Additional charges may apply for expedited delivery.', 'Ya, kami dapat mengakomodasi proyek mendesak dengan deadline ketat. Kami memiliki tim khusus untuk proyek rush dan dapat meningkatkan sumber daya sesuai kebutuhan. Biaya tambahan mungkin berlaku untuk pengiriman dipercepat.', 5),
('Pricing', 'Harga', 'How do you structure your pricing?', 'Bagaimana struktur harga Anda?', 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and specific requirements. We provide detailed quotes after understanding your needs.', 'Kami menawarkan model harga fleksibel termasuk proyek harga tetap, tarif per jam, dan perjanjian retainer. Harga tergantung pada kompleksitas proyek, timeline, dan kebutuhan spesifik. Kami memberikan penawaran detail setelah memahami kebutuhan Anda.', 6),
('Pricing', 'Harga', 'Do you offer payment plans?', 'Apakah Anda menawarkan rencana pembayaran?', 'Yes, we offer flexible payment plans typically structured as: 30% upfront, 40% at milestone completion, and 30% upon project delivery. We can customize payment schedules based on project size and client preferences.', 'Ya, kami menawarkan rencana pembayaran fleksibel yang biasanya terstruktur sebagai: 30% di muka, 40% saat penyelesaian milestone, dan 30% saat penyerahan proyek. Kami dapat menyesuaikan jadwal pembayaran berdasarkan ukuran proyek dan preferensi klien.', 7);

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

-- Insert technology categories data
INSERT INTO public.technology_categories (title_en, title_id, description_en, description_id, icon, color, sort_order) VALUES
('Frontend Development', 'Pengembangan Frontend', 'Modern frontend frameworks and libraries for building responsive user interfaces', 'Framework dan library frontend modern untuk membangun antarmuka pengguna responsif', 'Code', 'from-blue-500 to-cyan-500', 1),
('Mobile Development', 'Pengembangan Mobile', 'Cross-platform and native mobile app development technologies', 'Teknologi pengembangan aplikasi mobile cross-platform dan native', 'Smartphone', 'from-green-500 to-emerald-500', 2),
('Backend & Database', 'Backend & Database', 'Server-side technologies and database management systems', 'Teknologi server-side dan sistem manajemen database', 'Database', 'from-purple-500 to-pink-500', 3),
('Cloud & DevOps', 'Cloud & DevOps', 'Cloud platforms and development operations tools', 'Platform cloud dan tools operasi pengembangan', 'Cloud', 'from-orange-500 to-red-500', 4);

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

-- Insert technologies data
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
    ('Frontend Development', 'Tailwind CSS', 'Expert', 'bg-cyan-500', 4),
    ('Frontend Development', 'Vue.js', 'Advanced', 'bg-green-500', 5),
    ('Frontend Development', 'Vite', 'Advanced', 'bg-purple-500', 6),
    ('Mobile Development', 'React Native', 'Expert', 'bg-blue-500', 1),
    ('Mobile Development', 'Expo', 'Advanced', 'bg-gray-800', 2),
    ('Mobile Development', 'Flutter', 'Intermediate', 'bg-blue-400', 3),
    ('Mobile Development', 'PWA', 'Advanced', 'bg-green-500', 4),
    ('Backend & Database', 'Node.js', 'Expert', 'bg-green-600', 1),
    ('Backend & Database', 'Python', 'Advanced', 'bg-yellow-500', 2),
    ('Backend & Database', 'PostgreSQL', 'Expert', 'bg-blue-700', 3),
    ('Backend & Database', 'Supabase', 'Expert', 'bg-green-500', 4),
    ('Backend & Database', 'MongoDB', 'Advanced', 'bg-green-700', 5),
    ('Cloud & DevOps', 'AWS', 'Advanced', 'bg-orange-500', 1),
    ('Cloud & DevOps', 'Vercel', 'Expert', 'bg-gray-800', 2),
    ('Cloud & DevOps', 'Docker', 'Advanced', 'bg-blue-600', 3),
    ('Cloud & DevOps', 'GitHub Actions', 'Advanced', 'bg-gray-700', 4)
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

-- Insert process steps data
INSERT INTO public.process_steps (title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, sort_order) VALUES
('Discovery & Planning', 'Penemuan & Perencanaan', 'Understanding your business needs and project requirements', 'Memahami kebutuhan bisnis dan persyaratan proyek Anda', '["Requirements gathering", "Market research", "Technical feasibility", "Project roadmap", "Timeline planning"]', '["Pengumpulan kebutuhan", "Riset pasar", "Kelayakan teknis", "Roadmap proyek", "Perencanaan timeline"]', '1-2 weeks', '1-2 minggu', 'MessageSquare', 'from-blue-500 to-cyan-500', 1),
('Design & Prototyping', 'Desain & Prototyping', 'Creating user-centered designs and interactive prototypes', 'Membuat desain berpusat pada pengguna dan prototipe interaktif', '["User experience design", "User interface design", "Wireframing", "Interactive prototypes", "Design system"]', '["Desain pengalaman pengguna", "Desain antarmuka pengguna", "Wireframing", "Prototipe interaktif", "Sistem desain"]', '2-3 weeks', '2-3 minggu', 'Settings', 'from-purple-500 to-pink-500', 2),
('Development', 'Pengembangan', 'Building your application with modern technologies and best practices', 'Membangun aplikasi Anda dengan teknologi modern dan praktik terbaik', '["Frontend development", "Backend development", "Database design", "API integration", "Quality assurance"]', '["Pengembangan frontend", "Pengembangan backend", "Desain database", "Integrasi API", "Jaminan kualitas"]', '4-8 weeks', '4-8 minggu', 'Code', 'from-green-500 to-emerald-500', 3),
('Testing & Deployment', 'Pengujian & Deployment', 'Comprehensive testing and smooth deployment to production', 'Pengujian komprehensif dan deployment yang lancar ke produksi', '["Automated testing", "Manual testing", "Performance optimization", "Security audit", "Production deployment"]', '["Pengujian otomatis", "Pengujian manual", "Optimasi performa", "Audit keamanan", "Deployment produksi"]', '1-2 weeks', '1-2 minggu', 'Rocket', 'from-orange-500 to-red-500', 4),
('Launch & Support', 'Peluncuran & Dukungan', 'Going live and providing ongoing support and maintenance', 'Go live dan memberikan dukungan serta pemeliharaan berkelanjutan', '["Production launch", "Performance monitoring", "Bug fixes", "Feature updates", "Technical support"]', '["Peluncuran produksi", "Monitoring performa", "Perbaikan bug", "Update fitur", "Dukungan teknis"]', 'Ongoing', 'Berkelanjutan', 'Users', 'from-indigo-500 to-purple-500', 5);

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

-- Insert blog categories data
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
('Web Development', 'web-development', 'Articles about modern web development techniques, frameworks, and best practices', 'bg-blue-500'),
('Mobile Development', 'mobile-development', 'Mobile app development tutorials, React Native, and cross-platform solutions', 'bg-green-500'),
('UI/UX Design', 'ui-ux-design', 'User interface and user experience design principles, tools, and case studies', 'bg-purple-500'),
('Technology Trends', 'technology-trends', 'Latest technology trends, emerging frameworks, and industry insights', 'bg-orange-500'),
('Business Tips', 'business-tips', 'Digital transformation, business strategy, and entrepreneurship advice', 'bg-indigo-500'),
('Tutorials', 'tutorials', 'Step-by-step tutorials and how-to guides for developers and designers', 'bg-teal-500');

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

-- Insert blog posts data
INSERT INTO public.blog_posts (title, slug, excerpt, content, image, category, tags, author, read_time, is_published, is_featured, meta_title, meta_description) VALUES
('Building Modern Web Applications with React and Next.js', 'building-modern-web-applications-react-nextjs', 'Learn how to create scalable and performant web applications using React and Next.js with best practices and modern development techniques.', '# Building Modern Web Applications with React and Next.js

React and Next.js have revolutionized the way we build web applications. In this comprehensive guide, we''ll explore the key concepts and best practices for creating modern, scalable web applications.

## Why React and Next.js?

React provides a component-based architecture that makes building complex UIs manageable and maintainable. Next.js adds powerful features like server-side rendering, static site generation, and automatic code splitting.

## Getting Started

To create a new Next.js project:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## Best Practices

1. **Component Organization**: Keep components small and focused
2. **State Management**: Use React hooks and context API effectively
3. **Performance**: Implement lazy loading and code splitting
4. **SEO**: Leverage Next.js SEO features

## Conclusion

React and Next.js provide an excellent foundation for modern web development.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 'Web Development', '["React", "Next.js", "JavaScript", "Frontend"]', 'Hadi Origin', '8 min read', true, true, 'Building Modern Web Applications with React and Next.js - Complete Guide', 'Learn how to create scalable and performant web applications using React and Next.js with best practices and modern development techniques.'),
('Mobile App Development with React Native: A Complete Guide', 'mobile-app-development-react-native-guide', 'Discover how to build cross-platform mobile applications using React Native, from setup to deployment on both iOS and Android platforms.', '# Mobile App Development with React Native: A Complete Guide

React Native has become the go-to solution for cross-platform mobile development. This guide will walk you through everything you need to know.

## What is React Native?

React Native allows you to build mobile applications using React and JavaScript, enabling code reuse across iOS and Android platforms.

## Key Benefits

- Cross-platform development
- Native performance
- Hot reloading
- Large community

## Getting Started

```bash
npx react-native init MyApp
cd MyApp
npx react-native run-android
```

## Conclusion

React Native offers an excellent balance between development efficiency and native performance.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop', 'Mobile Development', '["React Native", "Mobile", "iOS", "Android", "Cross-platform"]', 'Hadi Origin', '10 min read', true, true, 'Mobile App Development with React Native - Complete Guide 2024', 'Discover how to build cross-platform mobile applications using React Native, from setup to deployment on both iOS and Android platforms.');

-- DISABLE RLS FOR ALL TABLES
ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.features DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

-- VERIFICATION QUERY
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

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- All tables created and populated successfully
-- Your application should now work without 404 errors
-- ============================================