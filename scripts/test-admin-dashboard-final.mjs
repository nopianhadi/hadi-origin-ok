#!/usr/bin/env node

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing Admin Dashboard - Final Check...\n');

async function testAdminDashboardTabs() {
  console.log('📋 Testing Admin Dashboard Tabs Data...\n');
  
  const adminTabs = [
    {
      name: '📊 Statistics Tab',
      query: () => supabase.from('statistics').select('*').order('sort_order'),
      expectedFields: ['label_en', 'label_id', 'value', 'icon', 'color']
    },
    {
      name: '⚡ Features Tab', 
      query: () => supabase.from('features').select('*').order('sort_order'),
      expectedFields: ['title_en', 'title_id', 'description_en', 'icon', 'variant']
    },
    {
      name: '❓ FAQs Tab',
      query: () => supabase.from('faqs').select('*').order('sort_order'),
      expectedFields: ['category_en', 'question_en', 'answer_en']
    },
    {
      name: '🏷️ Technology Categories Tab',
      query: () => supabase.from('technology_categories').select('*').order('sort_order'),
      expectedFields: ['title_en', 'title_id', 'description_en', 'icon']
    },
    {
      name: '💻 Technologies Tab',
      query: () => supabase.from('technologies').select('*, technology_categories(title_en, title_id)').order('name'),
      expectedFields: ['name', 'level', 'color', 'category_id']
    },
    {
      name: '🔄 Process Steps Tab',
      query: () => supabase.from('process_steps').select('*').order('sort_order'),
      expectedFields: ['title_en', 'description_en', 'duration_en', 'icon']
    }
  ];

  let allPassed = true;
  let totalRecords = 0;

  for (const tab of adminTabs) {
    try {
      const { data, error } = await tab.query();
      
      if (error) {
        console.log(`❌ ${tab.name}: ERROR - ${error.message}`);
        allPassed = false;
        continue;
      }

      if (!data || data.length === 0) {
        console.log(`⚠️  ${tab.name}: NO DATA`);
        allPassed = false;
        continue;
      }

      console.log(`✅ ${tab.name}: ${data.length} records`);
      totalRecords += data.length;
      
      // Check if expected fields exist
      const sample = data[0];
      const missingFields = tab.expectedFields.filter(field => !(field in sample));
      
      if (missingFields.length > 0) {
        console.log(`   ⚠️  Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log(`   ✅ All expected fields present`);
      }
      
      // Show sample data for verification
      console.log(`   📋 Sample: ${JSON.stringify(sample, null, 2).substring(0, 200)}...`);
      
    } catch (err) {
      console.log(`❌ ${tab.name}: EXCEPTION - ${err.message}`);
      allPassed = false;
    }
    
    console.log('');
  }

  return { allPassed, totalRecords };
}

async function testHomepageComponents() {
  console.log('🏠 Testing Homepage Components Data...\n');
  
  const components = [
    {
      name: '📊 Statistics Component',
      query: () => supabase.from('statistics').select('*').eq('is_active', true).order('sort_order')
    },
    {
      name: '⚡ Features Component', 
      query: () => supabase.from('features').select('*').eq('is_active', true).order('sort_order')
    },
    {
      name: '❓ FAQ Component',
      query: () => supabase.from('faqs').select('*').eq('is_active', true).order('sort_order')
    },
    {
      name: '💻 Technology Stack Component',
      query: () => supabase.from('technology_categories').select('*').eq('is_active', true).order('sort_order')
    },
    {
      name: '🔄 Process Steps Component',
      query: () => supabase.from('process_steps').select('*').eq('is_active', true).order('sort_order')
    }
  ];

  let allPassed = true;

  for (const component of components) {
    try {
      const { data, error } = await component.query();
      
      if (error) {
        console.log(`❌ ${component.name}: ERROR - ${error.message}`);
        allPassed = false;
      } else {
        console.log(`✅ ${component.name}: ${data?.length || 0} records`);
      }
    } catch (err) {
      console.log(`❌ ${component.name}: EXCEPTION - ${err.message}`);
      allPassed = false;
    }
  }

  return allPassed;
}

async function main() {
  try {
    const adminResult = await testAdminDashboardTabs();
    const homepageResult = await testHomepageComponents();
    
    console.log('\n' + '='.repeat(70));
    console.log('📋 FINAL ADMIN DASHBOARD TEST RESULTS');
    console.log('='.repeat(70));
    
    if (adminResult.allPassed && homepageResult) {
      console.log('🎉 SUCCESS: Admin Dashboard is fully functional!');
      console.log(`📊 Total records available: ${adminResult.totalRecords}`);
      console.log('');
      console.log('✅ All admin tabs should now display data correctly:');
      console.log('   • Statistics Tab - Achievement statistics');
      console.log('   • Features Tab - Service features');
      console.log('   • FAQs Tab - Frequently asked questions');
      console.log('   • Technologies Tab - Technology stack');
      console.log('   • Process Steps Tab - Development process');
      console.log('');
      console.log('✅ Homepage components should also display data:');
      console.log('   • Statistics section');
      console.log('   • Features section');
      console.log('   • FAQ section');
      console.log('   • Technology Stack section');
      console.log('   • Process Steps section');
      console.log('');
      console.log('🌐 Access your application:');
      console.log('   • Homepage: http://localhost:5174/');
      console.log('   • Admin Dashboard: http://localhost:5174/admin');
      console.log('');
      console.log('🔑 Admin Login Credentials:');
      console.log('   • Username: admin');
      console.log('   • Password: admin');
      
    } else {
      console.log('❌ FAILED: Some issues found');
      console.log('');
      console.log('🔧 Troubleshooting:');
      console.log('1. Check browser console for JavaScript errors');
      console.log('2. Verify React Query is working');
      console.log('3. Check network tab for API calls');
      console.log('4. Ensure proper authentication');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

main();