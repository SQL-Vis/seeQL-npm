'use strict'

const db = require('../server/db')
const {User, Artist, Album, Song} = require('../server/db/models')

const songArray = [
  {
    title: 'The 1',
    length: 210,
    featuredArtists: [''],
    artistId: 1,
    albumId: 1,
    id: 1
  },
  {
    title: 'Cardigan',
    length: 240,
    featuredArtists: [''],
    artistId: 1,
    albumId: 1,
    id: 2
  },
  {
    title: 'The Last Great American Dynasty',
    length: 231,
    featuredArtists: [''],
    artistId: 1,
    albumId: 1,
    id: 3
  },
  {
    title: 'Exile',
    length: 286,
    featuredArtists: ['Bon Iver'],
    artistId: 1,
    albumId: 1,
    id: 4
  },
  {
    title: 'I Forgot That You Existed',
    length: 171,
    featuredArtists: [''],
    artistId: 1,
    albumId: 2,
    id: 5
  },
  {
    title: 'Cruel Summer',
    length: 178,
    featuredArtists: [''],
    artistId: 1,
    albumId: 2,
    id: 6
  },
  {
    title: 'Lover',
    length: 221,
    featuredArtists: [''],
    artistId: 1,
    albumId: 2,
    id: 7
  },
  {
    title: 'The Man',
    length: 190,
    featuredArtists: [''],
    artistId: 1,
    albumId: 2,
    id: 8
  },
  {
    title: 'Shut Up',
    length: 158,
    featuredArtists: [''],
    artistId: 2,
    albumId: 3,
    id: 9
  },
  {
    title: '34 + 35',
    length: 194,
    featuredArtists: [''],
    artistId: 2,
    albumId: 3,
    id: 10
  },
  {
    title: 'Motive',
    length: 168,
    featuredArtists: ['Doja Cat'],
    artistId: 2,
    albumId: 3,
    id: 11
  },
  {
    title: 'Just Like Magic',
    length: 150,
    featuredArtists: [''],
    artistId: 2,
    albumId: 3,
    id: 12
  },
  {
    title: 'Pray You Catch Me',
    length: 196,
    featuredArtists: [''],
    artistId: 3,
    albumId: 4,
    id: 13
  },
  {
    title: 'Hold Up',
    length: 221,
    featuredArtists: [''],
    artistId: 3,
    albumId: 4,
    id: 14
  },
  {
    title: "Don't Hurt Yourself",
    length: 234,
    featuredArtists: ['Jack White'],
    artistId: 3,
    albumId: 4,
    id: 15
  },
  {
    title: 'Sorry',
    length: 233,
    featuredArtists: [''],
    artistId: 3,
    albumId: 4,
    id: 16
  }
]

const albumArray = [
  {
    title: 'FolkLore',
    year: 2020,
    genre: 'Indie Folk',
    label: 'Republic Records',
    artistId: 1,
    id: 1
  },
  {
    title: 'Lover',
    year: 2019,
    genre: 'Pop',
    label: 'Republic Records',
    artistId: 1,
    id: 2
  },
  {
    title: 'Positions',
    year: 2020,
    genre: 'Pop R&B',
    label: 'Republic Records',
    artistId: 2,
    id: 3
  },
  {
    title: 'Lemonade',
    year: 2016,
    genre: 'R&B',
    label: 'Columbia Records',
    artistId: 3,
    id: 4
  }
]

const artistArray = [
  {
    name: 'Taylor Swift',
    countryOfOrigin: 'USA',
    age: '31',
    id: 1
  },
  {
    name: 'Ariana Grande',
    countryOfOrigin: 'USA',
    age: '27',
    id: 2
  },
  {
    name: 'Beyonce',
    countryOfOrigin: 'USA',
    age: '39',
    id: 3
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const artists = await Promise.all(
    artistArray.map(artist => {
      return Artist.create(artist)
    })
  )

  const albums = await Promise.all(
    albumArray.map(album => {
      return Album.create(album)
    })
  )

  const songs = await Promise.all(
    songArray.map(song => {
      return Song.create(song)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
