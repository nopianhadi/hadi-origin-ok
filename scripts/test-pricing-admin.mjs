#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🧪 TESTING PRICING ADMIN INTEGRATION');
console.log('====================================');

async function testPricingAdmin() {
  try {
    console.log('📊 Testing pricing data fetch...');
    
    // Test fetching pricing plans
    const { data: plans, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    
    console.log(`✅ Found ${plans.length} pricing plans:`);
    plans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.name_en} (${plan.name_id})`);
      console.log(`      Price: ${plan.price_en} / ${plan.price_id}`);
      console.log(`      Features: ${plan.features_en.length} EN, ${plan.features_id.length} ID`);
      console.log(`      Status: ${plan.is_active ? '✅ Active' : '❌ Inactive'}`);
      console.log(`      Flags: ${plan.is_highlighted ? '🌟 Highlighted' : ''} ${plan.is_popular ? '⭐ Popular' : ''}`);
      console.log('');
    });
    
    console.log('🔧 Testing CRUD operations...');
    
    // Test create
    const testPlan = {
      name_en: 'Test Plan',
      name_id: 'Paket Test',
      price_en: '$99/month',
      price_id: 'Rp 1.500.000/bulan',
      period_en: '/ month',
      period_id: '/ bulan',
      description_en: 'Test description',
      description_id: 'Deskripsi test',
      features_en: ['Feature 1', 'Feature 2'],
      features_id: ['Fitur 1', 'Fitur 2'],
      button_text_en: 'Get Started',
      button_text_id: 'Mulai Sekarang',
      highlighted: false,
      popular: false,
      is_active: true,
      color: 'blue',
      icon: '🧪',
      sort_order: 999
    };
    
    const { data: created, error: createError } = await supabase
      .from('pricing_plans')
      .insert([testPlan])
      .select()
      .single();
    
    if (createError) throw createError;
    console.log('✅ CREATE test passed');
    
    // Test update
    const { error: updateError } = await supabase
      .from('pricing_plans')
      .update({ name_en: 'Updated Test Plan' })
      .eq('id', created.id);
    
    if (updateError) throw updateError;
    console.log('✅ UPDATE test passed');
    
    // Test delete
    const { error: deleteError } = await supabase
      .from('pricing_plans')
      .delete()
      .eq('id', created.id);
    
    if (deleteError) throw deleteError;
    console.log('✅ DELETE test passed');
    
    console.log('\n🎉 ALL PRICING ADMIN TESTS PASSED!');
    console.log('==================================');
    console.log('✅ Pricing table accessible');
    console.log('✅ CRUD operations working');
    console.log('✅ Bilingual support active');
    console.log('✅ Admin integration ready');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Open admin dashboard: http://localhost:5174/admin');
    console.log('2. Navigate to "Pricing" tab');
    console.log('3. Test CRUD operations in UI');
    console.log('4. Verify pricing component updates');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testPricingAdmin();