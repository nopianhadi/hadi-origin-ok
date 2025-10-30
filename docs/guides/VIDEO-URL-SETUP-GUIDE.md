# Video URL Setup Guide - Fix "Video Penjelasan Segera Hadir"

## 🎯 Problem
Video section shows "Video Penjelasan Segera Hadir" instead of the actual video because the project doesn't have a video URL in the database.

## ✅ Solution Steps

### Step 1: Check Current Project Data
1. Open browser developer tools (F12)
2. Go to project detail page
3. Look for console logs:
   ```
   📦 Project Data: {...}
   🎬 Video URL: null
   🎬 Video URL (snake_case): null
   ```
4. Note the Project ID from the debug info

### Step 2: Add Video URL via Admin Dashboard
1. **Go to Admin Dashboard**
   - Navigate to `/admin`
   - Click on "Detail Proyek" tab

2. **Edit Existing Project**
   - Find the project you want to add video to
   - Click the edit button (pencil icon)

3. **Add Video URL**
   - Go to "Media" tab
   - In "Video URL" field, paste: `https://www.youtube.com/watch?v=j8XdRefF7M8`
   - You should see live preview appear
   - Click "Update Project"

### Step 3: Alternative - Direct Database Update
If admin dashboard doesn't work, run this SQL in Supabase:

```sql
-- Add video_url column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update specific project (replace PROJECT_ID with actual ID)
UPDATE projects 
SET 
  "videoUrl" = 'https://www.youtube.com/embed/j8XdRefF7M8',
  video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE id = 'PROJECT_ID';

-- Or update ALL projects for testing
UPDATE projects 
SET 
  "videoUrl" = 'https://www.youtube.com/embed/j8XdRefF7M8',
  video_url = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE "videoUrl" IS NULL OR "videoUrl" = '';

-- Verify the update
SELECT id, title, "videoUrl", video_url FROM projects;
```

### Step 4: Verify the Fix
1. Refresh the project detail page
2. Check debug info shows:
   ```
   🎬 Video URL: https://www.youtube.com/embed/j8XdRefF7M8
   Has Video: ✅ Yes
   ```
3. Video section should now show the actual video

## 🔧 Troubleshooting

### Issue: Still showing "Segera Hadir"
**Cause**: Database not updated or wrong field name
**Fix**: 
1. Check console logs for actual data
2. Verify database update worked
3. Try both `videoUrl` and `video_url` fields

### Issue: Video not loading
**Cause**: Wrong URL format
**Fix**: 
1. Use embed format: `https://www.youtube.com/embed/VIDEO_ID`
2. Not watch format: `https://www.youtube.com/watch?v=VIDEO_ID`

### Issue: Admin form not saving
**Cause**: Validation error or network issue
**Fix**:
1. Check browser console for errors
2. Verify URL format is correct
3. Try direct database update

## 📝 Current Implementation

### Fallback System
The code now includes a fallback video URL for testing:
```typescript
// Shows video if ANY of these exist:
project.videoUrl || 
(project as any).video_url || 
"https://www.youtube.com/embed/j8XdRefF7M8"  // Fallback
```

### Debug Information
In development mode, you'll see debug info showing:
- Project ID
- Current videoUrl value
- Current video_url value  
- Whether video exists
- Fallback URL being used

## 🎬 Video URLs to Use

### Your Provided Video
```
Original: https://www.youtube.com/watch?v=j8XdRefF7M8
Embed:    https://www.youtube.com/embed/j8XdRefF7M8
```

### Other Example Videos
```
React Tutorial: https://www.youtube.com/embed/SqcY0GlETPk
Web Development: https://www.youtube.com/embed/UB1O30fR-EE
JavaScript Basics: https://www.youtube.com/embed/hdI2bqOjy3c
```

## ✅ Quick Fix Commands

### For Supabase SQL Editor:
```sql
UPDATE projects 
SET "videoUrl" = 'https://www.youtube.com/embed/j8XdRefF7M8'
WHERE id = (SELECT id FROM projects LIMIT 1);
```

### For Admin Dashboard:
1. Go to `/admin`
2. "Detail Proyek" tab
3. Edit any project
4. Media tab → Video URL
5. Paste: `https://www.youtube.com/watch?v=j8XdRefF7M8`
6. Save

The video should now appear instead of "Video Penjelasan Segera Hadir"! 🎉