-- =============================================
-- SEED DATA FOR SUPABASE INTEGRATION
-- =============================================

-- =============================================
-- 1. FEATURES SEED DATA
-- =============================================
INSERT INTO features (title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order) VALUES
(
  'AI Business Analyzer',
  'AI Business Analyzer',
  'Advanced AI-powered business analysis tool that provides insights and recommendations for your digital transformation journey.',
  'Tool analisis bisnis bertenaga AI canggih yang memberikan wawasan dan rekomendasi untuk perjalanan transformasi digital Anda.',
  ARRAY['Real-time business analysis', 'AI-powered recommendations', 'Market trend insights', 'Competitive analysis'],
  ARRAY['Analisis bisnis real-time', 'Rekomendasi bertenaga AI', 'Wawasan tren pasar', 'Analisis kompetitif'],
  'Brain',
  'purple',
  1
),
(
  'Website Development',
  'Pengembangan Website',
  'Modern, responsive websites built with cutting-edge technologies for optimal performance and user experience.',
  'Website modern dan responsif yang dibangun dengan teknologi terdepan untuk performa dan pengalaman pengguna yang optimal.',
  ARRAY['Responsive design', 'SEO optimized', 'Fast loading speed', 'Modern UI/UX'],
  ARRAY['Desain responsif', 'Dioptimalkan SEO', 'Kecepatan loading cepat', 'UI/UX modern'],
  'Zap',
  'blue',
  2
),
(
  'Mobile App Development',
  'Pengembangan Aplikasi Mobile',
  'Cross-platform mobile applications that deliver native performance and seamless user experience.',
  'Aplikasi mobile lintas platform yang memberikan performa native dan pengalaman pengguna yang mulus.',
  ARRAY['Cross-platform compatibility', 'Native performance', 'Offline functionality', 'Push notifications'],
  ARRAY['Kompatibilitas lintas platform', 'Performa native', 'Fungsi offline', 'Notifikasi push'],
  'Link2',
  'orange',
  3
),
(
  'E-commerce Solutions',
  'Solusi E-commerce',
  'Complete e-commerce platforms with payment integration, inventory management, and analytics.',
  'Platform e-commerce lengkap dengan integrasi pembayaran, manajemen inventori, dan analitik.',
  ARRAY['Payment gateway integration', 'Inventory management', 'Order tracking', 'Sales analytics'],
  ARRAY['Integrasi payment gateway', 'Manajemen inventori', 'Pelacakan pesanan', 'Analitik penjualan'],
  'FileText',
  'green',
  4
),
(
  'UI/UX Design',
  'Desain UI/UX',
  'User-centered design approach that creates intuitive and engaging digital experiences.',
  'Pendekatan desain yang berpusat pada pengguna yang menciptakan pengalaman digital yang intuitif dan menarik.',
  ARRAY['User research', 'Wireframing & prototyping', 'Visual design', 'Usability testing'],
  ARRAY['Riset pengguna', 'Wireframing & prototyping', 'Desain visual', 'Pengujian usabilitas'],
  'Users',
  'blue',
  5
),
(
  'Maintenance & Support',
  'Pemeliharaan & Dukungan',
  '24/7 technical support and maintenance services to ensure your digital assets run smoothly.',
  'Layanan dukungan teknis dan pemeliharaan 24/7 untuk memastikan aset digital Anda berjalan lancar.',
  ARRAY['24/7 monitoring', 'Regular updates', 'Security patches', 'Performance optimization'],
  ARRAY['Monitoring 24/7', 'Update berkala', 'Patch keamanan', 'Optimasi performa'],
  'Shield',
  'orange',
  6
);

