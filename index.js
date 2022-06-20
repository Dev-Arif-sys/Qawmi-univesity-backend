const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/* import handler */
const userHandler = require('./routeHandler/userHandler');
const courseHandler = require('./routeHandler/courseHandler');
const bookHandler = require('./routeHandler/bookHandler');
const classRoomHandler = require('./routeHandler/classRoomHandler');
const comingSoonHandler = require('./routeHandler/comingSoonHandler');

/* DB connection and middleware and cors */
const connectDB = require('./config/db');
const app = express();
const port = 4000;
const cors = require('cors');
const crypto = require('crypto');

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting mongodb
connectDB();

app.get('/', async (req, res) => {
  res.send('Qawmi primary server is running');
});

app.use('/user', userHandler);
app.use('/course', courseHandler);
app.use('/book', bookHandler);
app.use('/classRoom', classRoomHandler);
app.use('/comingSoon', comingSoonHandler);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
  console.log(err);
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
