const express = require('express');
const redirectController = require('../controllers/redirect.controller');

const router = express.Router();

router.get('/:shortCode', redirectController.redirect);

module.exports = router;
