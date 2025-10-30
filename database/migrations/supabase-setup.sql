-- ============================================
-- SUPABASE DATABASE SETUP
-- Portfolio Admin Dashboard
-- ============================================

-- Drop existing tables if needed (CAUTION: removes all data)
-- Uncomment these lines if you need to recreate tables from scratch
DROP TABLE IF EXISTS public.analytics CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT, -- For local auth; prefer Supabase Auth instead
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);

COMMENT ON TABLE public.users IS 'Application users for admin access';

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories (name);

COMMENT ON TABLE public.categories IS 'Project categories for filtering and organization';

-- ============================================
-- 3. PROJECTS TABLE (DETAILED)
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  
  -- Category
  category TEXT NOT NULL, -- Category name as text
  
  -- Media
  image TEXT NOT NULL, -- Main image URL
  images JSONB DEFAULT '[]'::JSONB, -- Array of additional image URLs
  video_url TEXT, -- YouTube/Vimeo embed URL
  
  -- Links
  demo_url TEXT NOT NULL,
  github_url TEXT,
  
  -- Technical Details
  tech_stack JSONB NOT NULL DEFAULT '[]'::JSONB, -- Array of tech strings
  features JSONB DEFAULT '[]'::JSONB, -- Array of feature descriptions
  challenges TEXT, -- Markdown/text describing challenges faced
  results TEXT, -- Markdown/text describing outcomes
  
  -- Metadata
  featured INTEGER NOT NULL DEFAULT 0, -- 0 = no, 1 = yes
  status TEXT NOT NULL DEFAULT 'active', -- active, inactive, archived
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);

COMMENT ON TABLE public.projects IS 'Portfolio projects with detailed information';
COMMENT ON COLUMN public.projects.tech_stack IS 'JSON array of technology names';
COMMENT ON COLUMN public.projects.features IS 'JSON array of key features';
COMMENT ON COLUMN public.projects.images IS 'JSON array of additional image URLs for gallery';

-- ============================================
-- 4. ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL, -- Event name (e.g., 'page_view', 'project_click')
  data JSONB, -- Additional event data
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics (event);

COMMENT ON TABLE public.analytics IS 'Analytics events and tracking data';

-- ============================================
-- 5. SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB, -- Flexible JSON value
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings (key);

COMMENT ON TABLE public.settings IS 'Application settings and configuration';

-- ============================================
-- SAMPLE DATA - CATEGORIES
-- ============================================
INSERT INTO public.categories (name, description, color) 
SELECT * FROM (VALUES
  ('Web Development', 'Full-stack web applications and websites', '#3B82F6'),
  ('Mobile App', 'iOS and Android mobile applications', '#10B981'),
  ('AI/ML', 'Artificial Intelligence and Machine Learning projects', '#8B5CF6'),
  ('Finance', 'Financial technology and fintech solutions', '#F59E0B'),
  ('Healthcare', 'Healthcare and medical technology', '#EF4444'),
  ('E-Commerce', 'Online shopping and retail platforms', '#EC4899'),
  ('Education', 'Educational technology and e-learning', '#06B6D4'),
  ('Productivity', 'Productivity tools and workflow automation', '#14B8A6'),
  ('Analytics', 'Data analytics and business intelligence', '#6366F1'),
  ('Social', 'Social media and community platforms', '#F97316')
) AS v(name, description, color)
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE categories.name = v.name);

