"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import {database} from '../../config';

let dbconfig = database[process.env.NODE_ENV || "development"];
let sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.settings);

let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;