
const Sequelize = require('sequelize');
const db = require('../../config/db.js')

//much like in php, here we take the db connection from congif and define a new instance of the table we're using
const Music = db.define('music',{
    title: {
        type: Sequelize.STRING
    },
    artist: {
        type: Sequelize.STRING
    },
    music: {
        type: Sequelize.STRING
    },
    
})

module.exports = Music