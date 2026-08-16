const urlService = require('../services/url.service');

async function redirect(req, res, next) {
  try {
    const { shortCode } = req.params;
    const url = await urlService.resolveRedirect(shortCode);

    await urlService.logClick(url.id, {
      referrer: req.get('referer') || req.get('referrer'),
      userAgent: req.get('user-agent'),
      ipAddress: req.ip,
    });

    res.redirect(302, url.long_url);
  } catch (err) {
    next(err);
  }
}

module.exports = { redirect };
