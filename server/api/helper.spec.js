/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const {
  getOrderBy,
  getSelectedColumns,
  getJoin,
  formatTablesColumns,
  getWhere
} = require('./parserHelper')
const db = require('../db')

describe('Helper functions', async () => {
  const visInfo = {
    select: [],
    all: [],
    join: [],
    orderby: {ASC: [], DESC: []},
    where: []
  }
  const getAst = query => {
    const ast = parser.astify(query)
    return ast
  }

  const [results, metadata] = await db.query(
    "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='public'"
  )

  beforeEach(function() {
    visInfo.select = []
    visInfo.all = []
    visInfo.join = []
    visInfo.orderby = {ASC: [], DESC: []}
    visInfo.where = []
  })

  describe('formatTablesColumns', () => {
    it('takes the result from a db query and returns array of objects with table names and columns', async () => {
      const tableArray = formatTablesColumns(results)
      expect(tableArray).to.be.an('array')
      expect(tableArray.length).to.eql(3)
      expect(tableArray[0]).to.be.an('object')
    })
  }) // end describe('formatTableColumns')

  describe('getOrderBy', () => {
    beforeEach(function() {
      visInfo.orderby = {ASC: [], DESC: []}
    })

    it('takes the result from a db query and returns array of objects with table names and columns', async () => {
      const ast = getAst('select name, age from artists order by age asc')
      const tableArray = formatTablesColumns(results)
      const order = getOrderBy(ast, visInfo, tableArray)
      expect(order).to.eql('success')
      expect(visInfo.orderby.ASC.length).to.eql(1)
      expect(visInfo.orderby.ASC[0]).to.eql('artistsage')
    })
    it('works on complicated queries', async () => {
      const ast = getAst(
        'select artists.name, artists.age, songs.length from artists left join songs on songs."artistId" = artists.id order by artists.age, songs.length desc'
      )
      const tableArray = formatTablesColumns(results)
      const order = getOrderBy(ast, visInfo, tableArray)
      expect(order).to.eql('success')
      expect(visInfo.orderby.ASC.length).to.eql(1)
      expect(visInfo.orderby.DESC.length).to.eql(1)
      expect(visInfo.orderby.ASC[0]).to.eql('artistsage')
      expect(visInfo.orderby.DESC[0]).to.eql('songslength')
    })
    it('sends an error result if the query is not specific enough', async () => {
      const ast = getAst('select title from albums order by title')
      const tableArray = formatTablesColumns(results)
      const order = getOrderBy(ast, visInfo, tableArray)
      expect(order).to.eql('duplicate')
      expect(visInfo.orderby.ASC.length).to.eql(0)
      expect(visInfo.orderby.DESC.length).to.eql(0)
    })
  }) // end describe('getOrderBy')

  describe('getSelectedColumns', () => {
    beforeEach(function() {
      visInfo.select = []
      visInfo.all = []
    })

    it('gets table and column names, converts them to an id string, and adds them to the visInfo object', async () => {
      const ast = getAst('select title from songs')
      getSelectedColumns(ast, visInfo)
      expect(visInfo.select).to.be.an('array')
      expect(visInfo.select.length).to.eql(1)
      expect(visInfo.select[0]).to.eql('songstitle')
    })

    it('works with multiple columns and tables', async () => {
      visInfo.select = []
      const ast = getAst(
        'select songs.title, artists.name from songs left join artists on songs."artistId" = artists.id'
      )
      getSelectedColumns(ast, visInfo)
      expect(visInfo.select).to.be.an('array')
      expect(visInfo.select.length).to.eql(2)
      expect(visInfo.select[0]).to.eql('songstitle')
      expect(visInfo.select[1]).to.eql('artistsname')
    })

    it('works with a * selector', async () => {
      visInfo.select = []
      const ast = getAst('select * from albums')
      getSelectedColumns(ast, visInfo)
      expect(visInfo.select.length).to.eql(0)
      expect(visInfo.all.length).to.eql(1)
      expect(visInfo.all[0]).to.eql('albums')
    })
  }) // end describe('getSelectedColumns')

  describe('getJoin', () => {
    beforeEach(function() {
      visInfo.join = []
    })

    it('determines type of join and left and right sides of join and adds them to the join key on visInfo', async () => {
      const ast = getAst(
        'select songs.title, artists.name from songs left join artists on songs."artistId" = artists.id'
      )
      getJoin(ast, visInfo)
      expect(visInfo.join).to.be.an('array')
      expect(visInfo.join.length).to.eql(1)
      expect(visInfo.join[0].type).to.eql('LEFT JOIN')
      expect(visInfo.join[0].left).to.eql('songsartistId')
      expect(visInfo.join[0].right).to.eql('artistsid')
    })

    it('works with multiple joins', async () => {
      const ast = getAst(
        'select songs.title as songTitle, albums.title as albumTitle, artists.name from songs left join artists on songs."artistId" = artists.id right join albums on songs."albumId" = albums.id'
      )
      getJoin(ast, visInfo)
      expect(visInfo.join).to.be.an('array')
      expect(visInfo.join.length).to.eql(2)
      expect(visInfo.join[0].type).to.eql('LEFT JOIN')
      expect(visInfo.join[0].left).to.eql('songsartistId')
      expect(visInfo.join[0].right).to.eql('artistsid')
      expect(visInfo.join[1].type).to.eql('RIGHT JOIN')
      expect(visInfo.join[1].left).to.eql('songsalbumId')
      expect(visInfo.join[1].right).to.eql('albumsid')
    })
  }) // end describe('getJoin')

  describe('getWhere', () => {
    beforeEach(function() {
      visInfo.where = []
    })

    it('determines a where clause in a query and adds a parsed version to visInfo', async () => {
      const ast = getAst(
        'select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28'
      )
      const whereObjTest = ast.where
      const tableArray = formatTablesColumns(results)
      getWhere(whereObjTest, visInfo, tableArray)
      expect(visInfo.where).to.be.an('array')
      expect(visInfo.where.length).to.eql(1)
      expect(visInfo.where[0].operator).to.eql('>')
      expect(visInfo.where[0].value).to.eql(28)
      expect(visInfo.where[0].idStr).to.eql('artistsage')
    })

    it('works with chained where clauses', async () => {
      const ast = getAst(
        'select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28 and artists.age < 35'
      )
      const whereObjTest = ast.where
      const tableArray = formatTablesColumns(results)
      getWhere(whereObjTest, visInfo, tableArray)
      expect(visInfo.where).to.be.an('array')
      expect(visInfo.where.length).to.eql(2)
      expect(visInfo.where[0].operator).to.eql('>')
      expect(visInfo.where[0].value).to.eql(28)
      expect(visInfo.where[0].idStr).to.eql('artistsage')
      expect(visInfo.where[1].operator).to.eql('<')
      expect(visInfo.where[1].value).to.eql(35)
      expect(visInfo.where[1].idStr).to.eql('artistsage')
    })
  }) // end describe('getWhere')
}) // end describe('Helper functions)
