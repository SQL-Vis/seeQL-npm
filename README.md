## Summary

Welcome to seeQL, a library that assists with building a SQL query by displaying a visualization of a potential search together with the search results.

## Tutorial

1.  Submit a custom query: To submit a query, type a query into the form and click submit.

2.  Select a sample query or prior cutom query: To view a sample query or to return to a prior custom query select an option from the dropdown menu.

3.  View results: The results of the current query can be viewed in the results table. The key can be used for identifying denotations represented by icons in the schema diagram.

## Supported Grammer

Currently, only select statements are supported.

## Start

Running `npm install` and `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

#### Sample Queries

select songs.title, artists.age from songs right join artists on songs.artistId = artists.id

select \* from artists
select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28

select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28 and artists.age < 35

select songs.title, songs.length, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28 and artists.age < 35 and songs.length < 250

select count(\*) from songs // we need to make sure that our selector code can not throw an error with this.

select songs.title, artists.name, albums.title
from songs left join artists on songs."artistId" = artists.id left join albums on songs."albumId" = albums.id

select songs.title as songTitle, albums.title as albumTitle, artists.name from songs left join artists on songs."artistId" = artists.id left join albums on songs."albumId" = albums.id

