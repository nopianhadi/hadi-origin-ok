-- ============================================
-- COMPLETE SEED DATA
-- Portfolio Web Application - Supabase
-- ============================================
-- File ini berisi semua seed data untuk testing dan development
-- Jalankan setelah complete_database_setup.sql
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- 1. USERS SEED DATA
-- ============================================

INSERT INTO public.users (username, password, email, full_name, role, is_active) 
SELECT * FROM (VALUES
  (
    'admin', 
    '$2a$10$rH8Qj5Z.example.hash.change.in.production',
    'admin@hadiorigin.com',
    'Administrator',
    'admin',
    true
  ),
  (
    'editor', 
    '$2a$10$editor.hash.for.testing.only',
    'editor@hadiorigin.com',
    'Content Editor',
    'editor',
    true
  ),
  (
    'demo', 
    '$2a$10$demo.hash.for.testing.only',
    'demo@hadiorigin.com',
    'Demo User',
    'admin',
    true
  )
) AS v(username, password, email, full_name, role, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.users WHERE users.username = v.username);

-- ============================================
-- 2. CATEGORIES SEED DATA
-- ============================================

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
  )
) AS v(name, description, color, icon, sort_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE categories.name = v.name);

-- ============================================
-- 3. PROJECTS SEED DATA
-- ============================================

INSERT INTO public.projects (
  title, description, full_description, category, image, images, demo_url, github_url, video_url,
  tech_stack, features, challenges, results, featured, status, priority, meta_title, meta_description
) VALUES 

-- Featured Project 1
(
  'Dashboard Analitik E-Commerce Terpadu',
  'Platform analitik e-commerce modern dengan visualisasi data real-time dan pelaporan komprehensif untuk optimasi bisnis online',
  'Platform analitik e-commerce yang komprehensif dirancang untuk memberikan wawasan mendalam tentang performa bisnis online. Dashboard ini menggabungkan visualisasi data real-time dengan kemampuan pelaporan yang kuat, memungkinkan pemilik bisnis untuk membuat keputusan berdasarkan data dengan cepat dan akurat.

## Fitur Utama

### Real-time Analytics
- Monitoring penjualan secara real-time dengan WebSocket
- Tracking perilaku pelanggan dan analisis segmentasi
- Alert otomatis untuk perubahan metrik penting
- Dashboard customizable dengan drag-and-drop widgets

### Business Intelligence
- Forecasting revenue menggunakan machine learning
- Analisis cohort untuk customer retention
- A/B testing framework terintegrasi
- Competitive analysis dan market insights

### Inventory Management
- Tracking stok real-time dengan alert otomatis
- Prediksi demand berdasarkan historical data
- Integration dengan supplier dan warehouse management
- Automated reorder points dan purchase suggestions

## Teknologi yang Digunakan

Platform ini dibangun menggunakan teknologi modern untuk memastikan performa, scalability, dan user experience yang optimal dengan React 18, Next.js 14, TypeScript, dan Supabase sebagai backend.',
  'Analytics',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-ecommerce-analytics.hadiorigin.com',
  'https://github.com/hadiorigin/ecommerce-analytics-dashboard',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '["React 18", "Next.js 14", "TypeScript", "TailwindCSS", "Shadcn/ui", "Chart.js", "Recharts", "PostgreSQL", "Supabase", "React Query", "Zustand", "Framer Motion"]'::jsonb,
  '["Real-time sales tracking dengan WebSocket", "Customer behavior analytics dan segmentasi", "Inventory management dengan alert otomatis", "Revenue forecasting menggunakan ML", "Multi-store support dengan role-based access", "Export reports ke PDF dan Excel", "Customizable dashboard widgets", "Mobile-responsive design", "Dark mode support", "Advanced filtering dan search"]'::jsonb,
  'Tantangan utama adalah menangani update data real-time secara efisien tanpa membebani client. Kami mengimplementasikan koneksi WebSocket dengan intelligent throttling dan caching strategies menggunakan Redis. Untuk visualisasi data yang kompleks, kami mengoptimalkan rendering dengan React.memo dan useMemo untuk mencegah re-render yang tidak perlu.',
  'Dashboard berhasil diluncurkan dan mencapai: 99.9% uptime selama 6 bulan pertama, Page load time berkurang 60% (dari 3.5s ke 1.4s), User engagement meningkat 45%, Menangani 10,000+ concurrent users tanpa degradasi performa, Customer satisfaction score: 4.8/5.0, Adopted oleh 50+ e-commerce businesses dalam 3 bulan.',
  1,
  'active',
  100,
  'Dashboard Analitik E-Commerce Terpadu - Real-time Analytics & Business Intelligence',
  'Platform analitik e-commerce modern dengan visualisasi data real-time, forecasting AI, dan pelaporan komprehensif untuk optimasi bisnis online.'
),

