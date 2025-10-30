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

console.log('🔍 VERIFYING COMPLETE CRUD FIX');
console.log('===============================');
console.log(`📍 Supabase URL: ${supabaseUrl}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

// Test data for each entity
const testData = {
  projects: {
    title: `Test Project ${Date.now()}`,
    description: 'Test description for CRUD verification',
    category: 'Web Development',
    status: 'active',
    featured: 0,
    tech_stack: ['React', 'Node.js']
  },
  users: {
    username: `test_user_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    role: 'user',
    status: 'active'
  },
  categories: {
    name: `Test Category ${Date.now()}`,
    description: 'Test category for CRUD verification',
    color: '#FF0000',
    icon: 'test-icon'
  },
  team_members: {
    name: `Test Member ${Date.now()}`,
    role: 'Test Role',
    bio: 'Test bio for team member',
    status: 'active',
    display_order: 999,
    expertise: ['React', 'Node.js']
  },
  testimonials: {
    name: `Test Client ${Date.now()}`,
    role: 'CEO',
    company: 'Test Company',
    text: 'This is a test testimonial for CRUD verification.',
    rating: 5,
    status: 'active',
    display_order: 999
  },
  partners: {
    name: `Test Partner ${Date.now()}`,
    description: 'Test partner description',
    website: 'https://example.com',
    status: 'active',
    display_order: 999
  },
  news: {
    title: `Test News ${Date.now()}`,
    content: 'This is test news content for CRUD verification.',
    excerpt: 'Test excerpt',
    author: 'Test Author',
    status: 'draft',
    featured: false
  },
  api_keys: {
    name: `Test API ${Date.now()}`,
    description: 'Test API description',
    endpoint: '/test-endpoint',
    method: 'GET',
    status: 'active',
    rate_limit: 100
  }
};

async function testFullCRUD(tableName, data) {
  console.log(`🧪 Testing ${tableName} CRUD operations...`);
  
  const results = {
    create: false,
    read: false,
    update: false,
    delete: false,
    error: null
  };

  try {
    // Test READ
    const { data: readData, error: readError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    results.read = !readError;
    if (readError) {
      results.error = `READ: ${readError.message}`;
      console.log(`   ❌ READ: ${readError.message}`);
      return results;
    }
    console.log(`   ✅ READ: Success (${readData?.length || 0} records found)`);

    // Test CREATE
    const { data: createData, error: createError } = await supabase
      .from(tableName)
      .insert([data])
      .select()
      .single();
    
    results.create = !createError;
    if (createError) {
      results.error = `CREATE: ${createError.message}`;
      console.log(`   ❌ CREATE: ${createError.message}`);
      return results;
    }
    console.log(`   ✅ CREATE: Success (ID: ${createData.id})`);

    // Test UPDATE
    const updateData = {
      updated_at: new Date().toISOString(),
      ...(tableName === 'projects' && { description: 'Updated test description' }),
      ...(tableName === 'users' && { email: `updated${Date.now()}@example.com` }),
      ...(tableName === 'categories' && { description: 'Updated test description' }),
      ...(tableName === 'team_members' && { bio: 'Updated test bio' }),
      ...(tableName === 'testimonials' && { text: 'Updated test testimonial' }),
      ...(tableName === 'partners' && { description: 'Updated test description' }),
      ...(tableName === 'news' && { content: 'Updated test content' }),
      ...(tableName === 'api_keys' && { description: 'Updated test description' })
    };

    const { error: updateError } = await supabase
      .from(tableName)
      .update(updateData)
      .eq('id', createData.id);
    
    results.update = !updateError;
    if (updateError) {
      results.error = `UPDATE: ${updateError.message}`;
      console.log(`   ❌ UPDATE: ${updateError.message}`);
    } else {
      console.log(`   ✅ UPDATE: Success`);
    }

    // Test DELETE
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', createData.id);
    
    results.delete = !deleteError;
    if (deleteError) {
      results.error = results.error || `DELETE: ${deleteError.message}`;
      console.log(`   ❌ DELETE: ${deleteError.message}`);
    } else {
      console.log(`   ✅ DELETE: Success`);
    }

  } catch (err) {
    results.error = err.message;
    console.log(`   ❌ ERROR: ${err.message}`);
  }

  return results;
}

async function checkTableStructure(tableName, requiredFields) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      return { exists: false, error: error.message, fields: [] };
    }

    const existingFields = data && data.length > 0 ? Object.keys(data[0]) : [];
    const missingFields = requiredFields.filter(field => !existingFields.includes(field));
    
    return {
      exists: true,
      fields: existingFields,
      missingFields: missingFields,
      hasAllRequired: missingFields.length === 0
    };
  } catch (err) {
    return { exists: false, error: err.message, fields: [] };
  }
}

