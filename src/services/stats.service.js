const urlRepository = require('../db/url.repository');
const clickRepository = require('../db/click.repository');
const { AppError } = require('../utils/errors');

async function getStats(shortCode) {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    throw new AppError('Short code not found', 404);
  }

  const stats = await clickRepository.getStatsByUrlId(url.id);

  return {
    shortCode: url.short_code,
    longUrl: url.long_url,
    createdAt: url.created_at,
    isActive: url.is_active,
    expiresAt: url.expires_at,
    ...stats,
  };
}

module.exports = { getStats };
