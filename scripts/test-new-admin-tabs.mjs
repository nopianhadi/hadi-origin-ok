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

console.log('🧪 TESTING NEW ADMIN DASHBOARD TABS');
console.log('=====================================');

// Test all new tables that were added to admin
const tablesToTest = [
  'statistics',
  'features', 
  'faqs',
  'technology_categories',
  'technologies',
  'process_steps',
  'blog_categories',
  'blog_posts',
  'pricing_plans',
  'notifications'
];

async function testTable(tableName) {
  try {
    console.log(`\n📊 Testing ${tableName}...`);
    
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .limit(5);

    if (error) {
      console.log(`❌ ${tableName}: ${error.message}`);
      return false;
    }

    console.log(`✅ ${tableName}: ${count} records found`);
    if (data && data.length > 0) {
      console.log(`   Sample: ${JSON.stringify(data[0], null, 2).substring(0, 200)}...`);
    }
    return true;
  } catch (err) {
    console.log(`❌ ${tableName}: ${err.message}`);
    return false;
  }
}

async function main() {
  let successCount = 0;
  let totalTables = tablesToTest.length;

  for (const table of tablesToTest) {
    const success = await testTable(table);
    if (success) successCount++;
  }

  console.log('\n📈 SUMMARY');
  console.log('===========');
  console.log(`✅ Working Tables: ${successCount}/${totalTables}`);
  console.log(`📊 Success Rate: ${Math.round((successCount/totalTables) * 100)}%`);

  if (successCount === totalTables) {
    console.log('\n🎉 ALL NEW ADMIN TABS READY!');
    console.log('✅ All tables are accessible from admin dashboard');
    console.log('✅ New tabs added:');
    console.log('   - Statistik (statistics)');
    console.log('   - Fitur (features)');
    console.log('   - FAQ (faqs)');
    console.log('   - Teknologi (technologies & technology_categories)');
    console.log('   - Proses (process_steps)');
    console.log('   - Blog (blog_posts & blog_categories)');
    console.log('   - Pricing (pricing_plans)');
    console.log('   - Notifikasi (notifications)');
    console.log('\n🚀 Admin dashboard now has comprehensive management for all content types!');
  } else {
    console.log('\n⚠️  Some tables need attention');
    console.log('Check the errors above and ensure all tables are properly created');
  }

  // Test admin dashboard access
  console.log('\n🔐 ADMIN ACCESS INFO');
  console.log('====================');
  console.log('URL: http://localhost:5173/admin');
  console.log('Username: admin');
  console.log('Password: Admin123');
  console.log('\nTotal Admin Tabs Available: 19 tabs');
  console.log('- Dashboard, Proyek, Users, Kategori');
  console.log('- Statistik, Fitur, FAQ, Teknologi');
  console.log('- Proses, Blog, Tim, Testimoni');
  console.log('- Partner, Pricing, Berita, API');
  console.log('- Notifikasi, Analytics, Pengaturan');
}

main().catch(console.error);