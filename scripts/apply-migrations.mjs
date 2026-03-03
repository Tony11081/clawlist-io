import { readdirSync, readFileSync } from 'fs'
import path from 'path'

import pg from 'pg'

const { Client } = pg

function buildClientConfig() {
  if (process.env.SUPABASE_DB_URL) {
    return {
      connectionString: process.env.SUPABASE_DB_URL,
      ssl: { rejectUnauthorized: false },
    }
  }

  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname.split('.')[0]
    : undefined

  if (!projectRef || !process.env.SUPABASE_DB_PASSWORD) {
    throw new Error('Missing SUPABASE_DB_URL or SUPABASE_DB_PASSWORD for migrations')
  }

  return {
    host: process.env.SUPABASE_DB_HOST ?? 'aws-0-us-east-1.pooler.supabase.com',
    port: Number(process.env.SUPABASE_DB_PORT ?? 6543),
    database: process.env.SUPABASE_DB_NAME ?? 'postgres',
    user: process.env.SUPABASE_DB_USER ?? `postgres.${projectRef}`,
    password: process.env.SUPABASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  }
}

async function applyMigrations() {
  const client = new Client(buildClientConfig())
  const migrationsDir = path.join(process.cwd(), 'scripts', 'migrations')
  const migrationFiles = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  await client.connect()

  try {
    for (const migrationFile of migrationFiles) {
      const migration = readFileSync(path.join(migrationsDir, migrationFile), 'utf8')
      console.log(`Applying ${migrationFile}`)
      await client.query(migration)
    }
  } finally {
    await client.end()
  }
}

applyMigrations().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
