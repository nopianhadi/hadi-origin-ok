-- ============================================
-- BLOG CATEGORIES SEED DATA
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