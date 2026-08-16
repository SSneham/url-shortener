const BLOCKED_DOMAINS = ['localhost', '127.0.0.1', '0.0.0.0'];

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function isUrlExpired(expiresAt) {
  if (!expiresAt) return false;
  return new Date(expiresAt) <= new Date();
}

function getHostname(urlString) {
  try {
    return new URL(urlString).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function assertUrlNotBlocked(longUrl) {
  const hostname = getHostname(longUrl);
  if (!hostname) {
    throw new AppError('Invalid URL format', 400);
  }

  const isBlocked = BLOCKED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

  if (isBlocked) {
    throw new AppError(
      'URLs pointing to localhost or loopback addresses are not allowed',
      422
    );
  }
}

module.exports = {
  AppError,
  isUrlExpired,
  assertUrlNotBlocked,
};