-- Featured Project 2
(
  'Platform Media Sosial Interaktif',
  'Platform media sosial full-featured dengan real-time messaging, content sharing, dan analytics yang powerful untuk membangun komunitas online',
  'Platform media sosial yang dirancang untuk memfasilitasi interaksi pengguna, berbagi konten, dan membangun komunitas online yang engaged. Platform ini menggabungkan fitur messaging real-time, content sharing, dan analytics yang comprehensive.

## Arsitektur dan Teknologi

Platform ini dibangun dengan arsitektur microservices untuk scalability dan menggunakan teknologi modern seperti Node.js, MongoDB, Redis, dan Socket.io untuk real-time communication.

## Fitur Utama

### Real-time Communication
- Instant messaging dengan typing indicators
- Group chats dengan unlimited participants
- Voice dan video calls menggunakan WebRTC
- Screen sharing untuk collaboration

### Content Management
- Post scheduling dengan auto-publish
- Rich media support (images, videos, GIFs)
- Story feature dengan 24-hour expiry
- Live streaming capabilities

### Social Features
- User mentions dan notifications
- Hashtag trending system
- Follow/unfollow mechanism
- Privacy controls dan blocking',
  'Social',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-social-platform.hadiorigin.com',
  'https://github.com/hadiorigin/social-media-platform',
  NULL,
  '["React 18", "Node.js", "Express", "MongoDB", "Socket.io", "Redis", "AWS S3", "JWT", "WebRTC", "Docker"]'::jsonb,
  '["Real-time messaging dengan typing indicators", "Post scheduling dan auto-publish", "Analytics dashboard untuk creators", "Content moderation dengan AI", "Multi-factor authentication", "Media uploads dengan compression", "Story feature dengan 24h expiry", "Hashtag trending system", "User mentions dan notifications", "Privacy controls dan blocking"]'::jsonb,
  'Scaling real-time messaging system untuk mendukung ribuan concurrent connections memerlukan implementasi microservices architecture dengan Redis pub/sub pattern. Media handling menjadi challenge karena volume upload yang besar. Content moderation otomatis menggunakan ML model untuk detect inappropriate content.',
  'Platform berhasil diluncurkan dengan hasil: 50,000+ active users dalam bulan pertama, Average session time 35 menit (meningkat 35% dari target), 1M+ messages dikirim per hari, 99.95% message delivery success rate, User retention rate 68% setelah 30 hari, Platform stability dengan 99.8% uptime.',
  1,
  'active',
  95,
  'Platform Media Sosial Interaktif - Real-time Messaging & Community Building',
  'Platform media sosial modern dengan real-time messaging, content sharing, analytics dashboard, dan fitur community building yang powerful.'
),

-- Featured Project 3
(
  'AI Business Analyzer Platform',
  'Platform analisis bisnis bertenaga AI yang memberikan insights mendalam, prediksi market trends, dan rekomendasi strategis untuk transformasi digital',
  'Platform AI Business Analyzer adalah solusi comprehensive yang menggunakan artificial intelligence dan machine learning untuk memberikan analisis bisnis yang mendalam. Platform ini membantu perusahaan dalam membuat keputusan strategis berdasarkan data dan prediksi yang akurat.

## Teknologi AI dan Machine Learning

### Core AI Technologies
- Natural Language Processing (NLP) untuk analisis dokumen dan feedback
- Predictive Analytics menggunakan ensemble machine learning models
- Computer Vision untuk analisis visual content dan brand recognition
- Deep Learning dengan TensorFlow dan PyTorch untuk complex pattern recognition

### Data Processing Pipeline
- Real-time data ingestion dari multiple sources
- ETL processes untuk data cleaning dan transformation
- Feature engineering untuk optimal model performance
- Model versioning dan A/B testing untuk continuous improvement

## Fitur Analisis Bisnis

### Market Intelligence
- Competitor analysis dengan web scraping dan social listening
- Market trend prediction berdasarkan historical data
- Consumer sentiment analysis dari social media dan reviews
- Price optimization recommendations berdasarkan market dynamics

### Financial Analytics
- Revenue forecasting dengan multiple prediction models
- Cash flow analysis dan working capital optimization
- Risk assessment dengan Monte Carlo simulations
- Investment ROI calculations dan scenario planning',
  'AI/ML',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://ai-analyzer.hadiorigin.com',
  'https://github.com/hadiorigin/ai-business-analyzer',
  'https://www.youtube.com/embed/AI_DEMO_VIDEO',
  '["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "FastAPI", "React", "Next.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"]'::jsonb,
  '["AI-powered business analysis", "Market trend prediction", "Competitor intelligence", "Financial forecasting", "Risk assessment", "Process optimization", "Digital transformation roadmap", "Real-time dashboard", "Custom reporting", "API integrations"]'::jsonb,
  'Mengintegrasikan multiple AI models dengan different data sources dan ensuring model accuracy merupakan challenge utama. Real-time data processing dengan machine learning inference memerlukan optimized infrastructure dengan GPU acceleration dan model caching. Data privacy dan security critical untuk business data.',
  'Platform berhasil deployed dengan impact: 500+ businesses menggunakan platform, Decision-making speed improved 60%, Forecast accuracy increased to 85%+, Cost optimization achieved 20% average savings, Revenue growth 15% average untuk clients, 95% user satisfaction rate, 99.9% uptime dengan 24/7 support.',
  1,
  'active',
  90,
  'AI Business Analyzer Platform - Intelligent Business Insights & Predictions',
  'Platform analisis bisnis bertenaga AI dengan machine learning untuk market intelligence, financial forecasting, dan strategic recommendations.'
),

