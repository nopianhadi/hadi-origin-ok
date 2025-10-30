import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🧹 FORCE CLEAR CACHE AND FIX CONNECTION');
console.log('=====================================');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('📋 Current .env Configuration:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 30)}...` : 'Missing');

console.log('\n🔍 Testing connection with current .env...');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful! Projects:', data?.length || 0);
    
    // Test missing tables
    const tables = ['statistics', 'features', 'faqs', 'technology_categories', 'technologies', 'process_steps', 'blog_categories', 'blog_posts'];
    
    console.log('\n📊 Testing missing tables...');
    let allTablesExist = true;
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
          allTablesExist = false;
        } else {
          console.log(`✅ ${table}: ${data?.length || 0} records`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
        allTablesExist = false;
      }
    }
    
    if (allTablesExist) {
      console.log('\n🎉 ALL TABLES EXIST! The problem is browser cache.');
      console.log('\n🔧 FORCE CLEAR BROWSER CACHE:');
      console.log('1. Close ALL browser tabs');
      console.log('2. Open browser settings');
      console.log('3. Clear ALL browsing data (cookies, cache, everything)');
      console.log('4. Or use Incognito/Private mode');
      console.log('5. Restart React dev server completely');
      console.log('\n💡 Alternative: Try different browser or incognito mode');
    } else {
      console.log('\n❌ Some tables missing. Need to create them first.');
    }
    
    return allTablesExist;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

console.log('\n🚨 CRITICAL STEPS TO FIX:');
console.log('========================');
console.log('1. STOP React dev server (Ctrl+C)');
console.log('2. DELETE node_modules/.cache (if exists)');
console.log('3. CLEAR browser cache completely');
console.log('4. START React dev server: npm run dev');
console.log('5. Open in INCOGNITO mode first');
console.log('\n🔄 Running connection test...');

testConnection();