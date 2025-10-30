-- ============================================
-- PROJECTS SEED DATA
-- Data awal untuk tabel projects
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.projects CASCADE;

-- Insert featured projects
INSERT INTO public.projects (
  title, 
  description, 
  full_description,
  category, 
  image, 
  images,
  demo_url, 
  github_url,
  video_url,
  tech_stack, 
  features,
  challenges,
  results,
  featured, 
  status,
  priority,
  meta_title,
  meta_description
) VALUES 

-- Project 1: E-Commerce Dashboard Analytics
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

### Multi-Store Support
- Centralized dashboard untuk multiple stores
- Role-based access control untuk tim
- Cross-store analytics dan comparison
- Unified reporting across all channels

## Teknologi yang Digunakan

Platform ini dibangun menggunakan teknologi modern untuk memastikan performa, scalability, dan user experience yang optimal:

- **Frontend**: React 18 dengan Next.js 14 untuk SSR dan optimal SEO
- **UI Framework**: TailwindCSS dan Shadcn/ui untuk design system yang konsisten
- **State Management**: Zustand untuk state management yang lightweight
- **Data Visualization**: Chart.js dan Recharts untuk interactive charts
- **Animation**: Framer Motion untuk smooth animations dan transitions
- **Backend**: Supabase untuk database dan real-time subscriptions
- **Caching**: React Query untuk efficient data fetching dan caching

## Tantangan Teknis

### Real-time Data Processing
Menangani update data real-time secara efisien tanpa membebani client merupakan tantangan utama. Kami mengimplementasikan:
- WebSocket connections dengan intelligent throttling
- Redis caching untuk mengurangi database load
- Optimistic updates dengan rollback mechanism
- Data aggregation di server-side untuk mengurangi payload

### Performance Optimization
Untuk visualisasi data yang kompleks dengan ribuan data points:
- React.memo dan useMemo untuk mencegah unnecessary re-renders
- Virtual scrolling untuk tabel dengan ribuan baris
- Lazy loading untuk charts dan heavy components
- Image optimization dan CDN integration

### Data Consistency
Memastikan data consistency across multiple stores dan handling concurrent updates:
- Optimistic updates dengan conflict resolution
- Database transactions untuk critical operations
- Event sourcing untuk audit trail
- Eventual consistency model untuk distributed data

## Hasil dan Impact

Dashboard berhasil diluncurkan dan mencapai hasil yang impressive:

### Performance Metrics
- **99.9% uptime** selama 6 bulan pertama operasi
- **Page load time berkurang 60%** (dari 3.5s ke 1.4s)
- **Menangani 10,000+ concurrent users** tanpa degradasi performa
- **Query time reduction 30%** dengan database optimization

### Business Impact
- **User engagement meningkat 45%** dengan interface yang intuitive
- **Customer satisfaction score: 4.8/5.0** berdasarkan user feedback
- **ROI improvement 25%** untuk klien yang menggunakan forecasting feature
- **Adopted oleh 50+ e-commerce businesses** dalam 3 bulan pertama

