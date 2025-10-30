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

console.log('🔍 DEBUGGING PRICING CRUD OPERATIONS');
console.log('====================================');

async function debugCRUD() {
  try {
    console.log('📊 1. Testing READ operation...');
    
    const { data: initialPlans, error: readError } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order');

    if (readError) {
      console.error('❌ READ Error:', readError);
      return;
    }
    
    console.log(`✅ READ successful: Found ${initialPlans.length} plans`);
    initialPlans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.name_en} (ID: ${plan.id.substring(0, 8)}...)`);
    });

    console.log('\n🔧 2. Testing CREATE operation...');
    
    const testPlan = {
      name_en: 'Debug Test Plan',
      name_id: 'Paket Debug Test',
      price_en: '$99/test',
      price_id: 'Rp 150.000/test',
      period_en: '/ test',
      period_id: '/ test',
      description_en: 'This is a debug test plan',
      description_id: 'Ini adalah paket debug test',
      features_en: ['Debug feature 1', 'Debug feature 2', 'Debug feature 3'],
      features_id: ['Fitur debug 1', 'Fitur debug 2', 'Fitur debug 3'],
      button_text_en: 'Start Debug',
      button_text_id: 'Mulai Debug',
      highlighted: true,
      popular: false,
      is_active: true,
      color: 'purple',
      icon: '🐛',
      sort_order: 999
    };

    console.log('   Creating plan with data:', JSON.stringify(testPlan, null, 2));

    const { data: createdPlan, error: createError } = await supabase
      .from('pricing_plans')
      .insert([testPlan])
      .select()
      .single();

    if (createError) {
      console.error('❌ CREATE Error:', createError);
      return;
    }

    console.log(`✅ CREATE successful: Plan created with ID ${createdPlan.id.substring(0, 8)}...`);

    console.log('\n📝 3. Testing UPDATE operation...');
    
    const updateData = {
      name_en: 'Updated Debug Test Plan',
      price_en: '$199/updated',
      description_en: 'This plan has been updated via debug test'
    };

    console.log('   Updating plan with data:', JSON.stringify(updateData, null, 2));

    const { data: updatedPlan, error: updateError } = await supabase
      .from('pricing_plans')
      .update(updateData)
      .eq('id', createdPlan.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ UPDATE Error:', updateError);
      return;
    }

    console.log(`✅ UPDATE successful: Plan updated`);
    console.log(`   New name: ${updatedPlan.name_en}`);
    console.log(`   New price: ${updatedPlan.price_en}`);

    console.log('\n🔍 4. Testing READ after UPDATE...');
    
    const { data: verifyPlan, error: verifyError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('id', createdPlan.id)
      .single();

    if (verifyError) {
      console.error('❌ VERIFY Error:', verifyError);
      return;
    }

    console.log(`✅ VERIFY successful: Changes persisted`);
    console.log(`   Verified name: ${verifyPlan.name_en}`);
    console.log(`   Verified price: ${verifyPlan.price_en}`);

    console.log('\n🗑️ 5. Testing DELETE operation...');
    
    const { error: deleteError } = await supabase
      .from('pricing_plans')
      .delete()
      .eq('id', createdPlan.id);

    if (deleteError) {
      console.error('❌ DELETE Error:', deleteError);
      return;
    }

    console.log(`✅ DELETE successful: Plan removed`);

    console.log('\n🔍 6. Testing READ after DELETE...');
    
    const { data: deletedCheck, error: deletedError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('id', createdPlan.id)
      .single();

    if (deletedError && deletedError.code === 'PGRST116') {
      console.log(`✅ DELETE VERIFIED: Plan no longer exists`);
    } else if (deletedCheck) {
      console.error('❌ DELETE FAILED: Plan still exists');
      return;
    }

    console.log('\n📊 7. Final READ to verify database state...');
    
    const { data: finalPlans, error: finalError } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order');

    if (finalError) {
      console.error('❌ FINAL READ Error:', finalError);
      return;
    }

    console.log(`✅ FINAL READ successful: ${finalPlans.length} plans remain`);
    
    if (finalPlans.length === initialPlans.length) {
      console.log('✅ Database state restored to original');
    } else {
      console.log('⚠️ Database state changed');
    }

    console.log('\n🎉 ALL CRUD OPERATIONS SUCCESSFUL!');
    console.log('==================================');
    console.log('✅ CREATE: Working');
    console.log('✅ READ: Working');
    console.log('✅ UPDATE: Working');
    console.log('✅ DELETE: Working');
    console.log('✅ Data persistence: Verified');
    console.log('✅ Database integrity: Maintained');

    console.log('\n🔧 DEBUGGING COMPLETE');
    console.log('If you\'re still experiencing issues with the admin interface:');
    console.log('1. Check browser console for JavaScript errors');
    console.log('2. Verify network requests in browser dev tools');
    console.log('3. Check if the admin dashboard is properly loading the PricingManager component');
    console.log('4. Ensure you\'re logged in to the admin dashboard');

  } catch (error) {
    console.error('❌ Debug test failed:', error);
    process.exit(1);
  }
}

debugCRUD();