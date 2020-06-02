const Sequelize = require('sequelize');
const db = require('../../config/db.js')

//much like in php, here we take the db connection from congif and define a new instance of the table we're using
const User = db.define('users',{
    username: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.STRING
    },
    pw: {
        type: Sequelize.STRING
    },
    
})

module.exports = User