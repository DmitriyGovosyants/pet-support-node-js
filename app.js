const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const {
  // authRouter, userRouter, noticesRouter, servicesRouter,
  newsRouter } = require('./routes')
const authRouter = require('./routes/api/auth');

const { errorHandler } = require('./helpers/errorHandler');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter)
// app.use('/api/notices', noticesRouter)
// app.use('/api/services', servicesRouter)
app.use('/api/news', newsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
