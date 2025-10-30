-- ============================================
-- STATISTICS SEED DATA
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