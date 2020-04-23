const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

require('./configs/db.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Cross Domain CORS setup
const whitelist = [process.env.CLIENT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin: ${origin}`);
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middleware Setup
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'wish2play',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 24 * 60 * 60 })
  })
);

require('./configs/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));

// routes
const index = require('./routes/index');
app.use('/api/v1', index);

module.exports = app;
