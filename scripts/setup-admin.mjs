#!/usr/bin/env node

/**
 * Script untuk setup user admin
 */

import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase dari client/.env
const supabaseUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHZpdGF1cHFqdWNrdndrcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTkzMjMsImV4cCI6MjA3NzI5NTMyM30.RQhKnX611HofYoEm740ggYYQs4gTcGbsRsoS6oQpUsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAdmin() {
  try {
    console.log('🔄 Setting up admin user...');

    // Data user admin
    const adminUser = {
      username: 'admin',
      password: 'Admin123',
      email: 'admin@hadiorigin.com',
      full_name: 'Administrator',
      role: 'admin',
      is_active: true
    };

    // Cek apakah user sudah ada
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking existing user:', checkError);
      return;
    }

    if (existingUser) {
      console.log('✅ Admin user already exists:', {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        full_name: existingUser.full_name
      });
      
      // Update password jika berbeda
      if (existingUser.password !== adminUser.password) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ 
            password: adminUser.password,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingUser.id);

        if (updateError) {
          console.error('❌ Error updating password:', updateError);
        } else {
          console.log('✅ Password updated successfully');
        }
      }
      
      return existingUser;
    }

    // Insert user baru
    const { data, error } = await supabase
      .from('users')
      .insert([adminUser])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully:', {
      id: data.id,
      username: data.username,
      email: data.email,
      full_name: data.full_name
    });

    return data;

  } catch (error) {
    console.error('❌ Failed to setup admin user:', error.message);
  }
}

async function testLogin() {
  try {
    console.log('\n🔄 Testing login...');

    // Test login dengan username
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('❌ User not found:', error);
      return;
    }

    if (user.password !== 'Admin123') {
      console.error('❌ Password mismatch');
      return;
    }

    console.log('✅ Login test successful!');
    console.log('   ID:', user.id);
    console.log('   Username:', user.username);
    console.log('   Email:', user.email);
    console.log('   Full Name:', user.full_name);
    console.log('   Role:', user.role);

    // Update last_login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    console.log('✅ Last login updated');

  } catch (error) {
    console.error('❌ Login test failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting admin user setup...\n');
  
  await setupAdmin();
  await testLogin();
  
  console.log('\n✅ Setup completed!');
  console.log('\n📝 Login credentials:');
  console.log('   Username: admin');
  console.log('   Email: admin@hadiorigin.com');
  console.log('   Password: Admin123');
  console.log('\n🌐 Access admin panel at: http://localhost:5174/auth');
}

main().catch(console.error);