const Sequelize = require('sequelize');

//initialize new db
const db = new Sequelize('musicdb', 'root', 'Fuckthis1155', {
    host: 'database-3.cbss1pp3fyrj.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  module.exports = db