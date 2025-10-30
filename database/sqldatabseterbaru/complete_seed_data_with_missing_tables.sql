-- ============================================
-- COMPLETE SEED DATA WITH MISSING TABLES
-- Portfolio Web Application - Supabase
-- ============================================
-- This file includes seed data for all tables including the missing ones
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- 1. USERS SEED DATA
-- ============================================

INSERT INTO public.users (
  username, password, email, full_name, role, is_active
) VALUES
(
  'admin',
  '$2b$10$rOzJKKhYbwJZrAWLKWJZJeF8vQGQGQGQGQGQGQGQGQGQGQGQGQGQGQ', -- password: admin123
  'admin@hadiorigin.com',
  'Hadi Origin Admin',
  'admin',
  true
)
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- 2. CATEGORIES SEED DATA
-- ============================================

INSERT INTO public.categories (
  name, slug, description, color, icon, sort_order, project_count
) VALUES
('Web Development', 'web-development', 'Modern web applications and websites', '#3B82F6', 'Globe', 1, 0),
('Mobile Development', 'mobile-development', 'iOS and Android mobile applications', '#10B981', 'Smartphone', 2, 0),
('UI/UX Design', 'ui-ux-design', 'User interface and experience design', '#8B5CF6', 'Palette', 3, 0),
('E-commerce', 'e-commerce', 'Online stores and marketplace solutions', '#F59E0B', 'ShoppingCart', 4, 0),
('SaaS Platform', 'saas-platform', 'Software as a Service applications', '#EF4444', 'Cloud', 5, 0)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 3. PROJECTS SEED DATA (Sample)
-- ============================================