-- ============================================
-- SAMPLE DATA - PROJECTS
-- ============================================
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
  status
) VALUES
(
  'E-Commerce Dashboard Analytics',
  'Modern analytics dashboard with real-time data visualization and comprehensive reporting',
  'A comprehensive e-commerce analytics platform that provides real-time insights into sales, customer behavior, and inventory management. Built with modern web technologies and optimized for performance.',
  'Analytics',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/ecommerce-dashboard',
  'https://github.com/username/ecommerce-dashboard',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '["React", "Next.js", "TypeScript", "TailwindCSS", "Chart.js", "PostgreSQL", "Supabase"]'::jsonb,
  '["Real-time sales tracking", "Customer behavior analytics", "Inventory management", "Revenue forecasting", "Multi-store support", "Export reports to PDF/Excel"]'::jsonb,
  'The main challenge was handling real-time data updates efficiently without overwhelming the client. We implemented WebSocket connections with intelligent throttling and caching strategies.',
  'Achieved 99.9% uptime, reduced page load time by 60%, and increased user engagement by 45%. The dashboard now handles over 10,000 concurrent users.',
  1,
  'active'
),
(
  'Social Media Platform',
  'Interactive social dashboard with engagement metrics and content management',
  'A full-featured social media platform with real-time messaging, content sharing, and advanced analytics. Designed for scalability and user engagement.',
  'Social',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/social-platform',
  'https://github.com/username/social-platform',
  NULL,
  '["React", "Node.js", "Express", "MongoDB", "Socket.io", "Redis", "AWS S3"]'::jsonb,
  '["Real-time messaging", "Post scheduling", "Analytics dashboard", "Content moderation", "User authentication", "Media uploads"]'::jsonb,
  'Scaling the real-time messaging system to support thousands of concurrent connections required implementing a microservices architecture with Redis pub/sub.',
  'Successfully launched with 50,000+ active users in the first month. Average session time increased by 35%.',
  1,
  'active'
),
(
  'Project Management Suite',
  'Collaborative workspace with task tracking, team management, and productivity tools',
  'An all-in-one project management solution designed for remote teams. Features include kanban boards, gantt charts, time tracking, and team collaboration tools.',
  'Productivity',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/project-management',
  'https://github.com/username/project-management',
  NULL,
  '["Vue.js", "Nuxt.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"]'::jsonb,
  '["Kanban boards", "Gantt charts", "Time tracking", "Team chat", "File sharing", "Custom workflows", "API integrations"]'::jsonb,
  'Implementing drag-and-drop functionality across different views while maintaining data consistency was complex. We used optimistic updates with rollback mechanisms.',
  'Adopted by 200+ companies, improved team productivity by 40%, and reduced project delivery time by 25%.',
  1,
  'active'
),
(
  'Financial Dashboard',
  'Comprehensive financial analytics and reporting with real-time market data',
  'A sophisticated financial dashboard providing real-time market data, portfolio tracking, and advanced analytics for investors and financial professionals.',
  'Finance',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/financial-dashboard',
  '',
  NULL,
  '["React", "TypeScript", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis"]'::jsonb,
  '["Real-time market data", "Portfolio tracking", "Risk analysis", "Custom alerts", "Multi-currency support", "Tax reporting"]'::jsonb,
  'Integrating multiple financial data providers with different APIs and ensuring data accuracy required building a robust data normalization layer.',
  'Processing over 1M data points per second, serving 10,000+ active traders with sub-100ms latency.',
  1,
  'active'
),
(
  'Healthcare Portal',
  'Patient management and medical records system with HIPAA compliance',
  'A secure healthcare platform for managing patient records, appointments, and telemedicine consultations. Built with privacy and security as top priorities.',
  'Healthcare',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/healthcare-portal',
  '',
  NULL,
  '["React", "Next.js", "Node.js", "PostgreSQL", "Twilio", "Stripe", "AWS"]'::jsonb,
  '["Patient records", "Appointment scheduling", "Telemedicine", "Prescription management", "Insurance integration", "HIPAA compliance"]'::jsonb,
  'Ensuring HIPAA compliance while maintaining a good user experience required extensive security audits and implementing end-to-end encryption.',
  'Used by 50+ healthcare providers, managing 100,000+ patient records, with 99.99% uptime and zero security breaches.',
  0,
  'active'
),
(
  'Education Platform',
  'Learning management system with progress tracking and interactive courses',
  'A comprehensive LMS platform for online education with video courses, quizzes, assignments, and student progress tracking.',
  'Education',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/education-platform',
  'https://github.com/username/education-platform',
  NULL,
  '["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Mux", "Stripe"]'::jsonb,
  '["Video courses", "Interactive quizzes", "Progress tracking", "Certificates", "Discussion forums", "Live classes"]'::jsonb,
  'Implementing adaptive video streaming for users with varying internet speeds required integrating with Mux and building a custom CDN strategy.',
  'Serving 50,000+ students across 100+ courses with 95% completion rate and 4.8/5 average rating.',
  0,
  'active'
),
(
  'Real Estate CRM',
  'Property management and client relationship system with listing management',
  'A powerful CRM system for real estate professionals to manage properties, clients, and transactions all in one place.',
  'E-Commerce',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/real-estate-crm',
  '',
  NULL,
  '["Vue.js", "Nuxt.js", "Node.js", "MongoDB", "Mapbox", "Twilio"]'::jsonb,
  '["Property listings", "Client management", "Transaction tracking", "Document management", "Email automation", "Map integration"]'::jsonb,
  'Integrating with multiple MLS systems and normalizing property data from different sources was technically challenging.',
  'Adopted by 500+ real estate agents, managing 10,000+ properties, and facilitating $50M+ in transactions.',
  0,
  'active'
),
(
  'Fitness Tracker',
  'Health and wellness monitoring dashboard with workout tracking and nutrition',
  'A comprehensive fitness tracking app with workout logging, nutrition tracking, and progress analytics to help users achieve their health goals.',
  'Healthcare',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
  '["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"]'::jsonb,
  'https://demo.example.com/fitness-tracker',
  'https://github.com/username/fitness-tracker',
  NULL,
  '["React Native", "Expo", "Node.js", "PostgreSQL", "GraphQL", "AWS"]'::jsonb,
  '["Workout logging", "Nutrition tracking", "Progress photos", "Social features", "Custom workout plans", "Wearable integration"]'::jsonb,
  'Integrating with various fitness wearables (Apple Watch, Fitbit, Garmin) required building adapters for each API.',
  'Downloaded 100,000+ times, 4.7/5 rating, and users report 30% improvement in fitness goals achievement.',
  1,
  'active'
);

