import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path'

import config, { database } from '../config';
import logger, {stream} from './network/logger';

import rdb from './sequelize';

const app = express();

/** logging setup */
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