-- =============================================
-- 2. STATISTICS SEED DATA
-- =============================================
INSERT INTO statistics (label_en, label_id, value, description_en, description_id, icon, color, sort_order) VALUES
(
  'Projects Completed',
  'Proyek Selesai',
  '100+',
  'From startups to enterprises, we have helped businesses of all scales',
  'Dari startup hingga enterprise, kami telah membantu berbagai skala bisnis',
  'Briefcase',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Happy Clients',
  'Klien Puas',
  '50+',
  'E-commerce, healthcare, education, fintech, and many other industries',
  'E-commerce, healthcare, education, fintech, dan banyak industri lainnya',
  'Bot',
  'from-green-500 to-emerald-500',
  2
),
(
  'Years Experience',
  'Tahun Pengalaman',
  '5+',
  'Based on surveys and direct feedback from clients who have worked with us',
  'Berdasarkan survey dan feedback langsung dari klien yang telah bekerja sama',
  'Clock',
  'from-purple-500 to-pink-500',
  3
),
(
  'Technologies Mastered',
  'Teknologi Dikuasai',
  '20+',
  'Websites and apps we develop are proven to improve business performance',
  'Website dan app yang kami kembangkan terbukti meningkatkan performa bisnis',
  'TrendingUp',
  'from-orange-500 to-red-500',
  4
);

-- =============================================
-- 3. FAQ SEED DATA
-- =============================================
INSERT INTO faqs (category_en, category_id, question_en, question_id, answer_en, answer_id, sort_order) VALUES
-- General Category
(
  'General',
  'Umum',
  'What services do you offer?',
  'Layanan apa saja yang Anda tawarkan?',
  'We offer comprehensive digital solutions including website development, mobile app development, UI/UX design, e-commerce solutions, and AI business analysis tools.',
  'Kami menawarkan solusi digital komprehensif termasuk pengembangan website, pengembangan aplikasi mobile, desain UI/UX, solusi e-commerce, dan tools analisis bisnis AI.',
  1
),
(
  'General',
  'Umum',
  'Do you work with international clients?',
  'Apakah Anda bekerja dengan klien internasional?',
  'Yes, we work with clients globally. We have experience working across different time zones and can communicate effectively in English and Indonesian.',
  'Ya, kami bekerja dengan klien secara global. Kami memiliki pengalaman bekerja lintas zona waktu dan dapat berkomunikasi secara efektif dalam bahasa Inggris dan Indonesia.',
  2
),
(
  'General',
  'Umum',
  'What makes your AI Business Analyzer unique?',
  'Apa yang membuat AI Business Analyzer Anda unik?',
  'Our AI Business Analyzer uses advanced machine learning algorithms to provide personalized business insights, market analysis, and actionable recommendations tailored to your specific industry and business model.',
  'AI Business Analyzer kami menggunakan algoritma machine learning canggih untuk memberikan wawasan bisnis yang dipersonalisasi, analisis pasar, dan rekomendasi yang dapat ditindaklanjuti sesuai dengan industri dan model bisnis spesifik Anda.',
  3
),

-- Timeline Category
(
  'Timeline',
  'Timeline',
  'How long does a typical project take?',
  'Berapa lama waktu yang dibutuhkan untuk proyek biasa?',
  'Project timelines vary depending on complexity. Simple websites take 1-2 weeks, while complex web applications or mobile apps can take 4-12 weeks. We provide detailed timelines during consultation.',
  'Timeline proyek bervariasi tergantung kompleksitas. Website sederhana membutuhkan 1-2 minggu, sedangkan aplikasi web kompleks atau aplikasi mobile dapat membutuhkan 4-12 minggu. Kami memberikan timeline detail saat konsultasi.',
  1
),
(
  'Timeline',
  'Timeline',
  'Can you work with tight deadlines?',
  'Bisakah Anda bekerja dengan deadline ketat?',
  'Yes, we can accommodate urgent projects. We have a dedicated team for rush projects and can work extended hours when necessary. Additional charges may apply for expedited delivery.',
  'Ya, kami dapat mengakomodasi proyek mendesak. Kami memiliki tim khusus untuk proyek rush dan dapat bekerja dengan jam extended bila diperlukan. Biaya tambahan mungkin berlaku untuk pengiriman dipercepat.',
  2
),
(
  'Timeline',
  'Timeline',
  'What is your revision policy?',
  'Bagaimana kebijakan revisi Anda?',
  'We include up to 3 rounds of revisions in our standard packages. Additional revisions can be accommodated with additional charges. We work closely with clients to minimize the need for extensive revisions.',
  'Kami menyertakan hingga 3 putaran revisi dalam paket standar kami. Revisi tambahan dapat diakomodasi dengan biaya tambahan. Kami bekerja sama dengan klien untuk meminimalkan kebutuhan revisi ekstensif.',
  3
),

