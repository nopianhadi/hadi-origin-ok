-- ============================================
-- ADD ENHANCED PROJECT FIELDS
-- Fields yang diperlukan oleh ProjectDetailManager
-- ============================================

-- Enhanced fields for ProjectDetailManager
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

-- Comments for enhanced fields
COMMENT ON COLUMN public.projects.project_type IS 'Type of project (web, mobile, desktop, api, other)';
COMMENT ON COLUMN public.projects.duration IS 'Project duration estimate';
COMMENT ON COLUMN public.projects.team_size IS 'Team size for the project';
COMMENT ON COLUMN public.projects.client_name IS 'Client or company name';
COMMENT ON COLUMN public.projects.budget IS 'Project budget range';
COMMENT ON COLUMN public.projects.start_date IS 'Project start date';
COMMENT ON COLUMN public.projects.end_date IS 'Project end date';
COMMENT ON COLUMN public.projects.tags IS 'Project tags array';
COMMENT ON COLUMN public.projects.project_priority IS 'Project priority level';
COMMENT ON COLUMN public.projects.progress IS 'Project completion percentage (0-100)';
COMMENT ON COLUMN public.projects.download_url IS 'Download URL for project files';

-- Update existing projects with default values
UPDATE public.projects SET 
  project_type = 'web',
  project_priority = 'medium',
  progress = 0,
  tags = '[]'::JSONB
WHERE project_type IS NULL OR project_priority IS NULL OR progress IS NULL OR tags IS NULL;

-- Add indexes for new fields
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON public.projects (project_type);
CREATE INDEX IF NOT EXISTS idx_projects_project_priority ON public.projects (project_priority);
CREATE INDEX IF NOT EXISTS idx_projects_progress ON public.projects (progress);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON public.projects (start_date);
CREATE INDEX IF NOT EXISTS idx_projects_end_date ON public.projects (end_date);

-- Update sample data with enhanced fields
UPDATE public.projects SET
  project_type = 'web',
  duration = '3-6 months',
  team_size = '3-5 people',
  client_name = 'Internal Project',
  budget = 'Rp 50.000.000 - Rp 100.000.000',
  start_date = '2024-01-01',
  end_date = '2024-06-30',
  tags = '["responsive", "modern", "scalable"]'::JSONB,
  project_priority = 'high',
  progress = 95,
  download_url = demo_url
WHERE id = (SELECT id FROM public.projects LIMIT 1);

-- Update other projects with varied data
UPDATE public.projects SET
  project_type = CASE 
    WHEN category = 'Mobile App' THEN 'mobile'
    WHEN category = 'API' THEN 'api'
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
  project_priority = CASE 
    WHEN featured = 1 THEN 'high'
    ELSE 'medium'
  END,
  progress = CASE 
    WHEN status = 'active' THEN 100
    WHEN status = 'draft' THEN 25
    ELSE 75
  END,
  tags = CASE 
    WHEN category = 'E-Commerce' THEN '["ecommerce", "payment", "responsive"]'::JSONB
    WHEN category = 'Social' THEN '["social", "realtime", "interactive"]'::JSONB
    WHEN category = 'Mobile App' THEN '["mobile", "native", "cross-platform"]'::JSONB
    ELSE '["web", "responsive", "modern"]'::JSONB
  END
WHERE project_type IS NULL;

-- Verify the changes
SELECT 
  id, 
  title, 
  project_type, 
  duration, 
  team_size, 
  project_priority, 
  progress, 
  tags
FROM public.projects 
ORDER BY created_at DESC;