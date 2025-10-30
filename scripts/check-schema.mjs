#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHZpdGF1cHFqdWNrdndrcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTkzMjMsImV4cCI6MjA3NzI5NTMyM30.RQhKnX611HofYoEm740ggYYQs4gTcGbsRsoS6oQpUsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  try {
    console.log('🔍 Checking users table schema...');

    // Coba ambil semua data users untuk melihat struktur
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    if (users && users.length > 0) {
      console.log('✅ Users table exists with columns:');
      console.log('Sample user data:');
      console.log(JSON.stringify(users[0], null, 2));
      
      console.log('\nAll users:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username || user.email || user.id} - ${user.role || 'no role'}`);
      });
    } else {
      console.log('⚠️ Users table is empty');
    }

  } catch (error) {
    console.error('❌ Failed to check schema:', error.message);
  }
}

checkSchema();