async function verifyAllEntities() {
  console.log('🚀 Starting comprehensive CRUD verification...\n');
  
  const entities = [
    { name: 'projects', requiredFields: ['title', 'description', 'category', 'status', 'featured'] },
    { name: 'users', requiredFields: ['username', 'email', 'role', 'status'] },
    { name: 'categories', requiredFields: ['name', 'description', 'color'] },
    { name: 'team_members', requiredFields: ['name', 'role', 'bio', 'status'] },
    { name: 'testimonials', requiredFields: ['name', 'role', 'company', 'text', 'rating', 'status'] },
    { name: 'partners', requiredFields: ['name', 'description', 'status'] },
    { name: 'news', requiredFields: ['title', 'content', 'author', 'status'] },
    { name: 'api_keys', requiredFields: ['name', 'description', 'endpoint', 'method', 'status'] }
  ];
  
  const results = [];
  
  for (const entity of entities) {
    console.log(`📋 ${entity.name.toUpperCase()}`);
    console.log('─'.repeat(50));
    
    // Check table structure
    const structure = await checkTableStructure(entity.name, entity.requiredFields);
    
    if (!structure.exists) {
      console.log(`❌ Table does not exist: ${structure.error}`);
      results.push({
        entity: entity.name,
        status: 'missing',
        crud: { create: false, read: false, update: false, delete: false }
      });
      console.log('');
      continue;
    }
    
    console.log(`✅ Table exists with ${structure.fields.length} columns`);
    
    if (structure.missingFields.length > 0) {
      console.log(`⚠️  Missing fields: ${structure.missingFields.join(', ')}`);
    } else {
      console.log(`✅ All required fields present`);
    }
    
    // Test CRUD operations
    const crud = await testFullCRUD(entity.name, testData[entity.name]);
    
    const crudCount = Object.values(crud).filter(v => v === true).length;
    const crudTotal = 4; // CREATE, READ, UPDATE, DELETE
    
    results.push({
      entity: entity.name,
      status: crudCount === crudTotal ? 'perfect' : crudCount > 0 ? 'partial' : 'failed',
      crud: crud,
      missingFields: structure.missingFields
    });
    
    console.log(`📊 CRUD Summary: ${crudCount}/${crudTotal} operations working`);
    console.log('');
  }
  
  // Analytics (read-only test)
  console.log(`📋 ANALYTICS (READ-ONLY)`);
  console.log('─'.repeat(50));
  
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Analytics READ: ${error.message}`);
      results.push({
        entity: 'analytics',
        status: 'failed',
        crud: { create: null, read: false, update: null, delete: null }
      });
    } else {
      console.log(`✅ Analytics READ: Success (${data?.length || 0} records)`);
      results.push({
        entity: 'analytics',
        status: 'perfect',
        crud: { create: null, read: true, update: null, delete: null }
      });
    }
  } catch (err) {
    console.log(`❌ Analytics ERROR: ${err.message}`);
    results.push({
      entity: 'analytics',
      status: 'failed',
      crud: { create: null, read: false, update: null, delete: null }
    });
  }
  
  console.log('');
  
  // Final Summary
  console.log('📊 FINAL VERIFICATION SUMMARY');
  console.log('==============================');
  
  const perfect = results.filter(r => r.status === 'perfect').length;
  const partial = results.filter(r => r.status === 'partial').length;
  const failed = results.filter(r => r.status === 'failed').length;
  const missing = results.filter(r => r.status === 'missing').length;
  const total = results.length;
  
  console.log(`Total Entities: ${total}`);
  console.log(`✅ Perfect CRUD: ${perfect}`);
  console.log(`⚠️  Partial CRUD: ${partial}`);
  console.log(`❌ Failed CRUD: ${failed}`);
  console.log(`❌ Missing Tables: ${missing}`);
  console.log(`Success Rate: ${Math.round((perfect / total) * 100)}%`);
  console.log('');
  
  // Detailed Results
  console.log('📋 DETAILED RESULTS');
  console.log('===================');
  
  results.forEach(result => {
    const icon = result.status === 'perfect' ? '✅' : 
                 result.status === 'partial' ? '⚠️' : '❌';
    
    console.log(`${icon} ${result.entity.toUpperCase()}`);
    
    if (result.crud.create !== null) {
      console.log(`   CREATE: ${result.crud.create ? '✅' : '❌'}`);
    }
    console.log(`   READ: ${result.crud.read ? '✅' : '❌'}`);
    if (result.crud.update !== null) {
      console.log(`   UPDATE: ${result.crud.update ? '✅' : '❌'}`);
    }
    if (result.crud.delete !== null) {
      console.log(`   DELETE: ${result.crud.delete ? '✅' : '❌'}`);
    }
    
    if (result.missingFields && result.missingFields.length > 0) {
      console.log(`   Missing: ${result.missingFields.join(', ')}`);
    }
    console.log('');
  });
  
  // Final Status
  if (perfect === total) {
    console.log('🎉 ALL ENTITIES HAVE PERFECT CRUD OPERATIONS!');
    console.log('✅ Database replication complete');
    console.log('✅ All CRUD operations functional');
    console.log('✅ Admin dashboard ready for production');
  } else if (perfect + partial === total) {
    console.log('🎯 CRUD OPERATIONS MOSTLY WORKING!');
    console.log('✅ Database replication complete');
    console.log('⚠️  Some CRUD operations may need attention');
    console.log('✅ Admin dashboard functional');
  } else {
    console.log('⚠️  SOME ENTITIES NEED ATTENTION');
    console.log('📋 Please check the detailed results above');
    console.log('💡 Make sure you executed the SQL fix file in Supabase');
  }
  
  console.log('');
  console.log('🌐 Access Information:');
  console.log(`   Admin Dashboard: http://localhost:5174/admin`);
  console.log(`   Login: admin / Admin123`);
  console.log(`   SQL Fix File: database/fix-complete-crud-replication.sql`);
  
  return results;
}

async function main() {
  try {
    const results = await verifyAllEntities();
    
    // Check if SQL fix is needed
    const needsFix = results.some(r => r.status === 'failed' || r.status === 'missing');
    
    if (needsFix) {
      console.log('\n🔧 RECOMMENDED ACTION:');
      console.log('======================');
      console.log('1. Open Supabase Dashboard SQL Editor');
      console.log('2. Execute: database/fix-complete-crud-replication.sql');
      console.log('3. Run this verification script again');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

main();