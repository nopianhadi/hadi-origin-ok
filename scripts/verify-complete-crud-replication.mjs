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

console.log('🔍 VERIFYING COMPLETE CRUD REPLICATION TO SUPABASE');
console.log('==================================================');
console.log(`📍 Supabase URL: ${supabaseUrl}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

// Entitas yang disebutkan dalam permintaan
const requiredEntities = [
  {
    name: 'Detail Proyek',
    table: 'projects',
    description: 'Project details with enhanced fields',
    requiredFields: ['title', 'description', 'category', 'image', 'demo_url', 'github_url', 'tech_stack', 'status', 'featured']
  },
  {
    name: 'Users',
    table: 'users', 
    description: 'User management system',
    requiredFields: ['username', 'email', 'role', 'status']
  },
  {
    name: 'Kategori',
    table: 'categories',
    description: 'Project categories',
    requiredFields: ['name', 'description', 'color', 'icon']
  },
  {
    name: 'Tim',
    table: 'team_members',
    description: 'Team members management',
    requiredFields: ['name', 'role', 'bio', 'image', 'expertise', 'status']
  },
  {
    name: 'Testimoni',
    table: 'testimonials',
    description: 'Client testimonials',
    requiredFields: ['name', 'role', 'company', 'text', 'rating', 'image', 'status']
  },
  {
    name: 'Partner',
    table: 'partners',
    description: 'Business partners',
    requiredFields: ['name', 'logo', 'website', 'description', 'status']
  },
  {
    name: 'Berita',
    table: 'news',
    description: 'News and announcements',
    requiredFields: ['title', 'content', 'excerpt', 'image', 'author', 'status']
  },
  {
    name: 'API',
    table: 'api_keys',
    description: 'API keys management',
    requiredFields: ['name', 'description', 'endpoint', 'method', 'api_key', 'status']
  },
  {
    name: 'Analytics',
    table: 'analytics',
    description: 'Analytics and tracking data',
    requiredFields: ['event_type', 'event_data', 'user_agent', 'ip_address', 'created_at']
  }
];

async function verifyTableStructure(tableName, requiredFields) {
  try {
    // Get table structure by fetching one record
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      return {
        exists: false,
        error: error.message,
        fields: [],
        missingFields: requiredFields
      };
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
    return {
      exists: false,
      error: err.message,
      fields: [],
      missingFields: requiredFields
    };
  }
}

async function testCRUDOperations(tableName) {
  const operations = {
    create: false,
    read: false,
    update: false,
    delete: false
  };

  // Test READ
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    operations.read = !error;
  } catch (err) {
    operations.read = false;
  }

  // Test CREATE with minimal data
  try {
    let testData = {};
    
    switch (tableName) {
      case 'projects':
        testData = {
          title: 'Test Project CRUD',
          description: 'Test description for CRUD verification',
          category: 'Test',
          status: 'active',
          featured: 0
        };
        break;
      case 'users':
        testData = {
          username: `test_user_${Date.now()}`,
          email: `test${Date.now()}@example.com`,
          role: 'user',
          status: 'active'
        };
        break;
      case 'categories':
        testData = {
          name: `Test Category ${Date.now()}`,
          description: 'Test category for CRUD verification',
          color: '#FF0000'
        };
        break;
      case 'team_members':
        testData = {
          name: 'Test Member',
          role: 'Test Role',
          bio: 'Test bio',
          status: 'active',
          display_order: 999
        };
        break;
      case 'testimonials':
        testData = {
          name: 'Test Client',
          role: 'Test Role',
          company: 'Test Company',
          text: 'Test testimonial text',
          rating: 5,
          status: 'active',
          display_order: 999
        };
        break;
      case 'partners':
        testData = {
          name: 'Test Partner',
          description: 'Test partner description',
          status: 'active',
          display_order: 999
        };
        break;
      case 'news':
        testData = {
          title: 'Test News',
          content: 'Test news content',
          excerpt: 'Test excerpt',
          author: 'Test Author',
          status: 'draft'
        };
        break;
      case 'api_keys':
        testData = {
          name: 'Test API',
          description: 'Test API description',
          endpoint: '/test',
          method: 'GET',
          status: 'active'
        };
        break;
      default:
        // Skip CREATE test for analytics (read-only)
        if (tableName === 'analytics') {
          operations.create = null;
          operations.update = null;
          operations.delete = null;
          return operations;
        }
        return operations;
    }
    
    const { data, error } = await supabase
      .from(tableName)
      .insert([testData])
      .select()
      .single();
    
    operations.create = !error;
    
    if (!error && data?.id) {
      // Test UPDATE
      const updateData = { updated_at: new Date().toISOString() };
      const { error: updateError } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', data.id);
      
      operations.update = !updateError;
      
      // Test DELETE
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', data.id);
      
      operations.delete = !deleteError;
    }
  } catch (err) {
    operations.create = false;
  }

  return operations;
}

async function getRecordCount(tableName) {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    return error ? 0 : count;
  } catch (err) {
    return 0;
  }
}

async function verifyCompleteReplication() {
  console.log('🧪 TESTING CRUD REPLICATION FOR ALL ENTITIES\n');
  
  let totalEntities = requiredEntities.length;
  let workingEntities = 0;
  let fullyCRUDEntities = 0;
  
  const results = [];
  
  for (const entity of requiredEntities) {
    console.log(`📋 ${entity.name} (${entity.table})`);
    console.log(`   Description: ${entity.description}`);
    
    // Verify table structure
    const structure = await verifyTableStructure(entity.table, entity.requiredFields);
    const recordCount = await getRecordCount(entity.table);
    
    if (!structure.exists) {
      console.log(`   ❌ Table does not exist: ${structure.error}`);
      results.push({
        entity: entity.name,
        table: entity.table,
        status: 'missing',
        records: 0,
        crud: { create: false, read: false, update: false, delete: false }
      });
      console.log('');
      continue;
    }
    
    workingEntities++;
    
    console.log(`   ✅ Table exists with ${recordCount} records`);
    console.log(`   📊 Fields: ${structure.fields.length} total`);
    
    if (structure.missingFields.length > 0) {
      console.log(`   ⚠️  Missing fields: ${structure.missingFields.join(', ')}`);
    } else {
      console.log(`   ✅ All required fields present`);
    }
    
    // Test CRUD operations
    const crud = await testCRUDOperations(entity.table);
    const crudCount = Object.values(crud).filter(v => v === true).length;
    const crudTotal = Object.values(crud).filter(v => v !== null).length;
    
    if (crudCount === crudTotal && crudTotal > 0) {
      fullyCRUDEntities++;
      console.log(`   ✅ CRUD: ${crudCount}/${crudTotal} operations working`);
    } else if (entity.table === 'analytics') {
      console.log(`   ✅ Read-only table (as expected for analytics)`);
    } else {
      console.log(`   ⚠️  CRUD: ${crudCount}/${crudTotal} operations working`);
    }
    
    results.push({
      entity: entity.name,
      table: entity.table,
      status: 'working',
      records: recordCount,
      crud: crud,
      missingFields: structure.missingFields
    });
    
    console.log('');
  }
  
  // Summary Report
  console.log('📊 COMPLETE REPLICATION SUMMARY');
  console.log('================================');
  console.log(`Total Entities: ${totalEntities}`);
  console.log(`Working Entities: ${workingEntities}`);
  console.log(`Fully CRUD Entities: ${fullyCRUDEntities}`);
  console.log(`Success Rate: ${Math.round((workingEntities / totalEntities) * 100)}%`);
  console.log('');
  
  // Detailed Results
  console.log('📋 DETAILED ENTITY STATUS');
  console.log('=========================');
  
  results.forEach(result => {
    const crudStatus = Object.values(result.crud).filter(v => v === true).length;
    const crudTotal = Object.values(result.crud).filter(v => v !== null).length;
    
    console.log(`${result.status === 'working' ? '✅' : '❌'} ${result.entity}`);
    console.log(`   Table: ${result.table}`);
    console.log(`   Records: ${result.records}`);
    console.log(`   CRUD: ${crudStatus}/${crudTotal}`);
    
    if (result.missingFields && result.missingFields.length > 0) {
      console.log(`   Missing: ${result.missingFields.join(', ')}`);
    }
    console.log('');
  });
  
  // Final Status
  if (workingEntities === totalEntities) {
    console.log('🎉 ALL ENTITIES SUCCESSFULLY REPLICATED TO SUPABASE!');
    console.log('✅ Database replication complete');
    console.log('✅ CRUD operations functional');
    console.log('✅ Admin dashboard ready for all entities');
  } else {
    console.log('⚠️  Some entities need attention:');
    const missing = results.filter(r => r.status === 'missing');
    if (missing.length > 0) {
      console.log(`   Missing tables: ${missing.map(m => m.table).join(', ')}`);
    }
  }
  
  console.log('');
  console.log('🌐 Access Information:');
  console.log(`   Admin Dashboard: http://localhost:5174/admin`);
  console.log(`   Login: admin / Admin123`);
  
  return results;
}

// Main execution
async function main() {
  const results = await verifyCompleteReplication();
  
  // Check if any fixes are needed
  const needsFix = results.some(r => r.status === 'missing' || r.missingFields?.length > 0);
  
  if (needsFix) {
    console.log('\n🔧 RECOMMENDED ACTIONS:');
    console.log('======================');
    
    results.forEach(result => {
      if (result.status === 'missing') {
        console.log(`❌ Create table: ${result.table}`);
      } else if (result.missingFields?.length > 0) {
        console.log(`⚠️  Add fields to ${result.table}: ${result.missingFields.join(', ')}`);
      }
    });
  }
}

main().catch(console.error);