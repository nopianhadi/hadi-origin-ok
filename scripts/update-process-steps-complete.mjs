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

console.log('🔧 UPDATING PROCESS STEPS WITH COMPLETE DATA');
console.log('============================================');

const supabase = createClient(supabaseUrl, supabaseKey);

// Complete process steps data based on your requirements
const completeProcessSteps = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title_en: 'Discovery & Planning',
    title_id: 'Penemuan & Perencanaan',
    description_en: 'Understanding your business needs and project requirements',
    description_id: 'Memahami kebutuhan bisnis dan persyaratan proyek Anda',
    details_en: ['Requirements gathering', 'Market research', 'Technical feasibility', 'Project roadmap', 'Timeline planning'],
    details_id: ['Pengumpulan kebutuhan', 'Riset pasar', 'Kelayakan teknis', 'Roadmap proyek', 'Perencanaan timeline'],
    duration_en: '1-2 weeks',
    duration_id: '1-2 minggu',
    icon: 'MessageSquare',
    color: 'from-blue-500 to-cyan-500',
    sort_order: 1,
    is_active: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title_en: 'Design & Prototyping',
    title_id: 'Desain & Prototyping',
    description_en: 'Creating user-centered designs and interactive prototypes',
    description_id: 'Membuat desain berpusat pada pengguna dan prototipe interaktif',
    details_en: ['User experience design', 'User interface design', 'Wireframing', 'Interactive prototypes', 'Design system'],
    details_id: ['Desain pengalaman pengguna', 'Desain antarmuka pengguna', 'Wireframing', 'Prototipe interaktif', 'Sistem desain'],
    duration_en: '2-3 weeks',
    duration_id: '2-3 minggu',
    icon: 'Settings',
    color: 'from-purple-500 to-pink-500',
    sort_order: 2,
    is_active: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title_en: 'Development',
    title_id: 'Pengembangan',
    description_en: 'Building your application with modern technologies and best practices',
    description_id: 'Membangun aplikasi Anda dengan teknologi modern dan praktik terbaik',
    details_en: ['Frontend development', 'Backend development', 'Database design', 'API integration', 'Quality assurance'],
    details_id: ['Pengembangan frontend', 'Pengembangan backend', 'Desain database', 'Integrasi API', 'Jaminan kualitas'],
    duration_en: '4-8 weeks',
    duration_id: '4-8 minggu',
    icon: 'Code',
    color: 'from-green-500 to-emerald-500',
    sort_order: 3,
    is_active: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title_en: 'Testing & Deployment',
    title_id: 'Pengujian & Deployment',
    description_en: 'Comprehensive testing and smooth deployment to production',
    description_id: 'Pengujian komprehensif dan deployment yang lancar ke produksi',
    details_en: ['Automated testing', 'Manual testing', 'Performance optimization', 'Security audit', 'Production deployment'],
    details_id: ['Pengujian otomatis', 'Pengujian manual', 'Optimasi performa', 'Audit keamanan', 'Deployment produksi'],
    duration_en: '1-2 weeks',
    duration_id: '1-2 minggu',
    icon: 'Rocket',
    color: 'from-orange-500 to-red-500',
    sort_order: 4,
    is_active: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title_en: 'Launch & Support',
    title_id: 'Peluncuran & Dukungan',
    description_en: 'Going live and providing ongoing support and maintenance',
    description_id: 'Go live dan memberikan dukungan serta pemeliharaan berkelanjutan',
    details_en: ['Production launch', 'Performance monitoring', 'Bug fixes', 'Feature updates', 'Technical support'],
    details_id: ['Peluncuran produksi', 'Monitoring performa', 'Perbaikan bug', 'Update fitur', 'Dukungan teknis'],
    duration_en: 'Ongoing',
    duration_id: 'Berkelanjutan',
    icon: 'HeartHandshake',
    color: 'from-indigo-500 to-purple-500',
    sort_order: 5,
    is_active: true
  }
];

async function updateProcessSteps() {
  console.log('🔄 Clearing existing process steps...');
  
  // Clear existing data
  const { error: deleteError } = await supabase
    .from('process_steps')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.log('⚠️  Delete warning:', deleteError.message);
  }

  console.log('📝 Inserting complete process steps data...');
  
  // Insert new complete data
  const { data, error } = await supabase
    .from('process_steps')
    .upsert(completeProcessSteps, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error updating process steps:', error.message);
    return false;
  }

  console.log('✅ Process steps updated successfully!');
  return true;
}

async function verifyUpdate() {
  console.log('\n🔍 Verifying updated data...');
  
  const { data, error } = await supabase
    .from('process_steps')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('❌ Verification error:', error.message);
    return;
  }

  console.log(`📊 Found ${data.length} process steps:\n`);
  
  data.forEach((step, index) => {
    console.log(`${step.sort_order}. ${step.title_en} (${step.title_id})`);
    console.log(`   Duration: ${step.duration_en} (${step.duration_id})`);
    console.log(`   Details: ${step.details_en?.length || 0} items`);
    console.log(`   Active: ${step.is_active ? '✅' : '❌'}`);
    console.log('');
  });

  console.log('✅ Data verification complete!');
}

async function main() {
  const success = await updateProcessSteps();
  
  if (success) {
    await verifyUpdate();
    
    console.log('\n🎉 PROCESS STEPS UPDATE COMPLETE!');
    console.log('================================');
    console.log('✅ 5 comprehensive process steps created');
    console.log('✅ Bilingual support (EN/ID)');
    console.log('✅ Detailed step descriptions');
    console.log('✅ Ready for admin dashboard management');
    console.log('');
    console.log('🌐 View in admin: http://localhost:5174/admin');
    console.log('📋 Tab: "Proses" for process management');
  }
}

main().catch(console.error);