-- ============================================
-- SAMPLE DATA - ANALYTICS
-- ============================================
INSERT INTO public.analytics (event, data) VALUES
  ('page_view', '{"page": "/", "user_agent": "Mozilla/5.0"}'::jsonb),
  ('project_click', '{"project_id": "123", "project_title": "E-Commerce Dashboard"}'::jsonb),
  ('user_signup', '{"email": "user@example.com", "source": "landing_page"}'::jsonb),
  ('demo_request', '{"project": "Financial Dashboard", "company": "Tech Corp"}'::jsonb);

-- ============================================
-- SAMPLE DATA - SETTINGS
-- ============================================
INSERT INTO public.settings (key, value, description)
SELECT * FROM (VALUES
  ('site_title', '"Portfolio Dashboard"'::jsonb, 'Main site title displayed in header'),
  ('contact_email', '"contact@example.com"'::jsonb, 'Primary contact email address'),
  ('featured_projects_limit', '6'::jsonb, 'Number of featured projects to display on homepage'),
  ('maintenance_mode', 'false'::jsonb, 'Enable/disable maintenance mode'),
  ('social_links', '{"github": "https://github.com/username", "linkedin": "https://linkedin.com/in/username", "twitter": "https://twitter.com/username"}'::jsonb, 'Social media profile links')
) AS v(key, value, description)
WHERE NOT EXISTS (SELECT 1 FROM public.settings WHERE settings.key = v.key);

-- ============================================
-- SAMPLE DATA - USERS (Admin)
-- ============================================
-- Note: In production, use Supabase Auth instead of storing passwords
INSERT INTO public.users (username, password)
SELECT * FROM (VALUES
  ('admin', 'change_me_in_production')
) AS v(username, password)
WHERE NOT EXISTS (SELECT 1 FROM public.users WHERE users.username = v.username);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - OPTIONAL
-- ============================================
-- For development, you can disable RLS:
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;

-- For production, enable RLS and create policies:
/*
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Example: Allow public read access to projects
CREATE POLICY "projects_read" ON public.projects FOR SELECT USING (true);

-- Example: Allow authenticated users to manage projects
CREATE POLICY "projects_write" ON public.projects FOR ALL 
  USING (auth.role() = 'authenticated');

-- Repeat for other tables as needed
*/

-- ============================================
-- FUNCTIONS - Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Apply trigger to settings
DROP TRIGGER IF EXISTS update_settings_updated_at ON public.settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the setup:

-- Check tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check row counts
-- SELECT 'users' as table_name, COUNT(*) as count FROM public.users
-- UNION ALL
-- SELECT 'categories', COUNT(*) FROM public.categories
-- UNION ALL
-- SELECT 'projects', COUNT(*) FROM public.projects
-- UNION ALL
-- SELECT 'analytics', COUNT(*) FROM public.analytics
-- UNION ALL
-- SELECT 'settings', COUNT(*) FROM public.settings;

-- ============================================
-- NOTES
-- ============================================
-- 1. Run this script in Supabase SQL Editor
-- 2. Make sure to expose 'public' schema in API settings
-- 3. For production: enable RLS and create appropriate policies
-- 4. Update sample data with your actual content
-- 5. Change default passwords immediately
-- 6. Consider using Supabase Auth instead of custom users table
