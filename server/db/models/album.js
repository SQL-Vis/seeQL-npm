const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER
  },
  genre: {
    type: Sequelize.STRING
  },
  label: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  artistId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Album
