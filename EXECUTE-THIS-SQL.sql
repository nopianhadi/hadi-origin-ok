-- ============================================
-- ENHANCED PROJECT FIELDS IMPLEMENTATION
-- Execute this ENTIRE script in Supabase Dashboard > SQL Editor
-- ============================================

-- Add enhanced fields to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'web' CHECK (project_type IN ('web', 'mobile', 'desktop', 'api', 'other'));
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS team_size TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::JSONB;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_priority TEXT DEFAULT 'medium' CHECK (project_priority IN ('low', 'medium', 'high', 'urgent'));
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS download_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.projects.project_type IS 'Type of project (web, mobile, desktop, api, other)';
COMMENT ON COLUMN public.projects.duration IS 'Project duration estimate (e.g., 3-6 months)';
COMMENT ON COLUMN public.projects.team_size IS 'Team size for the project (e.g., 3-5 people)';
COMMENT ON COLUMN public.projects.client_name IS 'Client or company name';
COMMENT ON COLUMN public.projects.budget IS 'Project budget range (e.g., $10,000 - $50,000)';
COMMENT ON COLUMN public.projects.start_date IS 'Project start date';
COMMENT ON COLUMN public.projects.end_date IS 'Project end date';
COMMENT ON COLUMN public.projects.tags IS 'Project tags array for categorization';
COMMENT ON COLUMN public.projects.project_priority IS 'Project priority level (low, medium, high, urgent)';
COMMENT ON COLUMN public.projects.progress IS 'Project completion percentage (0-100)';
COMMENT ON COLUMN public.projects.download_url IS 'Download URL for project files or resources';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON public.projects (project_type);
CREATE INDEX IF NOT EXISTS idx_projects_project_priority ON public.projects (project_priority);
CREATE INDEX IF NOT EXISTS idx_projects_progress ON public.projects (progress);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON public.projects (start_date);
CREATE INDEX IF NOT EXISTS idx_projects_end_date ON public.projects (end_date);

-- Update existing projects with sample enhanced data
UPDATE public.projects SET 
  project_type = CASE 
    WHEN category ILIKE '%mobile%' THEN 'mobile'
    WHEN category ILIKE '%api%' THEN 'api'
    WHEN category ILIKE '%desktop%' THEN 'desktop'
    ELSE 'web'
  END,
  duration = CASE 
    WHEN featured = 1 THEN '6-12 months'
    ELSE '2-4 months'
  END,
  team_size = CASE 
    WHEN featured = 1 THEN '5-8 people'
    ELSE '2-4 people'
  END,
  client_name = CASE 
    WHEN featured = 1 THEN 'Enterprise Client'
    ELSE 'Internal Project'
  END,
  budget = CASE 
    WHEN featured = 1 THEN 'Rp 100.000.000 - Rp 500.000.000'
    ELSE 'Rp 25.000.000 - Rp 100.000.000'
  END,
  start_date = CURRENT_DATE - INTERVAL '6 months',
  end_date = CURRENT_DATE + INTERVAL '2 months',
  tags = CASE 
    WHEN category = 'E-Commerce' THEN '["ecommerce", "payment", "responsive", "secure"]'::JSONB
    WHEN category = 'Social' THEN '["social", "realtime", "interactive", "mobile-friendly"]'::JSONB
    WHEN category ILIKE '%mobile%' THEN '["mobile", "native", "cross-platform", "performance"]'::JSONB
    ELSE '["web", "responsive", "modern", "scalable"]'::JSONB
  END,
  project_priority = CASE 
    WHEN featured = 1 THEN 'high'
    WHEN priority > 50 THEN 'medium'
    ELSE 'low'
  END,
  progress = CASE 
    WHEN status = 'active' THEN 100
    WHEN status = 'draft' THEN 25
    ELSE 75
  END,
  download_url = demo_url
WHERE project_type IS NULL;

-- Verify the implementation
SELECT 
  id, 
  title, 
  project_type, 
  duration, 
  team_size, 
  client_name,
  project_priority, 
  progress, 
  tags,
  start_date,
  end_date
FROM public.projects 
ORDER BY created_at DESC;