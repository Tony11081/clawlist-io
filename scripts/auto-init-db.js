#!/usr/bin/env node

// Auto-initialize Supabase database
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function autoInit() {
  console.log('🚀 Auto-initializing database...');
  
  // Check if skills table exists
  const { data: existing, error: checkError } = await supabase
    .from('skills')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('✅ Database already initialized');
    return true;
  }

  console.log('📦 Database not initialized. Creating tables via SQL...');
  
  // Supabase doesn't allow DDL via REST API, so we'll use a workaround:
  // Create a minimal schema using the SQL editor endpoint
  
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];
  const sqlEditorUrl = `https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`;
  
  // Try to execute schema via RPC (if enabled)
  const fs = require('fs');
  const path = require('path');
  const schemaPath = path.join(__dirname, '../../clawlist/database/schema.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema file not found:', schemaPath);
    console.log('📝 Manual action required:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Paste contents of ~/clawd/projects/clawlist/database/schema.sql');
    console.log('   3. Run the SQL');
    console.log('   4. Then run: node scripts/seed-skills.js');
    return false;
  }

  console.log('⚠️  Supabase requires manual SQL execution.');
  console.log('📝 Next steps:');
  console.log('   1. Open: https://supabase.com/dashboard/project/' + projectRef + '/editor');
  console.log('   2. Copy schema: cat ~/clawd/projects/clawlist/database/schema.sql | pbcopy');
  console.log('   3. Paste and run in SQL Editor');
  console.log('   4. Then run: npm run seed');
  
  return false;
}

autoInit().then(success => {
  if (success) {
    console.log('✅ Ready to seed data');
    process.exit(0);
  } else {
    process.exit(1);
  }
});
