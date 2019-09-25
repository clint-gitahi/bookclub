"use strict";

require('dotenv').config();

module.exports = {
  development: {
    username: 'clinton',
    password: 'anonx3636',
    database: 'bookclub',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    username: 'clinton',
    password: 'anonx3636',
    database: 'bookclub_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
//# sourceMappingURL=config.js.map