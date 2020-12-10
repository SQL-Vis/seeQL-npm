# seeQL-ware

_seeQL-ware is SQL query visualization middleware for Node.js. seeQL-ware allows users to test and visualize SQL queries using a connected PostgreSQL database._

## Demo

View an example seeQL-ware interface with dummy data at https://seeql-app.herokuapp.com. This demo is set up with a default database that has three tables of data – songs, albums, and artists.

## Project Requirements

* Express server
* PostgreSQL database
* Node.js environment

## Getting Started

### Install Connect

```sh
$ npm install seeql-ware --save-dev
```

## Hook Up Your Project

### Import seeQL-ware

In your server initiation file, require this library:

```js
const seeql = require('seeql-ware')
```

### Import Your Database Instance

Ensure that your database is accessible from server initiation file. This might look like:

```js
const db = require('../db')
```

### Add seeQL Middleware Route

Add a route for your seeql visualization. This _must_ be mounted on `/seeql`. The `seeql` middleware function (variable declared in import) takes your database as an argument.

```js
app.use('/seeql', seeql(db))
```

### Run Your App!

When you run your project, navigate to: `http://your-home-route/seeql` to get started with query testing and visualization!

### Data Security

**_Before you deploy for production, remember to remove your seeql middleware._** Alternatively, wrap your middleware route in a run environment conditional, for instance:

```js
if (process.env.NODE_ENV !== 'production') {
  app.use('/seeql', seeql(db))
}
```

## Use seeQL-ware

To submit a custom query, type a query into the form and click submit.

To view a sample query, select a sample query or prior custom query from the dropdown menu.

The results of the current query can be viewed in the results table. The key can be used for identifying denotations represented by icons in the schema diagram.

## Supported Grammar

Currently, only select statements are supported. seeQL follows SQL grammar conventions for PostgreSQL. Enclose string values in single quotes, and enclose column names with uppercase letters in double quotes.\
\
For example,

```
select songs.title, artists.age from songs right join artists on songs.artistId = artists.id;
```

would be correct, whereas

```
select title, age from songs right join artists on songs.artistId = artists.id;
```

would be incorrect.\
\
Querying the column artistId from the table artists would look like `"artistId".artists`, and creating a join where the table songs' FK albumId is equal to the table albums' PK id woud look like `songs."albumId" = albums.id`.

## People

seeQL-ware wouldn't exist without all the people involved!

The original authors of seeQL-ware are [Riley Butterfield](https://github.com/rileybutterfield), [Laura Campbell](https://github.com/lmmcampbell), and [Vivian Xu](https://github.com/vivianxu1230).

Special thanks to Natalie Lane & Johnny O'Mara for their guidance on this project!

## Want To Contribute?

Make a pull request [here](https://github.com/SQL-Vis/seeql-npm.git)!
