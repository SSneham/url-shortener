const urlService = require('../services/url.service');

async function shorten(req, res, next) {
  try {
    const result = await urlService.shortenUrl(req.body.longUrl);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { shorten };