### Technical Achievements
- Zero data loss selama operasi
- Sub-second response time untuk 95% queries
- Successful handling of Black Friday traffic spikes
- 99.95% data accuracy dalam financial reporting',
  'Analytics',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-ecommerce-analytics.hadiorigin.com',
  'https://github.com/hadiorigin/ecommerce-analytics-dashboard',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '["React 18", "Next.js 14", "TypeScript", "TailwindCSS", "Shadcn/ui", "Chart.js", "Recharts", "PostgreSQL", "Supabase", "React Query", "Zustand", "Framer Motion", "Redis", "WebSocket"]'::jsonb,
  '["Real-time sales tracking dengan WebSocket", "Customer behavior analytics dan segmentasi", "Inventory management dengan alert otomatis", "Revenue forecasting menggunakan ML", "Multi-store support dengan role-based access", "Export reports ke PDF dan Excel", "Customizable dashboard widgets", "Mobile-responsive design", "Dark mode support", "Advanced filtering dan search", "A/B testing framework", "Competitive analysis tools"]'::jsonb,
  'Tantangan utama adalah menangani update data real-time secara efisien tanpa membebani client. Kami mengimplementasikan koneksi WebSocket dengan intelligent throttling dan caching strategies menggunakan Redis. Untuk visualisasi data yang kompleks, kami mengoptimalkan rendering dengan React.memo dan useMemo untuk mencegah re-render yang tidak perlu. Implementasi virtual scrolling untuk tabel besar dengan ribuan baris data juga menjadi kunci performa. Challenge lainnya adalah memastikan data consistency across multiple stores dan handling concurrent updates. Kami menggunakan optimistic updates dengan rollback mechanism dan conflict resolution strategies.',
  'Dashboard berhasil diluncurkan dan mencapai: 99.9% uptime selama 6 bulan pertama, Page load time berkurang 60% (dari 3.5s ke 1.4s), User engagement meningkat 45%, Menangani 10,000+ concurrent users tanpa degradasi performa, Reduction 30% dalam query time dengan database optimization, Customer satisfaction score: 4.8/5.0, Adopted oleh 50+ e-commerce businesses dalam 3 bulan, ROI improvement 25% untuk klien yang menggunakan forecasting feature.',
  1,
  'active',
  100,
  'Dashboard Analitik E-Commerce Terpadu - Real-time Analytics & Business Intelligence',
  'Platform analitik e-commerce modern dengan visualisasi data real-time, forecasting AI, dan pelaporan komprehensif untuk optimasi bisnis online.'
),

