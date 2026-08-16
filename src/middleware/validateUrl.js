const { URL } = require('url');

function validateLongUrl(req, res, next) {
  const { longUrl } = req.body;

  if (!longUrl || typeof longUrl !== 'string' || longUrl.trim() === '') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'longUrl is required and must be a non-empty string',
    });
  }

  let parsed;
  try {
    parsed = new URL(longUrl.trim());
  } catch {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'longUrl must be a valid URL (include protocol, e.g. https://example.com)',
    });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'longUrl must use http or https protocol',
    });
  }

  if (!parsed.hostname) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'longUrl must include a valid hostname',
    });
  }

  req.body.longUrl = parsed.href;
  next();
}

module.exports = validateLongUrl;
