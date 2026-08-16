const pool = require('../config/db');

async function insertUrl(longUrl) {
  const result = await pool.query(
    'INSERT INTO urls (long_url) VALUES ($1) RETURNING id, long_url, created_at',
    [longUrl]
  );
  return result.rows[0];
}

async function setShortCode(id, shortCode) {
  const result = await pool.query(
    'UPDATE urls SET short_code = $1 WHERE id = $2 RETURNING id, short_code, long_url, is_active, expires_at, created_at',
    [shortCode, id]
  );
  return result.rows[0];
}

async function findByShortCode(shortCode) {
  const result = await pool.query(
    `SELECT id, short_code, long_url, is_active, expires_at, created_at
     FROM urls
     WHERE short_code = $1`,
    [shortCode]
  );
  return result.rows[0] || null;
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, short_code, long_url, is_active, expires_at, created_at
     FROM urls
     WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
  insertUrl,
  setShortCode,
  findByShortCode,
  findById,
};
