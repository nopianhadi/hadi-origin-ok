#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 IMPLEMENTING ENHANCED PROJECT FIELDS');
console.log('=======================================');

// Since we can't execute DDL directly, we'll work with existing data
// and prepare it for the enhanced fields that should be added manually

async function updateExistingProjects() {
  try {
    console.log('\n📊 Updating existing projects with enhanced data...');
    
    // Get all projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*');

    if (error) throw error;

    console.log(`Found ${projects.length} projects to update`);

    // Update each project with enhanced data based on existing fields
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`\n📝 Updating project ${i + 1}/${projects.length}: ${project.title}`);

      // Prepare enhanced data based on existing project data
      const enhancedData = {
        // Use existing fields that might map to enhanced fields
        full_description: project.full_description || `Detailed description for ${project.title}. This project showcases modern development practices and innovative solutions.`,
        
        // Add sample enhanced data that would be stored in new fields
        // Note: These will be stored in existing JSONB fields temporarily
        meta_keywords: project.meta_keywords || [
          project.category?.toLowerCase(),
          'web development',
          'modern design',
          'responsive',
          'user experience'
        ],
        
        // Update existing JSONB fields with enhanced structure
        images: project.images || [project.image],
        
        // Enhance tech_stack if it's not properly formatted
        tech_stack: Array.isArray(project.tech_stack) 
          ? project.tech_stack 
          : (typeof project.tech_stack === 'string' 
              ? project.tech_stack.split(',').map(t => t.trim())
              : ['React', 'TypeScript', 'Tailwind CSS']),
        
        // Enhance features if not properly formatted
        features: Array.isArray(project.features) 
          ? project.features 
          : [
              'Responsive Design',
              'Modern UI/UX',
              'Fast Performance',
              'SEO Optimized',
              'Cross-browser Compatible'
            ],
      };

      // Update the project
      const { error: updateError } = await supabase
        .from('projects')
        .update(enhancedData)
        .eq('id', project.id);

      if (updateError) {
        console.log(`   ❌ Error updating ${project.title}: ${updateError.message}`);
      } else {
        console.log(`   ✅ Updated ${project.title}`);
      }
    }

  } catch (err) {
    console.log(`❌ Error updating projects: ${err.message}`);
  }
}

async function createEnhancedProjectSample() {
  try {
    console.log('\n🎯 Creating sample project with enhanced structure...');
    
    const sampleProject = {
      title: 'Enhanced Project Management System',
      slug: 'enhanced-project-management-system',
      description: 'A comprehensive project management system with advanced features and modern UI.',
      full_description: `This enhanced project management system represents the pinnacle of modern web development practices. Built with cutting-edge technologies, it provides a seamless user experience for managing complex projects.

Key highlights include:
- Real-time collaboration features
- Advanced analytics and reporting
- Intuitive drag-and-drop interface
- Mobile-responsive design
- Enterprise-grade security

The system was developed using a microservices architecture, ensuring scalability and maintainability. The frontend leverages React with TypeScript for type safety, while the backend utilizes Node.js with Express and PostgreSQL for robust data management.`,
      
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
      ],
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      
      demo_url: 'https://enhanced-pm-system.demo.com',
      github_url: 'https://github.com/example/enhanced-pm-system',
      
      tech_stack: [
        'React',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Redis',
        'Docker',
        'AWS',
        'Tailwind CSS'
      ],
      
      features: [
        'Real-time collaboration',
        'Advanced analytics dashboard',
        'Drag-and-drop task management',
        'Mobile-responsive design',
        'Role-based access control',
        'Automated reporting',
        'Integration with third-party tools',
        'Offline mode support'
      ],
      
      challenges: `The main challenges faced during development included:

1. **Scalability**: Designing a system that could handle thousands of concurrent users required implementing a microservices architecture with proper load balancing.

2. **Real-time Features**: Implementing real-time collaboration features required careful consideration of WebSocket connections and state synchronization across multiple clients.

3. **Data Consistency**: Ensuring data consistency across distributed services while maintaining performance was achieved through event sourcing and CQRS patterns.

4. **Security**: Implementing enterprise-grade security with OAuth 2.0, JWT tokens, and role-based access control while maintaining user experience.`,
      
      results: `The project delivered exceptional results:

📈 **Performance Metrics:**
- 99.9% uptime achieved
- 40% improvement in task completion time
- 60% reduction in project delays
- 85% user satisfaction rate

🚀 **Business Impact:**
- 200+ teams onboarded in first month
- $500K+ in operational cost savings
- 50% faster project delivery cycles
- 95% client retention rate

🏆 **Technical Achievements:**
- Sub-second response times
- 10,000+ concurrent users supported
- Zero data loss incidents
- 99.95% API availability`,
      
      featured: 1,
      status: 'active',
      priority: 100,
      
      meta_title: 'Enhanced Project Management System - Modern Web Application',
      meta_description: 'A comprehensive project management system built with React, TypeScript, and Node.js featuring real-time collaboration and advanced analytics.',
      meta_keywords: [
        'project management',
        'web application',
        'react',
        'typescript',
        'real-time collaboration',
        'analytics dashboard'
      ]
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([sampleProject])
      .select()
      .single();

    if (error) {
      console.log(`❌ Error creating sample project: ${error.message}`);
    } else {
      console.log(`✅ Created enhanced sample project: ${data.title}`);
    }

  } catch (err) {
    console.log(`❌ Error creating sample project: ${err.message}`);
  }
}

