-- ============================================
-- TECHNOLOGY CATEGORIES SEED DATA
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