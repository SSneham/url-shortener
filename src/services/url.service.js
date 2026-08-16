const urlRepository = require('../db/url.repository');
const clickRepository = require('../db/click.repository');
const { toBase62 } = require('../utils/base62');
const { assertUrlNotBlocked, isUrlExpired, AppError } = require('../utils/errors');

async function shortenUrl(longUrl) {
  assertUrlNotBlocked(longUrl);

  const inserted = await urlRepository.insertUrl(longUrl);
  const shortCode = toBase62(inserted.id);
  const url = await urlRepository.setShortCode(inserted.id, shortCode);

  return {
    shortCode: url.short_code,
    longUrl: url.long_url,
    shortUrl: `${process.env.BASE_URL}/${url.short_code}`,
    createdAt: url.created_at,
  };
}

async function resolveRedirect(shortCode) {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    throw new AppError('Short code not found', 404);
  }

  if (!url.is_active) {
    throw new AppError('This short link has been deactivated', 410);
  }

  if (isUrlExpired(url.expires_at)) {
    throw new AppError('This short link has expired', 410);
  }

  return url;
}

async function logClick(urlId, { referrer, userAgent, ipAddress }) {
  await clickRepository.insertClick({
    urlId,
    referrer,
    userAgent,
    ipAddress,
  });
}

module.exports = {
  shortenUrl,
  resolveRedirect,
  logClick,
};
