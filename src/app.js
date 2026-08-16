require('dotenv').config();

const express = require('express');
const shortenRoutes = require('./routes/shorten.routes');
const statsRoutes = require('./routes/stats.routes');
const redirectRoutes = require('./routes/redirect.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);
app.use(express.json());

app.use('/api/shorten', shortenRoutes);
app.use('/api/stats', statsRoutes);
app.use('/', redirectRoutes);

app.use(errorHandler);

module.exports = app;
