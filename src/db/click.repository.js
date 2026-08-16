const pool = require('../config/db');

async function insertClick({ urlId, referrer, userAgent, ipAddress }) {
  await pool.query(
    `INSERT INTO clicks (url_id, referrer, user_agent, ip_address)
     VALUES ($1, $2, $3, $4)`,
    [urlId, referrer || null, userAgent || null, ipAddress || null]
  );
}

async function getStatsByUrlId(urlId) {
  const totalResult = await pool.query(
    'SELECT COUNT(*)::int AS total FROM clicks WHERE url_id = $1',
    [urlId]
  );

  const dailyResult = await pool.query(
    `SELECT DATE(clicked_at) AS date, COUNT(*)::int AS count
     FROM clicks
     WHERE url_id = $1
     GROUP BY DATE(clicked_at)
     ORDER BY date DESC
     LIMIT 30`,
    [urlId]
  );

  const referrerResult = await pool.query(
    `SELECT COALESCE(referrer, 'direct') AS referrer, COUNT(*)::int AS count
     FROM clicks
     WHERE url_id = $1
     GROUP BY COALESCE(referrer, 'direct')
     ORDER BY count DESC
     LIMIT 10`,
    [urlId]
  );

  return {
    totalClicks: totalResult.rows[0].total,
    clicksByDay: dailyResult.rows,
    topReferrers: referrerResult.rows,
  };
}

module.exports = {
  insertClick,
  getStatsByUrlId,
};
