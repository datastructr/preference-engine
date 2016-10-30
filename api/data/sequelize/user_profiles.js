'use strict';


module.exports = function(sequelize, DataTypes) {
  let UserProfiles = sequelize.define('user_profiles', {
    username: {
        type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true,
          unique: true,
          validate: {
          is: /^[a-z0-9\_\-]+$/i,
        }
    },
  }, {
    schema: "pe-rdb",
    underscored: true,
    freezeTableName: true,
    indexes: [{unique: true, fields: ['username']}],
    tableName: 'user_profiles',
    classMethods: {
      associate: models => {
        
      }
    }
  });

  return UserProfiles;
};