-- Pricing Category
(
  'Pricing',
  'Harga',
  'How do you structure your pricing?',
  'Bagaimana struktur harga Anda?',
  'We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after initial consultation.',
  'Kami menawarkan model harga yang fleksibel termasuk proyek harga tetap, tarif per jam, dan retainer bulanan. Harga tergantung pada ruang lingkup proyek, kompleksitas, dan timeline. Kami memberikan penawaran detail setelah konsultasi awal.',
  1
),
(
  'Pricing',
  'Harga',
  'Do you offer payment plans?',
  'Apakah Anda menawarkan rencana pembayaran?',
  'Yes, we offer flexible payment plans. Typically, we require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments.',
  'Ya, kami menawarkan rencana pembayaran yang fleksibel. Biasanya, kami memerlukan 50% di muka dan 50% setelah selesai. Untuk proyek yang lebih besar, kami dapat mengatur pembayaran berdasarkan milestone.',
  2
),
(
  'Pricing',
  'Harga',
  'Are there any hidden costs?',
  'Apakah ada biaya tersembunyi?',
  'No, we believe in transparent pricing. All costs are outlined in our detailed proposals. Any additional work outside the original scope will be discussed and approved before implementation.',
  'Tidak, kami percaya pada harga yang transparan. Semua biaya diuraikan dalam proposal detail kami. Setiap pekerjaan tambahan di luar ruang lingkup asli akan didiskusikan dan disetujui sebelum implementasi.',
  3
);

-- =============================================
-- 4. TECHNOLOGY CATEGORIES SEED DATA
-- =============================================
INSERT INTO technology_categories (title_en, title_id, description_en, description_id, icon, color, sort_order) VALUES
(
  'Frontend Development',
  'Pengembangan Frontend',
  'Modern technologies for responsive and interactive user interfaces',
  'Teknologi modern untuk antarmuka yang responsif dan interaktif',
  'Code',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Mobile Development',
  'Pengembangan Mobile',
  'Native and cross-platform mobile applications with high performance',
  'Aplikasi mobile native dan cross-platform yang performa tinggi',
  'Smartphone',
  'from-purple-500 to-pink-500',
  2
),
(
  'Backend & Database',
  'Backend & Database',
  'Scalable server-side development and database management',
  'Server-side development dan manajemen database yang scalable',
  'Database',
  'from-green-500 to-emerald-500',
  3
),
(
  'Cloud & DevOps',
  'Cloud & DevOps',
  'Cloud deployment and infrastructure for optimal performance',
  'Deployment dan infrastruktur cloud untuk performa optimal',
  'Cloud',
  'from-orange-500 to-red-500',
  4
);