-- Project 2: Social Media Platform
(
  'Platform Media Sosial Interaktif',
  'Platform media sosial full-featured dengan real-time messaging, content sharing, dan analytics yang powerful untuk membangun komunitas online',
  'Platform media sosial yang dirancang untuk memfasilitasi interaksi pengguna, berbagi konten, dan membangun komunitas online yang engaged. Platform ini menggabungkan fitur messaging real-time, content sharing, dan analytics yang comprehensive.

## Arsitektur dan Teknologi

Platform ini dibangun dengan arsitektur microservices untuk scalability dan menggunakan teknologi modern:

### Backend Architecture
- **Node.js dengan Express** untuk RESTful API
- **MongoDB** untuk flexible document storage
- **Redis** untuk caching dan session management
- **Socket.io** untuk real-time communication
- **Bull Queue** untuk background job processing

### Frontend Technology
- **React 18** dengan modern hooks dan concurrent features
- **Responsive design** yang optimal di semua device
- **PWA capabilities** untuk mobile-like experience
- **Real-time updates** tanpa page refresh

### Infrastructure
- **AWS S3** untuk media storage dan CDN
- **Docker containers** untuk consistent deployment
- **Load balancing** untuk high availability
- **Auto-scaling** untuk handle traffic spikes

## Fitur Utama

### Real-time Communication
- **Instant messaging** dengan typing indicators
- **Group chats** dengan unlimited participants
- **Voice dan video calls** menggunakan WebRTC
- **Screen sharing** untuk collaboration
- **Message reactions** dan emoji support

### Content Management
- **Post scheduling** dengan auto-publish
- **Rich media support** (images, videos, GIFs)
- **Story feature** dengan 24-hour expiry
- **Live streaming** capabilities
- **Content moderation** dengan AI detection

### Social Features
- **User mentions** dan notifications
- **Hashtag trending** system
- **Follow/unfollow** mechanism
- **Privacy controls** dan blocking
- **User verification** system

### Analytics Dashboard
- **Engagement metrics** untuk creators
- **Audience insights** dan demographics
- **Content performance** tracking
- **Growth analytics** dan trends
- **Revenue tracking** untuk monetization

## Tantangan Teknis

### Scalability
Scaling real-time messaging system untuk mendukung ribuan concurrent connections memerlukan:
- **Microservices architecture** dengan Redis pub/sub pattern
- **Horizontal scaling** dengan load balancing
- **Database sharding** untuk distribute data
- **CDN integration** untuk global content delivery

### Media Handling
Volume upload yang besar memerlukan optimasi:
- **Image compression** dengan Sharp untuk reduce file size
- **Video transcoding** untuk multiple quality levels
- **Progressive upload** untuk large files
- **Bandwidth optimization** dengan adaptive streaming

### Content Moderation
Automated content moderation menggunakan:
- **ML models** untuk detect inappropriate content
- **Human review system** sebagai fallback
- **Rate limiting** untuk prevent spam
- **Abuse detection** dengan pattern recognition

## Hasil dan Metrics

### User Adoption
- **50,000+ active users** dalam bulan pertama
- **1M+ messages** dikirim per hari
- **Average session time 35 menit** (meningkat 35% dari target)
- **User retention rate 68%** setelah 30 hari

### Technical Performance
- **99.95% message delivery** success rate
- **Media upload processing** time < 2 detik
- **Content moderation accuracy 94%** dengan AI
- **Platform stability** dengan 99.8% uptime

### Business Impact
- **Viral growth** dengan organic user acquisition
- **High engagement** dengan daily active users 70%
- **Monetization success** dengan premium features
- **Community building** dengan 1000+ active groups',
  'Social',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-social-platform.hadiorigin.com',
  'https://github.com/hadiorigin/social-media-platform',
  NULL,
  '["React 18", "Node.js", "Express", "MongoDB", "Socket.io", "Redis", "AWS S3", "JWT", "Passport.js", "Bull Queue", "Sharp", "Multer", "WebRTC", "Docker"]'::jsonb,
  '["Real-time messaging dengan typing indicators", "Post scheduling dan auto-publish", "Analytics dashboard untuk creators", "Content moderation dengan AI", "Multi-factor authentication", "Media uploads dengan compression", "Story feature dengan 24h expiry", "Hashtag trending system", "User mentions dan notifications", "Privacy controls dan blocking", "Voice dan video calls", "Live streaming capabilities"]'::jsonb,
  'Scaling real-time messaging system untuk mendukung ribuan concurrent connections memerlukan implementasi microservices architecture dengan Redis pub/sub pattern. Kami menggunakan horizontal scaling dengan load balancing untuk distribute connections. Media handling menjadi challenge karena volume upload yang besar. Implementasi image compression dengan Sharp dan CDN integration dengan CloudFront membantu mengurangi bandwidth usage hingga 70%. Content moderation otomatis menggunakan ML model untuk detect inappropriate content, dengan human review system sebagai fallback.',
  'Platform berhasil diluncurkan dengan hasil: 50,000+ active users dalam bulan pertama, Average session time 35 menit (meningkat 35% dari target), 1M+ messages dikirim per hari, 99.95% message delivery success rate, Media upload processing time < 2 detik, Content moderation accuracy 94%, User retention rate 68% setelah 30 hari, Platform stability dengan 99.8% uptime.',
  1,
  'active',
  95,
  'Platform Media Sosial Interaktif - Real-time Messaging & Community Building',
  'Platform media sosial modern dengan real-time messaging, content sharing, analytics dashboard, dan fitur community building yang powerful.'
),