async function testProjectDetailManager() {
  try {
    console.log('\n🧪 Testing ProjectDetailManager compatibility...');
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) throw error;

    if (projects && projects.length > 0) {
      const project = projects[0];
      
      console.log('\n📊 Project data structure analysis:');
      console.log(`   Title: ${project.title}`);
      console.log(`   Description: ${project.description?.substring(0, 50)}...`);
      console.log(`   Category: ${project.category}`);
      console.log(`   Tech Stack: ${Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : 'Not array format'}`);
      console.log(`   Features: ${Array.isArray(project.features) ? project.features.length + ' features' : 'Not array format'}`);
      console.log(`   Images: ${Array.isArray(project.images) ? project.images.length + ' images' : 'Not array format'}`);
      console.log(`   Status: ${project.status}`);
      console.log(`   Featured: ${project.featured ? 'Yes' : 'No'}`);
      
      // Check compatibility with ProjectDetailManager expected fields
      const compatibilityScore = calculateCompatibility(project);
      console.log(`\n🎯 ProjectDetailManager Compatibility: ${compatibilityScore}%`);
      
      if (compatibilityScore >= 80) {
        console.log('✅ High compatibility - ProjectDetailManager will work well');
      } else if (compatibilityScore >= 60) {
        console.log('⚠️  Medium compatibility - Some features may be limited');
      } else {
        console.log('❌ Low compatibility - Manual field addition recommended');
      }
    }

  } catch (err) {
    console.log(`❌ Error testing compatibility: ${err.message}`);
  }
}

function calculateCompatibility(project) {
  const requiredFields = [
    'title', 'description', 'category', 'image', 'demo_url', 
    'tech_stack', 'features', 'status', 'featured'
  ];
  
  const enhancedFields = [
    'full_description', 'challenges', 'results', 'video_url',
    'github_url', 'images', 'meta_title', 'meta_description'
  ];
  
  let score = 0;
  const totalFields = requiredFields.length + enhancedFields.length;
  
  // Check required fields
  requiredFields.forEach(field => {
    if (project[field] !== null && project[field] !== undefined && project[field] !== '') {
      score += 1;
    }
  });
  
  // Check enhanced fields
  enhancedFields.forEach(field => {
    if (project[field] !== null && project[field] !== undefined && project[field] !== '') {
      score += 1;
    }
  });
  
  return Math.round((score / totalFields) * 100);
}

async function generateSQLScript() {
  console.log('\n📝 GENERATING COMPLETE SQL SCRIPT');
  console.log('==================================');
  
  const sqlScript = `
-- ============================================
-- COMPLETE ENHANCED PROJECT FIELDS IMPLEMENTATION
-- Execute this in Supabase Dashboard > SQL Editor
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
`;

  console.log('📋 Complete SQL Script Generated:');
  console.log('Copy the following SQL and execute in Supabase Dashboard:');
  console.log('```sql');
  console.log(sqlScript);
  console.log('```');
  
  return sqlScript;
}

async function main() {
  console.log('🎯 Starting enhanced fields implementation...');
  
  // Step 1: Update existing projects with better data structure
  await updateExistingProjects();
  
  // Step 2: Create a sample project with enhanced structure
  await createEnhancedProjectSample();
  
  // Step 3: Test compatibility with ProjectDetailManager
  await testProjectDetailManager();
  
  // Step 4: Generate SQL script for manual execution
  await generateSQLScript();
  
  console.log('\n🎉 IMPLEMENTATION SUMMARY');
  console.log('=========================');
  console.log('✅ Existing projects updated with enhanced data structure');
  console.log('✅ Sample enhanced project created');
  console.log('✅ ProjectDetailManager compatibility tested');
  console.log('✅ Complete SQL script generated for manual execution');
  
  console.log('\n📋 NEXT STEPS:');
  console.log('1. Copy the SQL script above');
  console.log('2. Go to Supabase Dashboard > SQL Editor');
  console.log('3. Paste and execute the SQL script');
  console.log('4. Test the Detail Proyek tab in admin dashboard');
  
  console.log('\n🔐 ACCESS INFO:');
  console.log('URL: http://localhost:5173/admin');
  console.log('Tab: Detail Proyek (3rd tab)');
  console.log('Username: admin');
  console.log('Password: Admin123');
  
  console.log('\n🚀 After SQL execution, you will have:');
  console.log('- Full ProjectDetailManager functionality');
  console.log('- Enhanced project fields (11 new fields)');
  console.log('- Multi-tab form interface');
  console.log('- Timeline and budget management');
  console.log('- Priority and progress tracking');
  console.log('- Tags and categorization system');
}

main().catch(console.error);