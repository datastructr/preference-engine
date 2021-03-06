'use strict';

import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  var Users = sequelize.define('users', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,55]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,55]
      }
    },
    account_type: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
        unique: true,
        len: [1,255]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true,
        len: [6,55]
      }
    }
  }, {
    schema: "pe-rdb",
    underscored: true,
    freezeTableName: true,
    indexes: [{unique: true, fields: ['email']}],
    tableName: 'users',
    classMethods: {
      associate: models => {
        /** TODO associations */
      }
    },
    instanceMethods: {
      authenticate: (value) => {
        if (bcrypt.compareSync(value, this.password)) {
          return this;
        }
        else {
          return false;
        }
      }
    }
  });

  let generateHash = (user, options, callback) => {
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) { return callback(err); };
      user.set('password', hash);
      return callback(null, options);
    });
  };

  Users.beforeCreate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password) {
      generateHash(user, options, callback);
    }
    else {
      return callback(null, options);
    }
  });

  Users.beforeUpdate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password) {
      generateHash(user, options, callback);
    }
    else {
      return callback(null, options);
    }
  });

  return Users;
};