"use strict";

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Use node-config
import {docstore} from '../../config';

let dsconfig = docstore[process.env.NODE_ENV || "development"];

mongoose.connection.on('error', (error) => {
  console.log(error);
});

mongoose.connection.on('open', () => {
  console.log(`Connected to ${config.mongoose.uri}`);
});

mongoose.connect(dsconfig.url, dsconfig.options);

let models = {};

fs
  .readdirSync(__dirname)
  .filter((filename) => {
    return (filename.indexOf('.') !== 0) && (filename !== "index.js");
  })
  .forEach((filename) => {
    var filepath = path.join(__dirname, filename)
    var imported = (require(filepath).default) ?
      require(filepath).default :
      require(filepath);

    if (typeof imported.modelName !== 'undefined') {
      models[imported.modelName] = imported;
    }
  });


models._mongoose = mongoose;


export default models;