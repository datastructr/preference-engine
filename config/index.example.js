export const database = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_NAME || "pe-rdb",
    "settings": {
      "host": process.env.DB_HOST || "127.0.0.1",
      "dialect": "postgres",
      "logging": false
    }
  },
  "test": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_NAME || "pe-rdb",
    "settings": {
      "host": process.env.DB_HOST || "127.0.0.1",
      "dialect": "postgres",
      "logging": false
    }
  },
  "production": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_NAME || "pe-rdb",
    "settings": {
      "host": process.env.DB_HOST || "127.0.0.1",
      "dialect": "postgres",
      "logging": false
    }
  }
};

export default {

  "global": {
    env: process.env.NODE_ENV || "development"
  }, 

  "api": {
    "port": process.env.API_PORT || 3000,
    "host": process.env.API_HOST || "localhost"
  },

  "client": {
    "port": process.env.CLIENT_PORT || 3001,
    "host": process.env.CLIENT_HOST || "localhost"
  },

  "database": database[process.env.NODE_ENV],
  }

};
