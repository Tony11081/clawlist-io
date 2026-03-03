#!/usr/bin/env node

// Initialize Supabase database with schema.sql
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function initDatabase() {
  console.log('📦 Reading schema.sql...');
  const schemaPath = path.join(__dirname, '../clawlist/database/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  console.log('🚀 Executing schema...');
  
  // Split by semicolons and execute each statement
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      if (error) {
        // Some errors are expected (e.g., "already exists")
        if (!error.message.includes('already exists')) {
          console.warn(`⚠️  ${error.message.substring(0, 100)}`);
        }
      }
    } catch (err) {
      console.warn(`⚠️  ${err.message.substring(0, 100)}`);
    }
  }

  console.log('✅ Schema execution complete');
}

initDatabase().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
