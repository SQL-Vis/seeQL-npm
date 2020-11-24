const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  countryOfOrigin: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})

module.exports = Artist
