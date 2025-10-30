-- ============================================
-- FEATURES SEED DATA
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