#!/usr/bin/env node

/**
 * Script untuk membuat user admin di database
 * Menggunakan data yang sudah ada di database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  try {
    console.log('🔄 Creating admin user...');

    // Data user admin yang sesuai dengan yang ada di database
    const adminUser = {
      id: 'a8abad72-60fb-48e1-8228-31ffaec0706c',
      username: 'admin',
      password: 'Admin123', // Plaintext untuk development
      email: 'admin@hadiorigin.com',
      full_name: 'Administrator',
      role: 'admin',
      is_active: true,
      last_login: '2025-10-29 08:23:55.766944+00',
      created_at: '2025-10-29 09:23:55.766944+00',
      updated_at: '2025-10-29 09:27:24.83302+00'
    };

    // Cek apakah user sudah ada
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (existingUser) {
      console.log('✅ Admin user already exists:', existingUser);
      
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
      throw error;
    }

    console.log('✅ Admin user created successfully:', data);
    return data;

  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    process.exit(1);
  }
}

async function testLogin() {
  try {
    console.log('🔄 Testing login...');

    // Test login dengan username
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .eq('is_active', true)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== 'Admin123') {
      throw new Error('Password mismatch');
    }

    console.log('✅ Login test successful:', {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role
    });

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
  
  await createAdminUser();
  console.log('');
  await testLogin();
  
  console.log('\n✅ Setup completed!');
  console.log('\n📝 Login credentials:');
  console.log('   Username: admin');
  console.log('   Email: admin@hadiorigin.com');
  console.log('   Password: Admin123');
  console.log('\n🌐 Access admin panel at: http://localhost:5174/auth');
}

// Jalankan script jika dipanggil langsung
main().catch(console.error);

export { createAdminUser, testLogin };