-- ============================================
-- TECHNOLOGIES SEED DATA
-- ============================================

-- First, we need to get the category IDs. Since we can't use variables in plain SQL,
-- we'll use a more complex INSERT with subqueries

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
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'Ionic',
  'Intermediate',
  'bg-blue-600',
  5
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Mobile Development'),
  'Capacitor',
  'Advanced',
  'bg-indigo-500',
  6
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
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Backend & Database'),
  'Express.js',
  'Expert',
  'bg-gray-600',
  6
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
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'Netlify',
  'Advanced',
  'bg-teal-500',
  5
),
(
  (SELECT id FROM public.technology_categories WHERE title_en = 'Cloud & DevOps'),
  'Firebase',
  'Advanced',
  'bg-yellow-600',
  6
)
ON CONFLICT DO NOTHING;