#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

console.log('🧪 TESTING CRUD FUNCTIONALITY');
console.log('=============================');
console.log(`📍 Supabase URL: ${supabaseUrl}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

// Test CRUD operations for specific tables
const testTables = [
  {
    name: 'statistics',
    testData: {
      label_en: 'Test Statistic',
      label_id: 'Statistik Test',
      value: '999',
      description_en: 'Test description',
      description_id: 'Deskripsi test',
      icon: 'TestIcon',
      color: 'from-test-500 to-test-600',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'features',
    testData: {
      title_en: 'Test Feature',
      title_id: 'Fitur Test',
      description_en: 'Test feature description',
      description_id: 'Deskripsi fitur test',
      details_en: ['Detail 1', 'Detail 2'],
      details_id: ['Detail 1', 'Detail 2'],
      icon: 'TestIcon',
      variant: 'blue',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'faqs',
    testData: {
      category_en: 'Test',
      category_id: 'Test',
      question_en: 'Test question?',
      question_id: 'Pertanyaan test?',
      answer_en: 'Test answer',
      answer_id: 'Jawaban test',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'technology_categories',
    testData: {
      title_en: 'Test Tech Category',
      title_id: 'Kategori Teknologi Test',
      description_en: 'Test tech category description',
      description_id: 'Deskripsi kategori teknologi test',
      icon: 'TestIcon',
      color: 'from-test-500 to-test-600',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'technologies',
    testData: {
      name: 'Test Technology',
      level: 'Intermediate',
      color: 'bg-test-500',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'process_steps',
    testData: {
      title_en: 'Test Process Step',
      title_id: 'Langkah Proses Test',
      description_en: 'Test process description',
      description_id: 'Deskripsi proses test',
      details_en: ['Detail 1', 'Detail 2'],
      details_id: ['Detail 1', 'Detail 2'],
      duration_en: '1 week',
      duration_id: '1 minggu',
      icon: 'TestIcon',
      color: 'from-test-500 to-test-600',
      sort_order: 999,
      is_active: true
    }
  },
  {
    name: 'blog_categories',
    testData: {
      name: 'Test Blog Category',
      slug: 'test-blog-category-' + Date.now(),
      description: 'Test blog category description',
      color: 'bg-test-500',
      post_count: 0,
      is_active: true
    }
  },
  {
    name: 'blog_posts',
    testData: {
      title: 'Test Blog Post',
      slug: 'test-blog-post-' + Date.now(),
      excerpt: 'Test excerpt',
      content: 'Test content',
      image: 'https://example.com/test.jpg',
      category: 'Test',
      tags: ['test'],
      author: 'Test Author',
      read_time: '1 min read',
      is_published: false,
      is_featured: false
    }
  }
];

async function testCRUDOperations(table) {
  console.log(`🔍 Testing ${table.name}:`);
  
  let testRecord = null;
  let crudResults = {
    create: false,
    read: false,
    update: false,
    delete: false
  };

  // Test CREATE
  try {
    const { data, error } = await supabase
      .from(table.name)
      .insert([table.testData])
      .select()
      .single();
    
    if (error) {
      console.log(`  ❌ CREATE: ${error.message}`);
    } else {
      console.log(`  ✅ CREATE: Record created successfully`);
      testRecord = data;
      crudResults.create = true;
    }
  } catch (err) {
    console.log(`  ❌ CREATE: ${err.message}`);
  }

  // Test READ
  try {
    const { data, error } = await supabase
      .from(table.name)
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`  ❌ READ: ${error.message}`);
    } else {
      console.log(`  ✅ READ: ${data?.length || 0} records retrieved`);
      crudResults.read = true;
    }
  } catch (err) {
    console.log(`  ❌ READ: ${err.message}`);
  }

  // Test UPDATE (if we have a test record)
  if (testRecord?.id) {
    try {
      const { error } = await supabase
        .from(table.name)
        .update({ updated_at: new Date().toISOString() })
        .eq('id', testRecord.id);
      
      if (error) {
        console.log(`  ❌ UPDATE: ${error.message}`);
      } else {
        console.log(`  ✅ UPDATE: Record updated successfully`);
        crudResults.update = true;
      }
    } catch (err) {
      console.log(`  ❌ UPDATE: ${err.message}`);
    }

    // Test DELETE
    try {
      const { error } = await supabase
        .from(table.name)
        .delete()
        .eq('id', testRecord.id);
      
      if (error) {
        console.log(`  ❌ DELETE: ${error.message}`);
      } else {
        console.log(`  ✅ DELETE: Record deleted successfully`);
        crudResults.delete = true;
      }
    } catch (err) {
      console.log(`  ❌ DELETE: ${err.message}`);
    }
  } else {
    console.log(`  ⏭️  UPDATE: Skipped (no test record)`);
    console.log(`  ⏭️  DELETE: Skipped (no test record)`);
  }

  const successCount = Object.values(crudResults).filter(Boolean).length;
  const totalCount = Object.values(crudResults).length;
  
  console.log(`  📊 CRUD Success Rate: ${successCount}/${totalCount} (${Math.round((successCount / totalCount) * 100)}%)`);
  console.log('');

  return crudResults;
}

async function runAllTests() {
  console.log('🚀 Starting CRUD functionality tests...\n');
  
  let totalOperations = 0;
  let successfulOperations = 0;
  let tableResults = [];

  for (const table of testTables) {
    const results = await testCRUDOperations(table);
    
    const tableSuccess = Object.values(results).filter(Boolean).length;
    const tableTotal = Object.values(results).length;
    
    totalOperations += tableTotal;
    successfulOperations += tableSuccess;
    
    tableResults.push({
      name: table.name,
      success: tableSuccess,
      total: tableTotal,
      percentage: Math.round((tableSuccess / tableTotal) * 100)
    });
  }

  // Summary
  console.log('📊 CRUD FUNCTIONALITY TEST SUMMARY');
  console.log('==================================');
  console.log(`Total Tables Tested: ${testTables.length}`);
  console.log(`Total Operations: ${totalOperations}`);
  console.log(`Successful Operations: ${successfulOperations}`);
  console.log(`Overall Success Rate: ${Math.round((successfulOperations / totalOperations) * 100)}%`);
  console.log('');

  console.log('📋 Per-Table Results:');
  tableResults.forEach(result => {
    const status = result.percentage === 100 ? '✅' : result.percentage >= 75 ? '⚠️' : '❌';
    console.log(`${status} ${result.name}: ${result.success}/${result.total} (${result.percentage}%)`);
  });

  console.log('');
  
  if (successfulOperations === totalOperations) {
    console.log('🎉 ALL CRUD OPERATIONS WORKING PERFECTLY!');
    console.log('✅ Admin dashboard CRUD functionality is fully operational');
    console.log('✅ All tables support Create, Read, Update, Delete operations');
  } else {
    console.log('⚠️  Some CRUD operations need attention');
    console.log('💡 Check Supabase table permissions and RLS policies');
  }

  console.log('');
  console.log('🌐 Test your admin dashboard at: http://localhost:5174/admin');
  console.log('🔐 Login: admin / Admin123');
}

// Run all tests
runAllTests().catch(console.error);