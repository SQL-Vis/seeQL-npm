/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Album = db.model('album')
const Artist = db.model('artist')
const Song = db.model('song')

describe('Models', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  describe('Album model', () => {
    it('has fields title, year, genre, label, id, artistId', async () => {
      const testAlbum = await Album.create({
        title: 'ANTI',
        year: 2016,
        genre: 'R&B',
        label: 'Roc Nation',
        id: 5
      })
      expect(testAlbum.title).to.equal('ANTI')
      expect(testAlbum.year).to.equal(2016)
      expect(testAlbum.genre).to.equal('R&B')
      expect(testAlbum.label).to.equal('Roc Nation')
      expect(testAlbum.id).to.equal(5)
    })

    it('requires title', async () => {
      const testAlbum = Album.build({title: null})
      try {
        await testAlbum.validate()
        throw Error('validation should have failed with null title field')
      } catch (err) {
        expect(err.message).to.contain(
          'notNull Violation: album.title cannot be null'
        )
      }
    })
  })
})
