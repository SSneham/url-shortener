CREATE TABLE IF NOT EXISTS clicks (
  id          BIGSERIAL PRIMARY KEY,
  url_id      BIGINT NOT NULL REFERENCES urls (id) ON DELETE CASCADE,
  referrer    TEXT,
  user_agent  TEXT,
  ip_address  INET,
  clicked_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_url_id ON clicks (url_id);
CREATE INDEX IF NOT EXISTS idx_clicks_clicked_at ON clicks (clicked_at);
