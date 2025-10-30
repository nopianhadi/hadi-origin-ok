#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
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

console.log('🚀 EXECUTING ENHANCED PROJECT FIELDS');
console.log('====================================');

async function executeSqlFile() {
  try {
    console.log('📖 Reading SQL file...');
    const sqlContent = readFileSync('database/sqldatabseterbaru/add_enhanced_project_fields.sql', 'utf8');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.includes('ALTER TABLE') || statement.includes('COMMENT ON') || statement.includes('UPDATE') || statement.includes('CREATE INDEX')) {
        try {
          console.log(`\n📋 Executing statement ${i + 1}/${statements.length}...`);
          console.log(`   ${statement.substring(0, 80)}...`);
          
          // For ALTER TABLE and other DDL statements, we need to use a different approach
          // Since Supabase doesn't allow direct DDL execution via the client
          
          if (statement.includes('ALTER TABLE')) {
            console.log('   ⚠️  DDL statement - needs manual execution in Supabase Dashboard');
          } else {
            // Try to execute non-DDL statements
            const { error } = await supabase.rpc('exec_sql', { sql: statement });
            
            if (error) {
              console.log(`   ❌ Error: ${error.message}`);
              errorCount++;
            } else {
              console.log('   ✅ Success');
              successCount++;
            }
          }
        } catch (err) {
          console.log(`   ❌ Error: ${err.message}`);
          errorCount++;
        }
      }
    }
    
    console.log(`\n📊 Execution Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    
  } catch (err) {
    console.log(`❌ Error reading SQL file: ${err.message}`);
  }
}

async function testEnhancedFields() {
  try {
    console.log('\n🔍 Testing enhanced fields after execution...');
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    if (projects && projects.length > 0) {
      const project = projects[0];
      
      const enhancedFields = [
        'project_type', 'duration', 'team_size', 'client_name', 
        'budget', 'start_date', 'end_date', 'tags', 
        'project_priority', 'progress', 'download_url'
      ];
      
      console.log('\n📊 Enhanced fields status:');
      let availableCount = 0;
      
      enhancedFields.forEach(field => {
        if (project.hasOwnProperty(field)) {
          console.log(`   ✅ ${field}: Available`);
          availableCount++;
        } else {
          console.log(`   ❌ ${field}: Missing`);
        }
      });
      
      console.log(`\n📈 Enhanced fields availability: ${availableCount}/${enhancedFields.length} (${Math.round((availableCount/enhancedFields.length) * 100)}%)`);
      
      if (availableCount === enhancedFields.length) {
        console.log('\n🎉 ALL ENHANCED FIELDS AVAILABLE!');
        console.log('✅ ProjectDetailManager will work with full functionality');
      } else {
        console.log('\n⚠️  Some enhanced fields are missing');
        console.log('Manual execution in Supabase Dashboard may be required');
      }
    }
    
  } catch (err) {
    console.log(`❌ Error testing enhanced fields: ${err.message}`);
  }
}

async function showManualInstructions() {
  console.log('\n📋 MANUAL EXECUTION INSTRUCTIONS');
  console.log('=================================');
  console.log('Since Supabase client doesn\'t support DDL operations,');
  console.log('please execute the following in Supabase Dashboard > SQL Editor:');
  console.log('');
  console.log('1. Go to: https://supabase.com/dashboard/project/[your-project]/sql');
  console.log('2. Copy and paste the content from:');
  console.log('   database/sqldatabseterbaru/add_enhanced_project_fields.sql');
  console.log('3. Click "Run" to execute all statements');
  console.log('');
  console.log('🎯 This will add all enhanced fields needed for ProjectDetailManager:');
  console.log('   - project_type (web, mobile, desktop, api, other)');
  console.log('   - duration (project timeline)');
  console.log('   - team_size (team information)');
  console.log('   - client_name (client details)');
  console.log('   - budget (budget range)');
  console.log('   - start_date & end_date (project dates)');
  console.log('   - tags (project tags array)');
  console.log('   - project_priority (low, medium, high, urgent)');
  console.log('   - progress (0-100 percentage)');
  console.log('   - download_url (download links)');
}

async function main() {
  await executeSqlFile();
  await testEnhancedFields();
  await showManualInstructions();
  
  console.log('\n🔐 ACCESS INFO AFTER COMPLETION:');
  console.log('================================');
  console.log('URL: http://localhost:5173/admin');
  console.log('Tab: Detail Proyek');
  console.log('Features: Full ProjectDetailManager with all enhanced fields');
  console.log('');
  console.log('🎨 Enhanced Features Available:');
  console.log('- Multi-tab form interface (Basic, Media, Tech, Content, Meta)');
  console.log('- Project type selection');
  console.log('- Timeline management (duration, start/end dates)');
  console.log('- Team information (size, client details)');
  console.log('- Budget tracking');
  console.log('- Priority levels');
  console.log('- Progress tracking (0-100%)');
  console.log('- Tags system');
  console.log('- Video integration with YouTube embed');
  console.log('- Multiple images management');
  console.log('- Technology stack with badges');
  console.log('- Features checklist');
  console.log('- Real-time preview');
}

main().catch(console.error);