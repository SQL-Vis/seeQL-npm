const compose = require('compose-middleware').compose
const path = require('path')
const express = require('express')
const api = require('./server/api')

module.exports = function(db) {
  return compose([
    function(req, res, next) {
      req.seeqlDb = db
      next()
    },

    // parsing middleware
    express.json(),

    // auth and api routes
    api, // REMEMBER TO CHANGE ROUTE TO ADD API

    // static file-serving middleware
    express.static(path.join(__dirname, './', 'public')), // REMEMBER TO ADD BUNDLE

    // error handling endware
    (err, req, res, next) => {
      // console.error(err)
      // console.error(err.stack)
      res
        .status(err.status || 500)
        .send(err.message || 'Internal server error.')
    },

    function(req, res, next) {
      delete req.seeqlDb
      next()
    }
  ])
}