-- =============================================
-- 5. TECHNOLOGIES SEED DATA
-- =============================================
-- Get category IDs first (in real implementation, you'd use the actual UUIDs)
-- Frontend Technologies
INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'React.js', 'Expert', 'bg-blue-500', 1 FROM technology_categories WHERE title_en = 'Frontend Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Next.js', 'Expert', 'bg-black', 2 FROM technology_categories WHERE title_en = 'Frontend Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'TypeScript', 'Expert', 'bg-blue-600', 3 FROM technology_categories WHERE title_en = 'Frontend Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Tailwind CSS', 'Expert', 'bg-cyan-500', 4 FROM technology_categories WHERE title_en = 'Frontend Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Vue.js', 'Advanced', 'bg-green-500', 5 FROM technology_categories WHERE title_en = 'Frontend Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Angular', 'Intermediate', 'bg-red-500', 6 FROM technology_categories WHERE title_en = 'Frontend Development';

-- Mobile Technologies
INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'React Native', 'Expert', 'bg-blue-500', 1 FROM technology_categories WHERE title_en = 'Mobile Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Flutter', 'Advanced', 'bg-blue-400', 2 FROM technology_categories WHERE title_en = 'Mobile Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'iOS (Swift)', 'Advanced', 'bg-gray-800', 3 FROM technology_categories WHERE title_en = 'Mobile Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Android (Kotlin)', 'Advanced', 'bg-green-600', 4 FROM technology_categories WHERE title_en = 'Mobile Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Expo', 'Expert', 'bg-purple-600', 5 FROM technology_categories WHERE title_en = 'Mobile Development';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Ionic', 'Intermediate', 'bg-blue-600', 6 FROM technology_categories WHERE title_en = 'Mobile Development';

-- Backend Technologies
INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Node.js', 'Expert', 'bg-green-600', 1 FROM technology_categories WHERE title_en = 'Backend & Database';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Python', 'Advanced', 'bg-yellow-500', 2 FROM technology_categories WHERE title_en = 'Backend & Database';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'PostgreSQL', 'Expert', 'bg-blue-700', 3 FROM technology_categories WHERE title_en = 'Backend & Database';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'MongoDB', 'Advanced', 'bg-green-500', 4 FROM technology_categories WHERE title_en = 'Backend & Database';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Supabase', 'Expert', 'bg-green-600', 5 FROM technology_categories WHERE title_en = 'Backend & Database';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Firebase', 'Advanced', 'bg-orange-500', 6 FROM technology_categories WHERE title_en = 'Backend & Database';

-- Cloud Technologies
INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Vercel', 'Expert', 'bg-black', 1 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Netlify', 'Advanced', 'bg-teal-500', 2 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'AWS', 'Advanced', 'bg-orange-500', 3 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Google Cloud', 'Intermediate', 'bg-blue-500', 4 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Docker', 'Advanced', 'bg-blue-600', 5 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

INSERT INTO technologies (category_id, name, level, color, sort_order) 
SELECT id, 'Kubernetes', 'Intermediate', 'bg-blue-700', 6 FROM technology_categories WHERE title_en = 'Cloud & DevOps';

-- =============================================
-- 6. PROCESS STEPS SEED DATA
-- =============================================
INSERT INTO process_steps (title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, sort_order) VALUES
(
  'Consultation & Analysis',
  'Konsultasi & Analisis',
  'In-depth discussion about business needs, target audience, and your digital goals',
  'Diskusi mendalam tentang kebutuhan bisnis, target audience, dan tujuan digital Anda',
  ARRAY['Business needs analysis', 'Competitor research', 'Digital marketing strategy', 'Timeline and budget planning'],
  ARRAY['Analisis kebutuhan bisnis', 'Riset kompetitor', 'Strategi digital marketing', 'Timeline dan budget planning'],
  '1-2 days',
  '1-2 hari',
  'MessageSquare',
  'from-blue-500 to-cyan-500',
  1
),
(
  'Planning & Design',
  'Perencanaan & Desain',
  'Creating wireframes, mockups, and prototypes that align with your brand identity',
  'Membuat wireframe, mockup, dan prototype yang sesuai dengan brand identity Anda',
  ARRAY['UI/UX Design', 'Wireframe & Mockup', 'Brand identity integration', 'User experience optimization'],
  ARRAY['UI/UX Design', 'Wireframe & Mockup', 'Brand identity integration', 'User experience optimization'],
  '3-5 days',
  '3-5 hari',
  'Settings',
  'from-purple-500 to-pink-500',
  2
),
(
  'Development & Testing',
  'Development & Testing',
  'Website/app development with modern technologies and comprehensive testing',
  'Pengembangan website/app dengan teknologi modern dan testing menyeluruh',
  ARRAY['Frontend & Backend development', 'Database design & integration', 'API development', 'Quality assurance testing'],
  ARRAY['Frontend & Backend development', 'Database design & integration', 'API development', 'Quality assurance testing'],
  '1-4 weeks',
  '1-4 minggu',
  'Code',
  'from-green-500 to-emerald-500',
  3
),
(
  'Launch & Maintenance',
  'Launch & Maintenance',
  'Production deployment, training, and ongoing support for optimal performance',
  'Deploy ke production, training, dan support berkelanjutan untuk performa optimal',
  ARRAY['Production deployment', 'Performance optimization', 'Training & documentation', 'Ongoing support & maintenance'],
  ARRAY['Production deployment', 'Performance optimization', 'Training & documentation', 'Ongoing support & maintenance'],
  'Ongoing',
  'Berkelanjutan',
  'Rocket',
  'from-orange-500 to-red-500',
  4
);

-- =============================================
-- 7. COMPANY MILESTONES SEED DATA
-- =============================================
INSERT INTO company_milestones (year, title_en, title_id, description_en, description_id, achievements_en, achievements_id, icon, color, sort_order) VALUES
(
  '2019',
  'The Beginning',
  'Awal Perjalanan',
  'Hadi Origin was founded with the vision of becoming a trusted digital partner for Indonesian businesses',
  'Hadi Origin didirikan dengan visi menjadi partner digital terpercaya untuk bisnis Indonesia',
  ARRAY['Founded small team with 3 developers', 'Completed first 5 website projects', 'Focused on company profiles and landing pages'],
  ARRAY['Mendirikan tim kecil dengan 3 developer', 'Menyelesaikan 5 proyek website pertama', 'Fokus pada company profile dan landing page'],
  'Rocket',
  'from-blue-500 to-cyan-500',
  1
),
(
  '2020',
  'Service Expansion',
  'Ekspansi Layanan',
  'Expanded services to include mobile app development and e-commerce solutions',
  'Mengembangkan layanan mobile app development dan e-commerce solutions',
  ARRAY['Launched mobile app development services', 'Completed 15+ e-commerce projects', 'Team grew to 8 people'],
  ARRAY['Meluncurkan layanan mobile app development', 'Menyelesaikan 15+ proyek e-commerce', 'Tim berkembang menjadi 8 orang'],
  'TrendingUp',
  'from-purple-500 to-pink-500',
  2
),
(
  '2021',
  'Technology Innovation',
  'Inovasi Teknologi',
  'Adopted modern technologies and cutting-edge frameworks for optimal results',
  'Mengadopsi teknologi modern dan framework terdepan untuk hasil yang lebih optimal',
  ARRAY['Implemented React.js and Next.js', 'Developed AI Business Analyzer system', 'Partnership with 20+ enterprise clients'],
  ARRAY['Implementasi React.js dan Next.js', 'Pengembangan sistem AI Business Analyzer', 'Partnership dengan 20+ klien enterprise'],
  'Target',
  'from-green-500 to-emerald-500',
  3
),
(
  '2022',
  'Significant Achievement',
  'Pencapaian Signifikan',
  'Reached important milestone with 50+ successful projects and team expansion',
  'Mencapai milestone penting dengan 50+ proyek sukses dan ekspansi tim',
  ARRAY['Completed 50+ website & mobile app projects', 'Professional team with 15+ developers', 'Client satisfaction rate reached 95%'],
  ARRAY['Menyelesaikan 50+ proyek website & mobile app', 'Tim profesional dengan 15+ developer', 'Tingkat kepuasan klien mencapai 95%'],
  'Award',
  'from-orange-500 to-red-500',
  4
),
(
  '2023',
  'Digital Transformation',
  'Transformasi Digital',
  'Helped more businesses in digital transformation with innovative solutions',
  'Membantu lebih banyak bisnis dalam transformasi digital dengan solusi yang inovatif',
  ARRAY['Served 100+ clients from various industries', 'Launched AI Business Analyzer platform', 'Expanded to regional markets'],
  ARRAY['Melayani 100+ klien dari berbagai industri', 'Peluncuran platform AI Business Analyzer', 'Ekspansi ke pasar regional'],
  'Users',
  'from-indigo-500 to-purple-500',
  5
),
(
  '2024',
  'Digital Future',
  'Masa Depan Digital',
  'Continuing to innovate with AI and cloud computing technologies for more advanced solutions',
  'Terus berinovasi dengan teknologi AI dan cloud computing untuk solusi yang lebih canggih',
  ARRAY['AI integration in all services', 'Cloud-native development approach', 'Vision to become leader in Indonesia'],
  ARRAY['Integrasi AI dalam semua layanan', 'Cloud-native development approach', 'Visi menjadi leader di Indonesia'],
  'Calendar',
  'from-cyan-500 to-blue-500',
  6
);

-- =============================================
-- 8. BLOG CATEGORIES SEED DATA
-- =============================================
INSERT INTO blog_categories (name, color, post_count) VALUES
('Web Development', 'bg-blue-500', 12),
('Mobile Development', 'bg-purple-500', 8),
('UX Design', 'bg-pink-500', 6),
('SEO & Marketing', 'bg-green-500', 10),
('Security', 'bg-red-500', 4),
('Business Tips', 'bg-orange-500', 7);

-- =============================================
-- 9. BLOG POSTS SEED DATA
-- =============================================
INSERT INTO blog_posts (title, slug, excerpt, content, image, category, tags, read_time, author, publish_date, is_published, is_featured) VALUES
(
  'Website Development Trends 2024: What You Need to Know',
  'website-development-trends-2024',
  'Learn about the latest trends in website development such as AI integration, progressive web apps, and technologies that will dominate 2024.',
  'Full content about website development trends...',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
  'Web Development',
  ARRAY['Web Development', 'Trends', 'AI', 'PWA'],
  '5 min',
  'Tim Hadi Origin',
  '2024-12-15',
  true,
  true
),
(
  'Mobile App vs Website: Which is Better for Your Business?',
  'mobile-app-vs-website-business',
  'In-depth analysis of when to choose mobile app or website for your business, complete with pros and cons of each.',
  'Full content about mobile app vs website...',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop',
  'Mobile Development',
  ARRAY['Mobile App', 'Website', 'Business Strategy'],
  '7 min',
  'Tim Hadi Origin',
  '2024-12-12',
  true,
  false
),
(
  'How to Increase E-commerce Conversion with Proper UX Design',
  'increase-ecommerce-conversion-ux-design',
  'Practical tips to increase your online store conversion rate through user experience optimization and user-friendly interface design.',
  'Full content about e-commerce UX design...',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
  'UX Design',
  ARRAY['E-commerce', 'UX Design', 'Conversion', 'UI'],
  '6 min',
  'Tim Hadi Origin',
  '2024-12-10',
  true,
  false
);

-- =============================================
-- 10. CONTACT METHODS SEED DATA
-- =============================================
INSERT INTO contact_methods (title_en, title_id, description_en, description_id, icon, color, url, button_text_en, button_text_id, sort_order) VALUES
(
  'WhatsApp Chat',
  'Chat WhatsApp',
  'Fastest way for consultation and project discussion',
  'Cara tercepat untuk konsultasi dan diskusi proyek',
  'MessageSquare',
  'from-green-500 to-emerald-500',
  'https://wa.me/62895406181407',
  'Chat Now',
  'Chat Sekarang',
  1
),
(
  'Direct Call',
  'Telepon Langsung',
  'Direct discussion with our team for in-depth consultation',
  'Diskusi langsung dengan tim untuk konsultasi mendalam',
  'Phone',
  'from-blue-500 to-cyan-500',
  'tel:+6281234567890',
  'Call Now',
  'Telepon Sekarang',
  2
),
(
  'Official Email',
  'Email Resmi',
  'Send project details and documents via email',
  'Kirim detail proyek dan dokumen melalui email',
  'Mail',
  'from-purple-500 to-pink-500',
  'mailto:hadi.dev@domain.com',
  'Send Email',
  'Kirim Email',
  3
),
(
  'Schedule Meeting',
  'Jadwalkan Meeting',
  'Book online or offline meeting according to your schedule',
  'Book meeting online atau offline sesuai jadwal Anda',
  'Calendar',
  'from-orange-500 to-red-500',
  '#meeting-scheduler',
  'Book Meeting',
  'Book Meeting',
  4
);

-- =============================================
-- SEED DATA COMPLETE
-- =============================================