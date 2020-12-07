/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('Query routes', () => {
  describe('/api/query/result', () => {
    const query2 = {query: 'select name from artists'}
    it('POST /api/query/result', async () => {
      const res = await request(app)
        .post('/api/query/result')
        .send(query2)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.columns).to.be.an('array')
      expect(res.body.rows).to.be.an('array')
      expect(res.body.columns[0]).to.be.equal('name')
      expect(res.body.rows[0]).to.be.an('object')
    })
  }) // end describe('/api/result')

  describe('/api/query/', () => {
    const query = {query: 'select title from songs'}

    it('POST /api/query', async () => {
      const res = await request(app)
        .post('/api/query')
        .send(query)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.select[0]).to.be.equal('songstitle')
    })
  }) // end describe('/api/query')
}) // end describe('Query routes')
