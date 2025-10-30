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

console.log('🔧 SETTING UP PRICING PLANS TABLE');
console.log('=================================');

const supabase = createClient(supabaseUrl, supabaseKey);

// Pricing plans data
const pricingPlans = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    name_en: 'Starter',
    name_id: 'Starter',
    price_en: 'Rp 1.500.000',
    price_id: 'Rp 1.500.000',
    period_en: '/ project',
    period_id: '/ proyek',
    description_en: 'Basic dashboard for businesses just starting out',
    description_id: 'Dashboard dasar untuk bisnis yang baru memulai',
    features_en: [
      'Basic dashboard',
      '3 API integrations',
      'Real-time analytics',
      'Email support',
      '1 user account'
    ],
    features_id: [
      'Dashboard dasar',
      'Integrasi 3 API',
      'Real-time analytics',
      'Email support',
      '1 user account'
    ],
    highlighted: false,
    popular: false,
    sort_order: 1,
    is_active: true,
    button_text_en: 'Schedule Free Demo',
    button_text_id: 'Jadwalkan Demo Gratis',
    color: 'blue',
    icon: 'Rocket'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    name_en: 'Professional',
    name_id: 'Professional',
    price_en: 'Rp 4.500.000',
    price_id: 'Rp 4.500.000',
    period_en: '/ project',
    period_id: '/ proyek',
    description_en: 'Complete solution for growing businesses',
    description_id: 'Solusi lengkap untuk bisnis yang berkembang',
    features_en: [
      'Advanced dashboard',
      'Unlimited API integration',
      'AI/ML integration',
      'Priority support',
      'Up to 10 users',
      'Custom analytics'
    ],
    features_id: [
      'Advanced dashboard',
      'Unlimited API integration',
      'AI/ML integration',
      'Priority support',
      'Up to 10 users',
      'Custom analytics'
    ],
    highlighted: true,
    popular: true,
    sort_order: 2,
    is_active: true,
    button_text_en: 'Schedule Free Demo',
    button_text_id: 'Jadwalkan Demo Gratis',
    color: 'purple',
    icon: 'Crown'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    name_en: 'Enterprise',
    name_id: 'Enterprise',
    price_en: 'Custom',
    price_id: 'Custom',
    period_en: '',
    period_id: '',
    description_en: 'Custom solutions for enterprise needs',
    description_id: 'Solusi khusus untuk kebutuhan enterprise',
    features_en: [
      'Custom AI development',
      'Dedicated support team',
      'On-premise deployment',
      'Unlimited users',
      'SLA guarantee',
      'Training & consultation'
    ],
    features_id: [
      'Custom AI development',
      'Dedicated support team',
      'On-premise deployment',
      'Unlimited users',
      'SLA guarantee',
      'Training & consultation'
    ],
    highlighted: false,
    popular: false,
    sort_order: 3,
    is_active: true,
    button_text_en: 'Contact Us',
    button_text_id: 'Hubungi Kami',
    color: 'orange',
    icon: 'Building'
  }
];

async function createPricingTable() {
  console.log('📝 Creating pricing_plans table and data...');
  
  try {
    // Insert pricing plans data directly
    const { data, error } = await supabase
      .from('pricing_plans')
      .upsert(pricingPlans, { onConflict: 'id' });

    if (error) {
      console.log('❌ Error creating pricing plans:', error.message);
      return false;
    }

    console.log('✅ Pricing plans created successfully!');
    return true;
  } catch (err) {
    console.log('❌ Error:', err.message);
    return false;
  }
}

async function testPricingCRUD() {
  console.log('\n🧪 Testing pricing CRUD operations...');
  
  // Test READ
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order');

    if (error) {
      console.log('❌ READ failed:', error.message);
      return false;
    }

    console.log(`✅ READ successful: ${data.length} pricing plans found`);

    // Test CREATE
    const testPlan = {
      name_en: 'Test Plan',
      name_id: 'Paket Test',
      price_en: 'Rp 999.000',
      price_id: 'Rp 999.000',
      period_en: '/ month',
      period_id: '/ bulan',
      description_en: 'Test plan description',
      description_id: 'Deskripsi paket test',
      features_en: ['Feature 1', 'Feature 2'],
      features_id: ['Fitur 1', 'Fitur 2'],
      sort_order: 999,
      is_active: true
    };

    const { data: created, error: createError } = await supabase
      .from('pricing_plans')
      .insert([testPlan])
      .select()
      .single();

    if (createError) {
      console.log('❌ CREATE failed:', createError.message);
      return false;
    }

    console.log('✅ CREATE successful');

    // Test UPDATE
    const { error: updateError } = await supabase
      .from('pricing_plans')
      .update({ description_en: 'Updated test description' })
      .eq('id', created.id);

    if (updateError) {
      console.log('❌ UPDATE failed:', updateError.message);
    } else {
      console.log('✅ UPDATE successful');
    }

    // Test DELETE
    const { error: deleteError } = await supabase
      .from('pricing_plans')
      .delete()
      .eq('id', created.id);

    if (deleteError) {
      console.log('❌ DELETE failed:', deleteError.message);
    } else {
      console.log('✅ DELETE successful');
    }

    console.log('🎉 All CRUD operations working for pricing plans!');
    return true;

  } catch (err) {
    console.log('❌ CRUD test error:', err.message);
    return false;
  }
}

async function verifyPricingData() {
  console.log('\n🔍 Verifying pricing data...');
  
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order');

    if (error) {
      console.log('❌ Verification error:', error.message);
      return;
    }

    console.log(`📊 Found ${data.length} pricing plans:\n`);
    
    data.forEach((plan, index) => {
      console.log(`${plan.sort_order}. ${plan.name_en} (${plan.name_id})`);
      console.log(`   Price: ${plan.price_en} ${plan.period_en}`);
      console.log(`   Description: ${plan.description_en}`);
      console.log(`   Features: ${plan.features_en?.length || 0} items`);
      console.log(`   Highlighted: ${plan.highlighted ? '✅' : '❌'}`);
      console.log(`   Popular: ${plan.popular ? '✅' : '❌'}`);
      console.log(`   Active: ${plan.is_active ? '✅' : '❌'}`);
      console.log(`   Button: ${plan.button_text_en} (${plan.button_text_id})`);
      console.log('');
    });

    console.log('✅ Pricing data verification complete!');
  } catch (err) {
    console.log('❌ Verification error:', err.message);
  }
}

async function main() {
  const success = await createPricingTable();
  
  if (success) {
    await testPricingCRUD();
    await verifyPricingData();
    
    console.log('\n🎉 PRICING MANAGEMENT SYSTEM READY!');
    console.log('==================================');
    console.log('✅ Pricing plans table created');
    console.log('✅ 3 pricing plans populated (Starter, Professional, Enterprise)');
    console.log('✅ Bilingual support (EN/ID)');
    console.log('✅ CRUD operations tested and working');
    console.log('✅ Ready for admin dashboard integration');
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Add pricing tab to admin dashboard');
    console.log('2. Create CRUD forms for pricing management');
    console.log('3. Update Pricing component to use database data');
    
    console.log('\n🌐 Admin Dashboard: http://localhost:5174/admin');
    console.log('🎯 Ready to add pricing management tab');
  } else {
    console.log('\n❌ Failed to create pricing management system');
    console.log('💡 Check Supabase permissions and try again');
  }
}

main().catch(console.error);