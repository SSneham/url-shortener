const express = require('express');
const statsController = require('../controllers/stats.controller');

const router = express.Router();

router.get('/:shortCode', statsController.getStats);

module.exports = router;
