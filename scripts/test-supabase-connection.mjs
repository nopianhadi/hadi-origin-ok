import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Testing Supabase Connection...');
console.log('URL from .env:', process.env.VITE_SUPABASE_URL);
console.log('Key from .env:', process.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');

// Test with current .env settings
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📊 Testing basic connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection error:', error.message);
      return false;
    }
    
    console.log('✅ Basic connection successful');
    console.log('Projects table accessible:', data?.length || 0, 'records');
    
    // Test missing tables
    console.log('\n🔍 Testing missing tables...');
    
    const tables = [
      'statistics',
      'features', 
      'faqs',
      'technology_categories',
      'technologies',
      'process_steps',
      'blog_categories',
      'blog_posts'
    ];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: ${data?.length || 0} records accessible`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Test with the URL from error logs
async function testWithErrorUrl() {
  console.log('\n🔄 Testing with URL from error logs...');
  
  const errorUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
  
  // We need to find the correct anon key for this project
  console.log('Error URL:', errorUrl);
  console.log('⚠️  You need to get the correct ANON_KEY for this project from Supabase Dashboard');
  console.log('📍 Go to: https://supabase.com/dashboard/project/itlvitaupqjuckvwkpkf/settings/api');
}

testConnection().then(success => {
  if (!success) {
    testWithErrorUrl();
  }
});