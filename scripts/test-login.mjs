#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHZpdGF1cHFqdWNrdndrcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTkzMjMsImV4cCI6MjA3NzI5NTMyM30.RQhKnX611HofYoEm740ggYYQs4gTcGbsRsoS6oQpUsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  try {
    console.log('🔄 Testing login flow...');

    // Simulasi login seperti di aplikasi
    const credentials = {
      username: 'admin',
      password: 'Admin123'
    };

    // Query user dari tabel custom users
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', credentials.username)
      .single();

    if (error || !users) {
      console.error('❌ User not found:', error);
      return;
    }

    console.log('✅ User found:', {
      id: users.id,
      username: users.username,
      password: users.password
    });

    // Check password
    if (users.password !== credentials.password) {
      console.error('❌ Password mismatch');
      console.log('Expected:', credentials.password);
      console.log('Got:', users.password);
      return;
    }

    console.log('✅ Password match!');

    // Buat user object seperti di aplikasi
    const userObj = {
      id: users.id,
      username: users.username,
      email: users.email || `${users.username}@hadiorigin.com`,
      full_name: users.full_name || users.username,
      role: users.role || 'admin',
      is_active: users.is_active !== false,
      last_login: new Date().toISOString(),
      created_at: users.created_at,
      updated_at: new Date().toISOString()
    };

    console.log('✅ Login successful! User object:');
    console.log(JSON.stringify(userObj, null, 2));

    console.log('\n🎯 Ready to test in browser:');
    console.log('1. Open: http://localhost:5174/auth');
    console.log('2. Enter username: admin');
    console.log('3. Enter password: Admin123');
    console.log('4. Click "Masuk"');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLogin();