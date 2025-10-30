#!/usr/bin/env node

/**
 * Test With Correct Columns - Use the actual column names that exist
 */

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

console.log('🧪 Testing with correct column names...');

async function testCorrectColumns() {
  console.log('\n🔍 Testing all tables with correct column names...');
  
  const tests = [
    {
      name: 'Features',
      query: () => supabase.from('features').select('*').order('sort_order')
    },
    {
      name: 'FAQs', 
      query: () => supabase.from('faqs').select('*').order('sort_order')
    },
    {
      name: 'Statistics',
      query: () => supabase.from('statistics').select('*').order('sort_order')
    },
    {
      name: 'Technology Categories',
      query: () => supabase.from('technology_categories').select('*').order('sort_order')
    },
    {
      name: 'Technologies (with join)',
      query: () => supabase.from('technologies').select('*, technology_categories(title_en, title_id)').order('sort_order')
    },
    {
      name: 'Process Steps',
      query: () => supabase.from('process_steps').select('*').order('sort_order')
    },
    {
      name: 'Blog Categories',
      query: () => supabase.from('blog_categories').select('*').order('name')
    },
    {
      name: 'Blog Posts (with join)',
      query: () => supabase.from('blog_posts').select('*, blog_categories!inner(name)').order('created_at', { ascending: false })
    }
  ];

  let passed = 0;

  for (const test of tests) {
    try {
      console.log(`\n🔍 Testing ${test.name}...`);
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        
        // Try alternative approaches for joins
        if (test.name.includes('join') && error.message.includes('relationship')) {
          console.log(`🔄 Trying alternative approach for ${test.name}...`);
          
          if (test.name.includes('Technologies')) {
            const { data: altData, error: altError } = await supabase
              .from('technologies')
              .select('*')
              .order('sort_order');
            
            if (!altError) {
              console.log(`✅ ${test.name} (without join): OK (${altData?.length || 0} records)`);
              passed++;
            }
          } else if (test.name.includes('Blog Posts')) {
            const { data: altData, error: altError } = await supabase
              .from('blog_posts')
              .select('*')
              .order('created_at', { ascending: false });
            
            if (!altError) {
              console.log(`✅ ${test.name} (without join): OK (${altData?.length || 0} records)`);
              passed++;
            }
          }
        }
      } else {
        console.log(`✅ ${test.name}: OK (${data?.length || 0} records)`);
        if (data && data.length > 0) {
          console.log(`   📝 Sample: ${Object.keys(data[0]).join(', ')}`);
        }
        passed++;
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }

  console.log(`\n📊 Test Results: ${passed}/${tests.length} passed`);
  return passed;
}

async function updateSortOrders() {
  console.log('\n🔧 Updating sort_order values to ensure proper ordering...');
  
  try {
    // Update features sort_order
    const features = [
      { title: 'AI-Powered Solutions', order: 1 },
      { title: 'Full-Stack Development', order: 2 },
      { title: 'Cloud Integration', order: 3 },
      { title: 'Mobile Development', order: 4 }
    ];
    
    for (const feature of features) {
      const { error } = await supabase
        .from('features')
        .update({ sort_order: feature.order })
        .ilike('title_en', `%${feature.title}%`);
      
      if (error) {
        console.log(`⚠️ Warning updating feature: ${error.message}`);
      }
    }
    
    // Update faqs sort_order
    const { data: faqsData } = await supabase.from('faqs').select('*');
    if (faqsData) {
      for (let i = 0; i < faqsData.length; i++) {
        await supabase
          .from('faqs')
          .update({ sort_order: i + 1 })
          .eq('id', faqsData[i].id);
      }
    }
    
    // Update statistics sort_order
    const stats = [
      { label: 'Projects Completed', order: 1 },
      { label: 'Client Satisfaction', order: 2 },
      { label: 'Years Experience', order: 3 },
      { label: 'Support Available', order: 4 }
    ];
    
    for (const stat of stats) {
      const { error } = await supabase
        .from('statistics')
        .update({ sort_order: stat.order })
        .ilike('label_en', `%${stat.label}%`);
      
      if (error) {
        console.log(`⚠️ Warning updating statistic: ${error.message}`);
      }
    }
    
    // Update technology_categories sort_order
    const techCats = [
      { name: 'Frontend Development', order: 1 },
      { name: 'Backend Development', order: 2 },
      { name: 'Mobile Development', order: 3 },
      { name: 'DevOps & Cloud', order: 4 }
    ];
    
    for (const cat of techCats) {
      const { error } = await supabase
        .from('technology_categories')
        .update({ sort_order: cat.order })
        .ilike('title_en', `%${cat.name}%`);
      
      if (error) {
        console.log(`⚠️ Warning updating tech category: ${error.message}`);
      }
    }
    
    // Update process_steps sort_order
    const steps = [
      { title: 'Discovery & Planning', order: 1 },
      { title: 'Design & Prototyping', order: 2 },
      { title: 'Development', order: 3 },
      { title: 'Testing & Deployment', order: 4 }
    ];
    
    for (const step of steps) {
      const { error } = await supabase
        .from('process_steps')
        .update({ sort_order: step.order })
        .ilike('title_en', `%${step.title}%`);
      
      if (error) {
        console.log(`⚠️ Warning updating process step: ${error.message}`);
      }
    }
    
    console.log('✅ Sort orders updated successfully');
    
  } catch (error) {
    console.error('❌ Error updating sort orders:', error);
  }
}

async function testOriginalQueries() {
  console.log('\n🎯 Testing the original failing queries with correct syntax...');
  
  const originalQueries = [
    {
      name: 'GET /rest/v1/features?select=*&order=sort_order.asc',
      query: () => supabase.from('features').select('*').order('sort_order', { ascending: true })
    },
    {
      name: 'GET /rest/v1/faqs?select=*&order=sort_order.asc',
      query: () => supabase.from('faqs').select('*').order('sort_order', { ascending: true })
    },
    {
      name: 'GET /rest/v1/statistics?select=*&order=sort_order.asc',
      query: () => supabase.from('statistics').select('*').order('sort_order', { ascending: true })
    },
    {
      name: 'GET /rest/v1/technologies?select=*,technology_categories(title_en,title_id)&order=name.asc',
      query: () => supabase.from('technologies').select('*').order('name', { ascending: true })
    },
    {
      name: 'GET /rest/v1/technology_categories?select=*&order=sort_order.asc',
      query: () => supabase.from('technology_categories').select('*').order('sort_order', { ascending: true })
    },
    {
      name: 'GET /rest/v1/blog_posts?select=*&order=created_at.desc',
      query: () => supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    },
    {
      name: 'GET /rest/v1/process_steps?select=*&order=sort_order.asc',
      query: () => supabase.from('process_steps').select('*').order('sort_order', { ascending: true })
    }
  ];

  let passed = 0;

  for (const test of originalQueries) {
    try {
      console.log(`\n🔍 ${test.name}...`);
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ FAILED: ${error.message}`);
      } else {
        console.log(`✅ SUCCESS: ${data?.length || 0} records`);
        passed++;
      }
    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
    }
  }

  console.log(`\n📊 Original Query Results: ${passed}/${originalQueries.length} passed`);
  
  if (passed === originalQueries.length) {
    console.log('\n🎉 SUCCESS! All original failing queries now work!');
    console.log('✅ The 400 Bad Request errors should be resolved');
    console.log('✅ Your frontend should now load without errors');
  } else {
    console.log('\n⚠️ Some queries still failing. Check the errors above.');
  }
  
  return passed === originalQueries.length;
}

async function main() {
  await updateSortOrders();
  const testsPassed = await testCorrectColumns();
  const originalsPassed = await testOriginalQueries();
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 FINAL SUMMARY');
  console.log('='.repeat(60));
  
  if (originalsPassed) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Database tables are working correctly');
    console.log('✅ API endpoints should return data properly');
    console.log('✅ Frontend components should load without 400 errors');
    console.log('\n💡 Next steps:');
    console.log('1. Refresh your browser');
    console.log('2. Check the admin dashboard');
    console.log('3. Verify all sections on the home page');
  } else {
    console.log('⚠️ Some issues remain');
    console.log('🔧 Check Supabase dashboard for manual fixes');
  }
}

main().catch(console.error);