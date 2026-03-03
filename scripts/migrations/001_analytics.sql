CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  skill_slug TEXT,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT,
  value NUMERIC(12, 2),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS analytics_event_type_idx
  ON analytics (event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS analytics_skill_id_idx
  ON analytics (skill_id, created_at DESC);

CREATE INDEX IF NOT EXISTS analytics_visitor_id_idx
  ON analytics (visitor_id, created_at DESC);
