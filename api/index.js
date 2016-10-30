import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path'

import config, { database } from './config';
import logger, {stream} from './config/logger';
import passport from './config/passport';

import rdb from './data/sequelize';

const app = express();

// auth
app.use(passport.initialize());
app.use(passport.session());

// logging
app.use(morgan("combined",{ "stream": stream }));

// request 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

rdb.sequelize.sync().then( () => {
  app.listen(config.api.port, () => {
    console.log(`API ===> 🎉  Express Server listening on ${config.api.host}:${config.api.port}`);
  });
});