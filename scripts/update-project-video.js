// Script to update project with video URL
// Run this in your database or through your admin interface

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProjectVideo() {
  try {
    // Get all projects first
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, title, videoUrl, video_url');
    
    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      return;
    }
    
    console.log('Found projects:', projects);
    
    // Update the first project with video URL
    if (projects && projects.length > 0) {
      const projectId = projects[0].id;
      
      const { data, error } = await supabase
        .from('projects')
        .update({ 
          videoUrl: 'https://www.youtube.com/embed/j8XdRefF7M8',
          video_url: 'https://www.youtube.com/embed/j8XdRefF7M8' // Also update snake_case version
        })
        .eq('id', projectId)
        .select();
      
      if (error) {
        console.error('Error updating project:', error);
      } else {
        console.log('Successfully updated project:', data);
      }
    }
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

// Alternative: Direct SQL update
console.log(`
-- Run this SQL in your Supabase SQL editor:

-- Add video_url column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update all projects with the video URL
UPDATE projects 
SET 
  "videoUrl" = 'https://www.youtube.com/embed/j8XdRefF7M8',
  video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE id IS NOT NULL;

-- Verify the update
SELECT id, title, "videoUrl", video_url FROM projects LIMIT 5;
`);

// Run the function if you have Supabase credentials
// updateProjectVideo();