-- Add video_url column to projects table if not exists
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update existing projects with sample video URL
-- You can replace this with actual video URLs for each project

-- Example: Add the YouTube video URL you provided to a specific project
-- Replace 'PROJECT_ID' with the actual project ID you want to update
UPDATE projects 
SET video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE id = 1; -- Replace with actual project ID

-- Or update all projects with the same video for testing
UPDATE projects 
SET video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE video_url IS NULL OR video_url = '';

-- Verify the update
SELECT id, title, video_url FROM projects WHERE video_url IS NOT NULL;

-- Alternative: Update specific project by title
-- UPDATE projects 
-- SET video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
-- WHERE title LIKE '%Your Project Title%';

-- For multiple different videos, you can do:
-- UPDATE projects SET video_url = 'https://www.youtube.com/embed/VIDEO_ID_1' WHERE id = 1;
-- UPDATE projects SET video_url = 'https://www.youtube.com/embed/VIDEO_ID_2' WHERE id = 2;
-- UPDATE projects SET video_url = 'https://www.youtube.com/embed/VIDEO_ID_3' WHERE id = 3;