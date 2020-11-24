const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  length: {
    type: Sequelize.INTEGER
  },
  featuredArtists: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  artistId: {
    type: Sequelize.INTEGER
  },
  albumId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Song
