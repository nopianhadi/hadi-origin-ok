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

console.log('🔧 ADDING ENHANCED PROJECT FIELDS');
console.log('==================================');

const enhancedFields = [
  {
    name: 'project_type',
    type: 'TEXT',
    default: "'web'",
    check: "CHECK (project_type IN ('web', 'mobile', 'desktop', 'api', 'other'))",
    description: 'Type of project'
  },
  {
    name: 'duration',
    type: 'TEXT',
    default: null,
    description: 'Project duration estimate'
  },
  {
    name: 'team_size',
    type: 'TEXT', 
    default: null,
    description: 'Team size for the project'
  },
  {
    name: 'client_name',
    type: 'TEXT',
    default: null,
    description: 'Client or company name'
  },
  {
    name: 'budget',
    type: 'TEXT',
    default: null,
    description: 'Project budget range'
  },
  {
    name: 'start_date',
    type: 'DATE',
    default: null,
    description: 'Project start date'
  },
  {
    name: 'end_date',
    type: 'DATE',
    default: null,
    description: 'Project end date'
  },
  {
    name: 'tags',
    type: 'JSONB',
    default: "'[]'::JSONB",
    description: 'Project tags array'
  },
  {
    name: 'project_priority',
    type: 'TEXT',
    default: "'medium'",
    check: "CHECK (project_priority IN ('low', 'medium', 'high', 'urgent'))",
    description: 'Project priority level'
  },
  {
    name: 'progress',
    type: 'INTEGER',
    default: '0',
    check: 'CHECK (progress >= 0 AND progress <= 100)',
    description: 'Project completion percentage'
  },
  {
    name: 'download_url',
    type: 'TEXT',
    default: null,
    description: 'Download URL for project files'
  }
];

async function addField(field) {
  try {
    console.log(`\n📝 Adding field: ${field.name}...`);
    
    let sql = `ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ${field.name} ${field.type}`;
    
    if (field.default) {
      sql += ` DEFAULT ${field.default}`;
    }
    
    if (field.check) {
      sql += ` ${field.check}`;
    }
    
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.log(`❌ Error adding ${field.name}: ${error.message}`);
      return false;
    }
    
    // Add comment
    const commentSql = `COMMENT ON COLUMN public.projects.${field.name} IS '${field.description}'`;
    await supabase.rpc('exec_sql', { sql: commentSql });
    
    console.log(`✅ Added field: ${field.name} (${field.type})`);
    return true;
  } catch (err) {
    console.log(`❌ Error adding ${field.name}: ${err.message}`);
    return false;
  }
}

async function createExecSqlFunction() {
  try {
    console.log('🔧 Creating exec_sql function...');
    
    const functionSql = `
      CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
      RETURNS VOID AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    const { error } = await supabase.rpc('exec_sql', { sql: functionSql });
    
    if (error) {
      // Try direct execution
      console.log('Trying alternative approach...');
      
      // Use direct SQL execution for each field
      for (const field of enhancedFields) {
        await addFieldDirect(field);
      }
      return;
    }
    
    console.log('✅ exec_sql function created');
  } catch (err) {
    console.log(`❌ Error creating function: ${err.message}`);
  }
}

async function addFieldDirect(field) {
  try {
    console.log(`\n📝 Adding field directly: ${field.name}...`);
    
    // Check if column exists first
    const { data: columns } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'projects')
      .eq('column_name', field.name);
    
    if (columns && columns.length > 0) {
      console.log(`✅ Field ${field.name} already exists`);
      return true;
    }
    
    // Since we can't execute DDL directly, we'll update the schema file instead
    console.log(`📝 Field ${field.name} needs to be added manually to schema`);
    return true;
  } catch (err) {
    console.log(`❌ Error checking ${field.name}: ${err.message}`);
    return false;
  }
}

async function testCurrentFields() {
  try {
    console.log('\n🔍 Testing current project fields...');
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    if (projects && projects.length > 0) {
      const project = projects[0];
      console.log('\n📊 Current project fields:');
      
      Object.keys(project).forEach(key => {
        console.log(`   ✅ ${key}: ${typeof project[key]}`);
      });
      
      console.log('\n🔍 Missing enhanced fields:');
      enhancedFields.forEach(field => {
        if (!project.hasOwnProperty(field.name)) {
          console.log(`   ❌ ${field.name}: ${field.description}`);
        } else {
          console.log(`   ✅ ${field.name}: Already exists`);
        }
      });
    }
    
  } catch (err) {
    console.log(`❌ Error testing fields: ${err.message}`);
  }
}

async function updateSchemaFile() {
  console.log('\n📝 UPDATING SCHEMA FILE');
  console.log('=======================');
  
  const additionalFields = `
-- Enhanced fields for ProjectDetailManager
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'web' CHECK (project_type IN ('web', 'mobile', 'desktop', 'api', 'other'));
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS team_size TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::JSONB;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_priority TEXT DEFAULT 'medium' CHECK (project_priority IN ('low', 'medium', 'high', 'urgent'));
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS download_url TEXT;

-- Comments for enhanced fields
COMMENT ON COLUMN public.projects.project_type IS 'Type of project (web, mobile, desktop, api, other)';
COMMENT ON COLUMN public.projects.duration IS 'Project duration estimate';
COMMENT ON COLUMN public.projects.team_size IS 'Team size for the project';
COMMENT ON COLUMN public.projects.client_name IS 'Client or company name';
COMMENT ON COLUMN public.projects.budget IS 'Project budget range';
COMMENT ON COLUMN public.projects.start_date IS 'Project start date';
COMMENT ON COLUMN public.projects.end_date IS 'Project end date';
COMMENT ON COLUMN public.projects.tags IS 'Project tags array';
COMMENT ON COLUMN public.projects.project_priority IS 'Project priority level';
COMMENT ON COLUMN public.projects.progress IS 'Project completion percentage (0-100)';
COMMENT ON COLUMN public.projects.download_url IS 'Download URL for project files';
`;

  console.log('📝 Additional fields to add to schema:');
  console.log(additionalFields);
  
  return additionalFields;
}

async function main() {
  await testCurrentFields();
  
  console.log('\n🎯 SOLUTION');
  console.log('============');
  console.log('Since Supabase doesn\'t allow DDL operations via RPC in this setup,');
  console.log('the enhanced fields need to be added manually to the database.');
  
  const schemaUpdate = await updateSchemaFile();
  
  console.log('\n📋 MANUAL STEPS REQUIRED:');
  console.log('1. Go to Supabase Dashboard > SQL Editor');
  console.log('2. Execute the following SQL:');
  console.log('```sql');
  console.log(schemaUpdate);
  console.log('```');
  
  console.log('\n✅ AFTER ADDING FIELDS:');
  console.log('- ProjectDetailManager will have full functionality');
  console.log('- All enhanced project fields will be available');
  console.log('- Multi-tab form will work completely');
  console.log('- Project timeline, budget, team info will be manageable');
  
  console.log('\n🔐 ACCESS INFO:');
  console.log('URL: http://localhost:5173/admin');
  console.log('Tab: Detail Proyek');
  console.log('Features: Enhanced project management with all fields');
}

main().catch(console.error);