-- Project 3: AI Business Analyzer
(
  'AI Business Analyzer Platform',
  'Platform analisis bisnis bertenaga AI yang memberikan insights mendalam, prediksi market trends, dan rekomendasi strategis untuk transformasi digital',
  'Platform AI Business Analyzer adalah solusi comprehensive yang menggunakan artificial intelligence dan machine learning untuk memberikan analisis bisnis yang mendalam. Platform ini membantu perusahaan dalam membuat keputusan strategis berdasarkan data dan prediksi yang akurat.

## Teknologi AI dan Machine Learning

### Core AI Technologies
- **Natural Language Processing (NLP)** untuk analisis dokumen dan feedback
- **Predictive Analytics** menggunakan ensemble machine learning models
- **Computer Vision** untuk analisis visual content dan brand recognition
- **Deep Learning** dengan TensorFlow dan PyTorch untuk complex pattern recognition

### Data Processing Pipeline
- **Real-time data ingestion** dari multiple sources
- **ETL processes** untuk data cleaning dan transformation
- **Feature engineering** untuk optimal model performance
- **Model versioning** dan A/B testing untuk continuous improvement

## Fitur Analisis Bisnis

### Market Intelligence
- **Competitor analysis** dengan web scraping dan social listening
- **Market trend prediction** berdasarkan historical data
- **Consumer sentiment analysis** dari social media dan reviews
- **Price optimization** recommendations berdasarkan market dynamics

### Financial Analytics
- **Revenue forecasting** dengan multiple prediction models
- **Cash flow analysis** dan working capital optimization
- **Risk assessment** dengan Monte Carlo simulations
- **Investment ROI** calculations dan scenario planning

### Operational Insights
- **Process optimization** recommendations
- **Resource allocation** analysis
- **Performance benchmarking** against industry standards
- **Efficiency metrics** tracking dan improvement suggestions

### Digital Transformation Roadmap
- **Technology stack** assessment dan recommendations
- **Digital maturity** scoring dengan improvement roadmap
- **Implementation timeline** dengan milestone tracking
- **Change management** strategies dan risk mitigation

## Advanced Analytics Features

### Predictive Modeling
- **Sales forecasting** dengan seasonal adjustments
- **Customer churn prediction** dengan early warning system
- **Demand planning** untuk inventory optimization
- **Market expansion** opportunities identification

### Business Intelligence Dashboard
- **Executive dashboards** dengan key performance indicators
- **Drill-down capabilities** untuk detailed analysis
- **Custom reporting** dengan automated generation
- **Real-time alerts** untuk critical business metrics

### Integration Capabilities
- **API integrations** dengan popular business tools
- **Data connectors** untuk CRM, ERP, dan accounting systems
- **Cloud storage** integration untuk document analysis
- **Third-party analytics** tools integration

## Technical Architecture

### Scalable Infrastructure
- **Microservices architecture** untuk modular development
- **Container orchestration** dengan Kubernetes
- **Auto-scaling** untuk handle varying workloads
- **Multi-region deployment** untuk global availability

### Security dan Compliance
- **End-to-end encryption** untuk sensitive business data
- **GDPR compliance** dengan data privacy controls
- **Role-based access** control dengan audit logging
- **SOC 2 compliance** untuk enterprise security standards

## Hasil dan Impact

### Business Outcomes
- **Decision-making speed** improved by 60%
- **Forecast accuracy** increased to 85%+
- **Cost optimization** achieved 20% average savings
- **Revenue growth** 15% average increase for clients

### User Adoption
- **500+ businesses** using the platform
- **95% user satisfaction** rate
- **40+ integrations** with business tools
- **24/7 support** dengan 99.9% uptime

### Technical Achievements
- **Sub-second response** time untuk most queries
- **99.99% data accuracy** dalam predictions
- **Petabyte-scale** data processing capability
- **Real-time processing** untuk streaming data',
  'AI/ML',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://ai-analyzer.hadiorigin.com',
  'https://github.com/hadiorigin/ai-business-analyzer',
  'https://www.youtube.com/embed/AI_DEMO_VIDEO',
  '["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "FastAPI", "React", "Next.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "OpenAI GPT", "Hugging Face"]'::jsonb,
  '["AI-powered business analysis", "Market trend prediction", "Competitor intelligence", "Financial forecasting", "Risk assessment", "Process optimization", "Digital transformation roadmap", "Real-time dashboard", "Custom reporting", "API integrations", "Multi-language support", "Mobile analytics app"]'::jsonb,
  'Mengintegrasikan multiple AI models dengan different data sources dan ensuring model accuracy merupakan challenge utama. Kami menggunakan ensemble methods dan cross-validation untuk improve prediction accuracy. Real-time data processing dengan machine learning inference memerlukan optimized infrastructure dengan GPU acceleration dan model caching. Data privacy dan security critical untuk business data, sehingga implementasi end-to-end encryption dan compliance dengan regulations seperti GDPR.',
  'Platform berhasil deployed dengan impact: 500+ businesses menggunakan platform, Decision-making speed improved 60%, Forecast accuracy increased to 85%+, Cost optimization achieved 20% average savings, Revenue growth 15% average untuk clients, 95% user satisfaction rate, 99.9% uptime dengan 24/7 support, Sub-second response time untuk most queries.',
  1,
  'active',
  90,
  'AI Business Analyzer Platform - Intelligent Business Insights & Predictions',
  'Platform analisis bisnis bertenaga AI dengan machine learning untuk market intelligence, financial forecasting, dan strategic recommendations.'
);

