import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🧹 Clear Cache and Test Script');
console.log('================================');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('📋 Current Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCurrentProject() {
  try {
    console.log('\n🔍 Testing current project connection...');
    
    // Test projects table (should work)
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (projectsError) {
      console.error('❌ Projects table error:', projectsError.message);
      return false;
    }
    
    console.log('✅ Projects table accessible:', projects?.length || 0, 'records');
    
    // Now create the missing tables in THIS project
    console.log('\n📊 Creating missing tables in current project...');
    
    await createMissingTablesInCurrentProject();
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

async function createMissingTablesInCurrentProject() {
  console.log('🔨 Creating missing tables...');
  
  // Create statistics table
  const { error: statsInsertError } = await supabase
    .from('statistics')
    .upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        label_en: 'Projects Completed',
        label_id: 'Proyek Selesai',
        value: '50+',
        description_en: 'Successfully delivered projects',
        description_id: 'Proyek yang berhasil diselesaikan',
        icon: 'Briefcase',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        label_en: 'Happy Clients',
        label_id: 'Klien Puas',
        value: '100%',
        description_en: 'Client satisfaction rate',
        description_id: 'Tingkat kepuasan klien',
        icon: 'Users',
        color: 'from-green-500 to-emerald-500',
        sort_order: 2
      }
    ], { onConflict: 'id' });

  if (statsInsertError) {
    console.log('❌ Statistics table not found, need to create schema first');
    console.log('📋 Please run the MANUAL_CREATE_TABLES.sql script in Supabase Dashboard');
    return false;
  } else {
    console.log('✅ Statistics table accessible and populated');
  }

  // Test other tables
  const tables = ['features', 'faqs', 'technology_categories', 'technologies', 'process_steps', 'blog_categories', 'blog_posts'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: accessible`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
  
  return true;
}

console.log('\n🚀 Instructions to Clear Browser Cache:');
console.log('1. Open browser Developer Tools (F12)');
console.log('2. Right-click on refresh button');
console.log('3. Select "Empty Cache and Hard Reload"');
console.log('4. Or go to Application tab > Storage > Clear site data');
console.log('5. Restart your React dev server');

testCurrentProject();