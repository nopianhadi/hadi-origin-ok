-- Add download_url column to projects table
-- This allows projects to have downloadable app links

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS download_url TEXT;

-- Add comment to document the column
COMMENT ON COLUMN projects.download_url IS 'URL for downloading the project app (APK, IPA, executable, etc.)';

-- Optional: Add some example data
-- UPDATE projects SET download_url = 'https://example.com/download/app.apk' WHERE title = 'Your Project Name';
