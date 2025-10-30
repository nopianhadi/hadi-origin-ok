-- ============================================
-- PROCESS STEPS SEED DATA
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