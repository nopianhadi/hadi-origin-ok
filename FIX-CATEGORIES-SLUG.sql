-- ============================================
-- FIX CATEGORIES SLUG COLUMN
-- Execute this if you get slug constraint error
-- ============================================

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(input_text, '[^a-zA-Z0-9\s-]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '-+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Add missing columns to categories table if they don't exist
DO $$ 
BEGIN
    -- Add slug column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'slug') THEN
        ALTER TABLE public.categories ADD COLUMN slug TEXT;
    END IF;
    
    -- Add other missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'icon') THEN
        ALTER TABLE public.categories ADD COLUMN icon TEXT DEFAULT 'Folder';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'sort_order') THEN
        ALTER TABLE public.categories ADD COLUMN sort_order INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'is_active') THEN
        ALTER TABLE public.categories ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'project_count') THEN
        ALTER TABLE public.categories ADD COLUMN project_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Update existing categories to have slugs
UPDATE public.categories 
SET slug = generate_slug(name) 
WHERE slug IS NULL OR slug = '';

-- Update existing categories with proper values
UPDATE public.categories SET 
    icon = CASE 
        WHEN name = 'E-Commerce' THEN 'ShoppingCart'
        WHEN name = 'Social' THEN 'Users'
        WHEN name = 'Mobile' THEN 'Smartphone'
        WHEN name = 'API' THEN 'Server'
        WHEN name = 'Web' THEN 'Globe'
        ELSE 'Folder'
    END,
    sort_order = CASE 
        WHEN name = 'E-Commerce' THEN 1
        WHEN name = 'Social' THEN 2
        WHEN name = 'Mobile' THEN 3
        WHEN name = 'API' THEN 4
        WHEN name = 'Web' THEN 5
        ELSE 0
    END,
    is_active = true,
    project_count = 0
WHERE icon IS NULL OR sort_order IS NULL;

-- Make slug NOT NULL after updating existing records
ALTER TABLE public.categories ALTER COLUMN slug SET NOT NULL;

-- Add unique constraint on slug
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_slug_unique;
ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories (is_active);

-- Verify the fix
SELECT 
    id, 
    name, 
    slug, 
    icon, 
    sort_order, 
    is_active,
    color
FROM public.categories 
ORDER BY sort_order;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Categories table has been fixed successfully!';
    RAISE NOTICE '✅ All categories now have proper slug values';
    RAISE NOTICE '✅ Additional columns have been added';
    RAISE NOTICE '✅ Constraints and indexes have been created';
END $$;