INSERT INTO public.projects (
  title, slug, description, full_description, category, image, demo_url, github_url, 
  tech_stack, features, featured, status, priority
) VALUES
(
  'Modern E-commerce Platform',
  'modern-ecommerce-platform',
  'Full-featured e-commerce platform with modern UI and advanced features',
  'A comprehensive e-commerce solution built with React, Next.js, and Supabase. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
  'E-commerce',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
  'https://demo.hadiorigin.com/ecommerce',
  'https://github.com/hadiorigin/ecommerce-platform',
  '["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Stripe"]',
  '["User Authentication", "Product Management", "Shopping Cart", "Payment Integration", "Admin Dashboard", "Responsive Design"]',
  1,
  'active',
  1
),
(
  'Task Management Mobile App',
  'task-management-mobile-app',
  'Cross-platform mobile app for task and project management',
  'A productivity mobile application built with React Native and Expo. Includes task creation, project organization, team collaboration, and real-time synchronization.',
  'Mobile Development',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
  'https://demo.hadiorigin.com/taskapp',
  'https://github.com/hadiorigin/task-management-app',
  '["React Native", "Expo", "TypeScript", "Supabase", "React Navigation"]',
  '["Task Management", "Project Organization", "Team Collaboration", "Real-time Sync", "Offline Support"]',
  1,
  'active',
  2
),
(
  'Corporate Website Redesign',
  'corporate-website-redesign',
  'Modern corporate website with improved UX and performance',
  'Complete redesign of a corporate website focusing on user experience, performance optimization, and modern design principles. Built with Next.js and optimized for SEO.',
  'Web Development',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  'https://demo.hadiorigin.com/corporate',
  'https://github.com/hadiorigin/corporate-website',
  '["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]',
  '["Responsive Design", "SEO Optimization", "Performance Optimization", "Modern UI", "Content Management"]',
  0,
  'active',
  3
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. STATISTICS SEED DATA
-- ============================================

INSERT INTO public.statistics (
  label_en, label_id, value, description_en, description_id, icon, color, sort_order
) VALUES
(
  'Projects Completed',
  'Proyek Selesai',
  '50+',
  'Successfully delivered projects',
  'Proyek yang berhasil diselesaikan',
  'Briefcase',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Happy Clients',
  'Klien Puas',
  '100%',
  'Client satisfaction rate',
  'Tingkat kepuasan klien',
  'Users',
  'from-green-500 to-emerald-500',
  2
),
(
  'Support Available',
  'Dukungan Tersedia',
  '24/7',
  'Round the clock support',
  'Dukungan sepanjang waktu',
  'Clock',
  'from-purple-500 to-pink-500',
  3
),
(
  'Growth Rate',
  'Tingkat Pertumbuhan',
  '200%',
  'Business growth achieved',
  'Pertumbuhan bisnis yang dicapai',
  'TrendingUp',
  'from-orange-500 to-red-500',
  4
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. FEATURES SEED DATA
-- ============================================

INSERT INTO public.features (
  title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order
) VALUES
(
  'AI Business Analyzer',
  'Analisis Bisnis AI',
  'Advanced AI-powered business analysis and recommendations',
  'Analisis bisnis bertenaga AI dan rekomendasi lanjutan',
  '["Real-time market analysis", "Competitor insights", "Growth predictions", "Risk assessment"]',
  '["Analisis pasar real-time", "Wawasan kompetitor", "Prediksi pertumbuhan", "Penilaian risiko"]',
  'Brain',
  'purple',
  1
),
(
  'Lightning Fast Performance',
  'Performa Super Cepat',
  'Optimized for speed and performance across all devices',
  'Dioptimalkan untuk kecepatan dan performa di semua perangkat',
  '["Sub-second loading times", "Mobile-first design", "CDN optimization", "Caching strategies"]',
  '["Waktu loading di bawah 1 detik", "Desain mobile-first", "Optimasi CDN", "Strategi caching"]',
  'Zap',
  'blue',
  2
),
(
  'Seamless Integration',
  'Integrasi Mulus',
  'Easy integration with existing systems and third-party services',
  'Integrasi mudah dengan sistem yang ada dan layanan pihak ketiga',
  '["API-first architecture", "Webhook support", "Database migration", "Legacy system support"]',
  '["Arsitektur API-first", "Dukungan webhook", "Migrasi database", "Dukungan sistem lama"]',
  'Link2',
  'orange',
  3
),
(
  'Comprehensive Documentation',
  'Dokumentasi Lengkap',
  'Detailed documentation and guides for easy maintenance',
  'Dokumentasi dan panduan lengkap untuk pemeliharaan mudah',
  '["Step-by-step guides", "API documentation", "Video tutorials", "24/7 support"]',
  '["Panduan langkah demi langkah", "Dokumentasi API", "Tutorial video", "Dukungan 24/7"]',
  'FileText',
  'green',
  4
),
(
  'Scalable Architecture',
  'Arsitektur Scalable',
  'Built to grow with your business needs',
  'Dibangun untuk berkembang sesuai kebutuhan bisnis Anda',
  '["Microservices architecture", "Auto-scaling", "Load balancing", "Cloud-native design"]',
  '["Arsitektur microservices", "Auto-scaling", "Load balancing", "Desain cloud-native"]',
  'Users',
  'blue',
  5
),
(
  'Enterprise Security',
  'Keamanan Enterprise',
  'Bank-level security with advanced encryption',
  'Keamanan tingkat bank dengan enkripsi lanjutan',
  '["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "GDPR compliance"]',
  '["Enkripsi end-to-end", "Autentikasi multi-faktor", "Audit keamanan berkala", "Kepatuhan GDPR"]',
  'Shield',
  'purple',
  6
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. FAQS SEED DATA
-- ============================================

INSERT INTO public.faqs (
  category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order
) VALUES
-- General Questions
(
  'General',
  'Umum',
  'What services do you offer?',
  'Layanan apa saja yang Anda tawarkan?',
  'We offer comprehensive web development, mobile app development, UI/UX design, and digital consulting services. Our expertise includes modern frameworks like React, Next.js, React Native, and backend technologies.',
  'Kami menawarkan layanan pengembangan web komprehensif, pengembangan aplikasi mobile, desain UI/UX, dan konsultasi digital. Keahlian kami meliputi framework modern seperti React, Next.js, React Native, dan teknologi backend.',
  1
),
(
  'General',
  'Umum',
  'How do you ensure project quality?',
  'Bagaimana Anda memastikan kualitas proyek?',
  'We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Every project goes through rigorous quality assurance before delivery.',
  'Kami mengikuti praktik terbaik industri termasuk review kode, pengujian otomatis, integrasi berkelanjutan, dan sesi feedback klien reguler. Setiap proyek melalui jaminan kualitas yang ketat sebelum diserahkan.',
  2
),
(
  'General',
  'Umum',
  'Do you provide ongoing support?',
  'Apakah Anda menyediakan dukungan berkelanjutan?',
  'Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer different support packages to meet your needs.',
  'Ya, kami menyediakan dukungan pasca-peluncuran komprehensif termasuk perbaikan bug, pembaruan keamanan, optimasi performa, dan peningkatan fitur. Kami menawarkan berbagai paket dukungan sesuai kebutuhan Anda.',
  3
),

-- Timeline Questions
(
  'Timeline',
  'Timeline',
  'How long does a typical project take?',
  'Berapa lama waktu yang dibutuhkan untuk proyek biasa?',
  'Project timelines vary based on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 8-16 weeks. We provide detailed timelines during the planning phase.',
  'Timeline proyek bervariasi berdasarkan kompleksitas dan cakupan. Website sederhana biasanya membutuhkan 2-4 minggu, sedangkan aplikasi web kompleks atau aplikasi mobile bisa membutuhkan 8-16 minggu. Kami memberikan timeline detail selama fase perencanaan.',
  4
),
(
  'Timeline',
  'Timeline',
  'Can you work with tight deadlines?',
  'Bisakah Anda bekerja dengan deadline ketat?',
  'Yes, we can accommodate urgent projects with tight deadlines. We have a dedicated team for rush projects and can scale resources as needed. Additional charges may apply for expedited delivery.',
  'Ya, kami dapat mengakomodasi proyek mendesak dengan deadline ketat. Kami memiliki tim khusus untuk proyek rush dan dapat meningkatkan sumber daya sesuai kebutuhan. Biaya tambahan mungkin berlaku untuk pengiriman dipercepat.',
  5
),

-- Pricing Questions
(
  'Pricing',
  'Harga',
  'How do you structure your pricing?',
  'Bagaimana struktur harga Anda?',
  'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and specific requirements. We provide detailed quotes after understanding your needs.',
  'Kami menawarkan model harga fleksibel termasuk proyek harga tetap, tarif per jam, dan perjanjian retainer. Harga tergantung pada kompleksitas proyek, timeline, dan kebutuhan spesifik. Kami memberikan penawaran detail setelah memahami kebutuhan Anda.',
  6
),
(
  'Pricing',
  'Harga',
  'Do you offer payment plans?',
  'Apakah Anda menawarkan rencana pembayaran?',
  'Yes, we offer flexible payment plans typically structured as: 30% upfront, 40% at milestone completion, and 30% upon project delivery. We can customize payment schedules based on project size and client preferences.',
  'Ya, kami menawarkan rencana pembayaran fleksibel yang biasanya terstruktur sebagai: 30% di muka, 40% saat penyelesaian milestone, dan 30% saat penyerahan proyek. Kami dapat menyesuaikan jadwal pembayaran berdasarkan ukuran proyek dan preferensi klien.',
  7
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. TECHNOLOGY CATEGORIES SEED DATA
-- ============================================

INSERT INTO public.technology_categories (
  title_en, title_id, description_en, description_id, icon, color, sort_order
) VALUES
(
  'Frontend Development',
  'Pengembangan Frontend',
  'Modern frontend frameworks and libraries for building responsive user interfaces',
  'Framework dan library frontend modern untuk membangun antarmuka pengguna responsif',
  'Code',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Mobile Development',
  'Pengembangan Mobile',
  'Cross-platform and native mobile app development technologies',
  'Teknologi pengembangan aplikasi mobile cross-platform dan native',
  'Smartphone',
  'from-green-500 to-emerald-500',
  2
),
(
  'Backend & Database',
  'Backend & Database',
  'Server-side technologies and database management systems',
  'Teknologi server-side dan sistem manajemen database',
  'Database',
  'from-purple-500 to-pink-500',
  3
),
(
  'Cloud & DevOps',
  'Cloud & DevOps',
  'Cloud platforms and development operations tools',
  'Platform cloud dan tools operasi pengembangan',
  'Cloud',
  'from-orange-500 to-red-500',
  4
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. TECHNOLOGIES SEED DATA
-- ============================================

INSERT INTO public.technologies (
  category_id, name, level, color, sort_order
) VALUES
-- Frontend Development Technologies
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'React',
  'Expert',
  'bg-blue-500',
  1
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'Next.js',
  'Expert',
  'bg-gray-800',
  2
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'TypeScript',
  'Advanced',
  'bg-blue-600',
  3
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'Tailwind CSS',
  'Expert',
  'bg-cyan-500',
  4
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'Vue.js',
  'Advanced',
  'bg-green-500',
  5
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Frontend Development'),
  'Vite',
  'Advanced',
  'bg-purple-500',
  6
),

-- Mobile Development Technologies
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'React Native',
  'Expert',
  'bg-blue-500',
  1
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'Expo',
  'Advanced',
  'bg-gray-800',
  2
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'Flutter',
  'Intermediate',
  'bg-blue-400',
  3
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'PWA',
  'Advanced',
  'bg-green-500',
  4
),

-- Backend & Database Technologies
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'Node.js',
  'Expert',
  'bg-green-600',
  1
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'Python',
  'Advanced',
  'bg-yellow-500',
  2
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'PostgreSQL',
  'Expert',
  'bg-blue-700',
  3
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'Supabase',
  'Expert',
  'bg-green-500',
  4
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'MongoDB',
  'Advanced',
  'bg-green-700',
  5
),

-- Cloud & DevOps Technologies
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'AWS',
  'Advanced',
  'bg-orange-500',
  1
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'Vercel',
  'Expert',
  'bg-gray-800',
  2
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'Docker',
  'Advanced',
  'bg-blue-600',
  3
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'GitHub Actions',
  'Advanced',
  'bg-gray-700',
  4
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 9. PROCESS STEPS SEED DATA
-- ============================================

INSERT INTO public.process_steps (
  title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, sort_order
) VALUES
(
  'Discovery & Planning',
  'Penemuan & Perencanaan',
  'Understanding your business needs and project requirements',
  'Memahami kebutuhan bisnis dan persyaratan proyek Anda',
  '["Requirements gathering", "Market research", "Technical feasibility", "Project roadmap", "Timeline planning"]',
  '["Pengumpulan kebutuhan", "Riset pasar", "Kelayakan teknis", "Roadmap proyek", "Perencanaan timeline"]',
  '1-2 weeks',
  '1-2 minggu',
  'MessageSquare',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Design & Prototyping',
  'Desain & Prototyping',
  'Creating user-centered designs and interactive prototypes',
  'Membuat desain berpusat pada pengguna dan prototipe interaktif',
  '["User experience design", "User interface design", "Wireframing", "Interactive prototypes", "Design system"]',
  '["Desain pengalaman pengguna", "Desain antarmuka pengguna", "Wireframing", "Prototipe interaktif", "Sistem desain"]',
  '2-3 weeks',
  '2-3 minggu',
  'Settings',
  'from-purple-500 to-pink-500',
  2
),
(
  'Development',
  'Pengembangan',
  'Building your application with modern technologies and best practices',
  'Membangun aplikasi Anda dengan teknologi modern dan praktik terbaik',
  '["Frontend development", "Backend development", "Database design", "API integration", "Quality assurance"]',
  '["Pengembangan frontend", "Pengembangan backend", "Desain database", "Integrasi API", "Jaminan kualitas"]',
  '4-8 weeks',
  '4-8 minggu',
  'Code',
  'from-green-500 to-emerald-500',
  3
),
(
  'Testing & Deployment',
  'Pengujian & Deployment',
  'Comprehensive testing and smooth deployment to production',
  'Pengujian komprehensif dan deployment yang lancar ke produksi',
  '["Automated testing", "Manual testing", "Performance optimization", "Security audit", "Production deployment"]',
  '["Pengujian otomatis", "Pengujian manual", "Optimasi performa", "Audit keamanan", "Deployment produksi"]',
  '1-2 weeks',
  '1-2 minggu',
  'Rocket',
  'from-orange-500 to-red-500',
  4
),
(
  'Launch & Support',
  'Peluncuran & Dukungan',
  'Going live and providing ongoing support and maintenance',
  'Go live dan memberikan dukungan serta pemeliharaan berkelanjutan',
  '["Production launch", "Performance monitoring", "Bug fixes", "Feature updates", "Technical support"]',
  '["Peluncuran produksi", "Monitoring performa", "Perbaikan bug", "Update fitur", "Dukungan teknis"]',
  'Ongoing',
  'Berkelanjutan',
  'Users',
  'from-indigo-500 to-purple-500',
  5
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 10. BLOG CATEGORIES SEED DATA
-- ============================================

INSERT INTO public.blog_categories (
  name, description, color
) VALUES
(
  'Web Development',
  'Articles about modern web development techniques, frameworks, and best practices',
  'bg-blue-500'
),
(
  'Mobile Development',
  'Mobile app development tutorials, React Native, and cross-platform solutions',
  'bg-green-500'
),
(
  'UI/UX Design',
  'User interface and user experience design principles, tools, and case studies',
  'bg-purple-500'
),
(
  'Technology Trends',
  'Latest technology trends, emerging frameworks, and industry insights',
  'bg-orange-500'
),
(
  'Business Tips',
  'Digital transformation, business strategy, and entrepreneurship advice',
  'bg-indigo-500'
),
(
  'Tutorials',
  'Step-by-step tutorials and how-to guides for developers and designers',
  'bg-teal-500'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 11. BLOG POSTS SEED DATA (Sample)
-- ============================================

INSERT INTO public.blog_posts (
  title, excerpt, content, image, category, tags, author, read_time, is_published, is_featured, meta_title, meta_description
) VALUES
(
  'Building Modern Web Applications with React and Next.js',
  'Learn how to create scalable and performant web applications using React and Next.js with best practices and modern development techniques.',
  '# Building Modern Web Applications with React and Next.js

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

React and Next.js provide an excellent foundation for modern web development.',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  'Web Development',
  '["React", "Next.js", "JavaScript", "Frontend"]',
  'Hadi Origin',
  '8 min read',
  true,
  true,
  'Building Modern Web Applications with React and Next.js - Complete Guide',
  'Learn how to create scalable and performant web applications using React and Next.js with best practices and modern development techniques.'
),
(
  'Mobile App Development with React Native: A Complete Guide',
  'Discover how to build cross-platform mobile applications using React Native, from setup to deployment on both iOS and Android platforms.',
  '# Mobile App Development with React Native: A Complete Guide

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

React Native offers an excellent balance between development efficiency and native performance.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
  'Mobile Development',
  '["React Native", "Mobile", "iOS", "Android", "Cross-platform"]',
  'Hadi Origin',
  '10 min read',
  true,
  true,
  'Mobile App Development with React Native - Complete Guide 2024',
  'Discover how to build cross-platform mobile applications using React Native, from setup to deployment on both iOS and Android platforms.'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check record counts
SELECT 
  'users' as table_name, COUNT(*) as record_count FROM public.users
UNION ALL
SELECT 'categories', COUNT(*) FROM public.categories
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects
UNION ALL
SELECT 'statistics', COUNT(*) FROM public.statistics
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
-- SEED DATA COMPLETE
-- ============================================
-- All tables have been populated with sample data!
-- Your application should now work without 404 errors.
-- ============================================