-- Regular Projects
(
  'Sistem Manajemen Rumah Sakit Terpadu',
  'Platform healthcare comprehensive dengan manajemen pasien, rekam medis elektronik, dan telemedicine yang HIPAA compliant',
  'Sistem manajemen rumah sakit yang comprehensive untuk digitalisasi layanan kesehatan dengan fokus pada patient care dan operational efficiency. Platform ini mengintegrasikan Electronic Health Records (EHR), appointment scheduling, telemedicine consultations, dan e-prescription management dalam satu sistem yang aman dan user-friendly.',
  'Healthcare',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-healthcare.hadiorigin.com',
  'https://github.com/hadiorigin/healthcare-management',
  '["React", "Next.js", "Node.js", "PostgreSQL", "Twilio", "Stripe", "AWS", "Docker", "HIPAA Compliance"]'::jsonb,
  '["Electronic Health Records (EHR)", "Appointment scheduling", "Telemedicine consultations", "E-prescription management", "Insurance integration", "HIPAA compliance", "Patient portal", "Lab results access", "Emergency contact system"]'::jsonb,
  'Ensuring HIPAA compliance sambil maintaining good UX memerlukan extensive security audits dan end-to-end encryption. Telemedicine video quality dan reliability critical untuk patient care. Data migration dari legacy systems tanpa downtime menjadi challenge tersendiri.',
  'Successfully deployed: 50+ healthcare providers menggunakan sistem, 100,000+ patient records dikelola securely, 99.99% uptime dengan zero security breaches, Patient satisfaction score 4.6/5.0, 30% reduction dalam administrative overhead, 5,000+ telemedicine consultations per month.',
  0,
  'active',
  80
),

(
  'Platform E-Learning Interaktif',
  'Learning Management System dengan video courses, interactive quizzes, progress tracking, dan certification untuk institusi pendidikan',
  'Platform LMS comprehensive untuk online education dengan fitur-fitur modern untuk enhance learning experience. Sistem ini menyediakan video courses dengan adaptive streaming, interactive quizzes, progress tracking yang detail, dan digital certificates dengan blockchain verification.',
  'Education',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-elearning.hadiorigin.com',
  'https://github.com/hadiorigin/elearning-platform',
  '["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Mux", "Stripe", "AWS S3"]'::jsonb,
  '["Video courses dengan adaptive streaming", "Interactive quizzes dan assessments", "Progress tracking dan analytics", "Digital certificates dengan blockchain", "Discussion forums", "Live classes dengan screen sharing", "Assignment submission dan grading", "Mobile learning app"]'::jsonb,
  'Implementing adaptive video streaming untuk varying internet speeds memerlukan integration dengan Mux dan building custom CDN strategy. Content piracy prevention dengan DRM implementation dan watermarking. Handling concurrent live classes dengan hundreds of participants.',
  'Platform success: 50,000+ students enrolled, 100+ courses available, 95% course completion rate, 4.8/5.0 average course rating, 20,000+ certificates issued, 99.9% video streaming uptime, Student engagement time 45 min/session.',
  0,
  'active',
  75
),

(
  'Aplikasi Fintech Mobile Banking',
  'Aplikasi mobile banking dengan fitur transfer, pembayaran, investasi, dan financial planning yang aman dan user-friendly',
  'Aplikasi mobile banking modern yang menyediakan layanan finansial lengkap dalam satu platform. Dengan fokus pada security, user experience, dan financial inclusion, aplikasi ini memungkinkan pengguna untuk melakukan berbagai transaksi finansial dengan mudah dan aman.',
  'Finance',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-fintech.hadiorigin.com',
  'https://github.com/hadiorigin/fintech-mobile-banking',
  '["React Native", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe", "Plaid", "Biometric Auth"]'::jsonb,
  '["Mobile banking dengan biometric auth", "Real-time transfers dan payments", "Investment portfolio management", "Financial planning tools", "Bill payments dan top-up", "QR code payments", "Expense tracking", "Multi-currency support"]'::jsonb,
  'Security implementation dengan multi-layer authentication, fraud detection, dan compliance dengan financial regulations. Real-time transaction processing dengan high availability dan zero downtime. Integration dengan multiple payment gateways dan banking APIs.',
  'App success: 100,000+ downloads dalam 6 bulan, 4.7/5.0 rating di app stores, $10M+ transaction volume per month, 99.99% transaction success rate, Zero security incidents, Compliance dengan PCI DSS dan financial regulations.',
  0,
  'active',
  70
);

-- ============================================
-- 4. SETTINGS SEED DATA
-- ============================================

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
    'contact_email',
    '"contact@hadiorigin.com"'::jsonb,
    'string',
    'contact',
    'Email utama untuk kontak bisnis',
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
    'social_links',
    '{
      "github": "https://github.com/hadiorigin",
      "linkedin": "https://linkedin.com/company/hadiorigin",
      "twitter": "https://twitter.com/hadiorigin",
      "instagram": "https://instagram.com/hadiorigin"
    }'::jsonb,
    'json',
    'social',
    'Links ke semua social media profiles',
    true,
    false
  ),
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
    'theme_primary_color',
    '"#3B82F6"'::jsonb,
    'string',
    'theme',
    'Warna utama theme (hex color)',
    true,
    true
  ),
  (
    'maintenance_mode',
    'false'::jsonb,
    'boolean',
    'system',
    'Apakah website dalam maintenance mode',
    false,
    true
  )
) AS v(key, value, type, category, description, is_public, is_required)
WHERE NOT EXISTS (SELECT 1 FROM public.settings WHERE settings.key = v.key);

-- ============================================
-- 5. ANALYTICS SEED DATA (SAMPLE)
-- ============================================

INSERT INTO public.analytics (
  event, category, action, label, data, session_id, ip_address, user_agent, country, city
) VALUES 
(
  'page_view',
  'navigation',
  'view',
  'homepage',
  '{"page": "/", "title": "Home - Hadi Origin Portfolio", "load_time": 1.2}'::jsonb,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.100'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Indonesia',
  'Jakarta'
),
(
  'project_click',
  'engagement',
  'click',
  'featured_project',
  '{"project_title": "Dashboard Analitik E-Commerce", "position": 1, "section": "featured"}'::jsonb,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.101'::inet,
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Indonesia',
  'Bandung'
),
(
  'contact_form_submit',
  'conversion',
  'submit',
  'contact_form',
  '{"form_type": "contact", "project_interest": "E-Commerce Development"}'::jsonb,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.102'::inet,
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'Indonesia',
  'Surabaya'
);

-- Generate some historical analytics data
INSERT INTO public.analytics (event, category, data, session_id, created_at)
SELECT 
  'page_view',
  'navigation',
  ('{"page": "/", "synthetic": true}')::jsonb,
  'hist_sess_' || gen_random_uuid()::text,
  NOW() - (random() * INTERVAL '30 days')
FROM generate_series(1, 50);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check row counts
SELECT 
  'users' as table_name, COUNT(*) as count FROM public.users
UNION ALL
SELECT 'categories', COUNT(*) FROM public.categories
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects
UNION ALL
SELECT 'analytics', COUNT(*) FROM public.analytics
UNION ALL
SELECT 'settings', COUNT(*) FROM public.settings
ORDER BY table_name;

-- Check projects with details
SELECT 
  id,
  title,
  category,
  featured,
  status,
  priority,
  jsonb_array_length(tech_stack) as tech_count,
  jsonb_array_length(features) as feature_count,
  created_at
FROM public.projects
ORDER BY featured DESC, priority DESC, created_at DESC;

-- Check categories with project counts
SELECT 
  name,
  slug,
  project_count,
  color,
  sort_order,
  is_active
FROM public.categories
ORDER BY sort_order;

-- Test some functions
SELECT get_setting('site_title');
SELECT * FROM search_projects('e-commerce') LIMIT 3;

-- ============================================
-- SEED DATA COMPLETE
-- ============================================
-- Seed data berhasil diinsert!
-- 
-- Summary:
-- - Users: Admin, Editor, Demo accounts
-- - Categories: 10 kategori proyek
-- - Projects: 6 proyek (3 featured, 3 regular)
-- - Settings: Konfigurasi dasar aplikasi
-- - Analytics: Sample tracking data
--
-- Next steps:
-- 1. Update URLs demo dan GitHub dengan yang real
-- 2. Ganti password hash dengan bcrypt yang benar
-- 3. Update contact information dengan data real
-- 4. Customize settings sesuai kebutuhan
-- 5. Test semua functionality
-- ============================================