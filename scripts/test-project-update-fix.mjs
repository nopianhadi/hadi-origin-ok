#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testProjectUpdate() {
  console.log('🧪 Testing Project Update Fix...\n');

  try {
    // 1. Get existing project
    console.log('1. Fetching existing project...');
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (fetchError) {
      console.error('❌ Error fetching projects:', fetchError.message);
      return;
    }

    if (!projects || projects.length === 0) {
      console.log('⚠️ No projects found. Creating test project first...');
      
      // Create test project
      const testProject = {
        title: 'Test Project Update',
        description: 'Test project for update functionality',
        full_description: 'This is a test project to verify update functionality works correctly',
        category: 'Web Development',
        image: 'https://via.placeholder.com/400x300',
        images: ['https://via.placeholder.com/400x300'],
        demo_url: 'https://example.com',
        github_url: 'https://github.com/test/test',
        video_url: null,
        tech_stack: ['React', 'TypeScript', 'Tailwind CSS'],
        features: ['Responsive Design', 'Modern UI'],
        challenges: 'Testing update functionality',
        results: 'Successfully created test project',
        featured: 0,
        status: 'active'
      };

      const { data: newProject, error: createError } = await supabase
        .from('projects')
        .insert([testProject])
        .select()
        .single();

      if (createError) {
        console.error('❌ Error creating test project:', createError.message);
        return;
      }

      console.log('✅ Test project created:', newProject.title);
      projects.push(newProject);
    }

    const project = projects[0];
    console.log('✅ Found project:', project.title);

    // 2. Test update with correct field mapping
    console.log('\n2. Testing project update...');
    const updateData = {
      title: project.title + ' (Updated)',
      description: project.description + ' - Updated description',
      full_description: 'Updated full description with more details',
      tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      features: ['Responsive Design', 'Modern UI', 'Fast Performance'],
      updated_at: new Date().toISOString()
    };

    const { data: updatedProject, error: updateError } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', project.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating project:', updateError.message);
      console.error('Error details:', updateError);
      return;
    }

    console.log('✅ Project updated successfully!');
    console.log('Updated title:', updatedProject.title);
    console.log('Updated tech_stack:', updatedProject.tech_stack);

    // 3. Test bulk update
    console.log('\n3. Testing bulk update...');
    const { error: bulkError } = await supabase
      .from('projects')
      .update({ 
        featured: 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', project.id);

    if (bulkError) {
      console.error('❌ Error in bulk update:', bulkError.message);
      return;
    }

    console.log('✅ Bulk update successful!');

    // 4. Verify the updates
    console.log('\n4. Verifying updates...');
    const { data: verifyProject, error: verifyError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', project.id)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying updates:', verifyError.message);
      return;
    }

    console.log('✅ Verification successful!');
    console.log('Final project state:');
    console.log('- Title:', verifyProject.title);
    console.log('- Featured:', verifyProject.featured);
    console.log('- Tech Stack:', verifyProject.tech_stack);
    console.log('- Updated At:', verifyProject.updated_at);

    console.log('\n🎉 All project update tests passed!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testProjectUpdate();