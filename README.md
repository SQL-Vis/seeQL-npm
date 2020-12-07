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
