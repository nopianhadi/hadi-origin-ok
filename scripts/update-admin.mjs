#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHZpdGF1cHFqdWNrdndrcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTkzMjMsImV4cCI6MjA3NzI5NTMyM30.RQhKnX611HofYoEm740ggYYQs4gTcGbsRsoS6oQpUsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAdmin() {
  try {
    console.log('🔄 Updating admin user...');

    // Update user admin dengan password yang benar
    const { data, error } = await supabase
      .from('users')
      .update({ 
        password: 'Admin123'
      })
      .eq('username', 'admin')
      .select();

    if (error) {
      console.error('❌ Error updating admin:', error);
      return;
    }

    console.log('✅ Admin user updated:', data);

    // Test login
    const { data: user, error: loginError } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (loginError) {
      console.error('❌ Login test failed:', loginError);
      return;
    }

    if (user.password === 'Admin123') {
      console.log('✅ Login test successful!');
      console.log('   Username:', user.username);
      console.log('   Password:', user.password);
      console.log('   Email:', user.email);
    } else {
      console.log('❌ Password mismatch');
    }

  } catch (error) {
    console.error('❌ Failed to update admin:', error.message);
  }
}

updateAdmin();