-- Insert more projects (non-featured)
INSERT INTO public.projects (
  title, description, full_description, category, image, images, demo_url, github_url, 
  tech_stack, features, challenges, results, featured, status, priority
) VALUES 

-- Healthcare Management System
(
  'Sistem Manajemen Rumah Sakit Terpadu',
  'Platform healthcare comprehensive dengan manajemen pasien, rekam medis elektronik, dan telemedicine yang HIPAA compliant',
  'Sistem manajemen rumah sakit yang comprehensive untuk digitalisasi layanan kesehatan dengan fokus pada patient care dan operational efficiency.',
  'Healthcare',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80", "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-healthcare.hadiorigin.com',
  'https://github.com/hadiorigin/healthcare-management',
  '["React", "Next.js", "Node.js", "PostgreSQL", "Twilio", "Stripe", "AWS", "Docker", "HIPAA Compliance"]'::jsonb,
  '["Electronic Health Records (EHR)", "Appointment scheduling", "Telemedicine consultations", "E-prescription management", "Insurance integration", "HIPAA compliance", "Patient portal", "Lab results access", "Emergency contact system"]'::jsonb,
  'Ensuring HIPAA compliance sambil maintaining good UX memerlukan extensive security audits dan end-to-end encryption. Telemedicine video quality dan reliability critical untuk patient care.',
  'Successfully deployed: 50+ healthcare providers, 100,000+ patient records managed, 99.99% uptime, Zero security breaches, Patient satisfaction 4.6/5.0.',
  0,
  'active',
  80
),

-- E-Learning Platform
(
  'Platform E-Learning Interaktif',
  'Learning Management System dengan video courses, interactive quizzes, progress tracking, dan certification untuk institusi pendidikan',
  'Platform LMS comprehensive untuk online education dengan fitur-fitur modern untuk enhance learning experience.',
  'Education',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop&q=80',
  '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop&q=80"]'::jsonb,
  'https://demo-elearning.hadiorigin.com',
  'https://github.com/hadiorigin/elearning-platform',
  '["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Mux", "Stripe", "AWS S3"]'::jsonb,
  '["Video courses", "Interactive quizzes", "Progress tracking", "Digital certificates", "Discussion forums", "Live classes", "Assignment submission", "Mobile learning app"]'::jsonb,
  'Implementing adaptive video streaming untuk varying internet speeds dan content piracy prevention dengan DRM.',
  'Platform success: 50,000+ students enrolled, 95% completion rate, 4.8/5.0 rating, 20,000+ certificates issued.',
  0,
  'active',
  75
);

-- Verifikasi data
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

-- ============================================
-- NOTES
-- ============================================
-- 1. Slug akan di-generate otomatis oleh trigger
-- 2. published_at akan di-set otomatis saat status = 'active'
-- 3. Ganti demo URLs dengan URLs yang benar
-- 4. Ganti GitHub URLs dengan repository yang benar
-- 5. Video URLs opsional, bisa dikosongkan jika tidak ada
-- 6. Images array berisi multiple URLs untuk gallery
-- 7. Tech stack dan features dalam format JSON array
-- 8. Full description mendukung Markdown formatting
-- 9. Priority menentukan urutan tampilan (higher = more priority)
-- 10. Featured projects (featured = 1) akan ditampilkan di homepage