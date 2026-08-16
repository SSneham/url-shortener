const express = require('express');
const shortenController = require('../controllers/shorten.controller');
const validateLongUrl = require('../middleware/validateUrl');

const router = express.Router();

router.post('/', validateLongUrl, shortenController.shorten);

module.exports = router;
