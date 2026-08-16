CREATE TABLE IF NOT EXISTS urls (
  id          BIGSERIAL PRIMARY KEY,
  short_code  VARCHAR(12) UNIQUE,
  long_url    TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls (short_code);
