const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//use json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Upsert user
app.post('/users/upsert', async (req, res, next) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        identifier: req.body.identifier,
      },
      update: { ... req.body },
      create: { ... req.body },
    });
    console.log('User upserted: ', user);
    res.status(201)
        .json({
          message: 'User upserted',
          code: 201
        });
  } catch (err) {
    next(err);
  }
});

app.post('/users/sync', async (req, res, next) => {
  try {
    const playlists = req.body.playlists;
    const albums = req.body.albums;
    const artists = req.body.artists;
    const userId = req.body.userId;

    let playlistUpsertCount = 0;
    for (const playlist of playlists) {
      const playlistUpsert = await prisma.playlist.upsert({
        where: {
          identifier: playlist.id,
        },
        update: {
          name: playlist.name,
          description: playlist.description,
          imageUri: playlist.images[0].url,
          public: playlist.public,
        },
        create: {
          identifier: playlist.id,
          name: playlist.name,
          description: playlist.description,
          imageUri: playlist.images[0].url,
          public: playlist.public,
          href: playlist.href,
          author: {
            connect: {
              identifier: playlist.owner.id,
            },
            connectOrCreate: {
              where: {
                identifier: playlist.owner.id,
              },
              create: {
                identifier: playlist.owner.id,
                name: playlist.owner.display_name,
                href: playlist.owner.href,
              },
            }
          },
        },
      });
      playlistUpsertCount++;
    }

    let AlbumUpsertCount = 0;
    for (const album of albums) {
      const item = album.album;

      const albumUpsert = await prisma.album.upsert({
        where: {
          identifier: item.id,
        },
        update: {
          popularity: item.popularity,
          availableMarkets: item.available_markets,
          images: item.images.map((i) => i.url),
        },
        create: {
          identifier: item.id,
          name: item.name,
          images: item.images.map((i) => i.url),
          releaseDate: new Date(item.release_date),
          totalTracks: item.total_tracks,
          href: item.href,
          popularity: item.popularity,
          availableMarkets: item.available_markets,
          artists: {
            connectOrCreate: item.artists.map((artist) => ({
              where: {
                identifier: artist.id,
              },
              create: {
                identifier: artist.id,
                name: artist.name,
                href: artist.href,
              },
            })),
          },
          user: {
            connect: {
              identifier: userId,
            },
          }
        },
      });

      AlbumUpsertCount++;
      // console.log('Album upserted: ', albumUpsert);
    }

    let ArtistUpsertCount = 0;
    for (const artist of artists) {
      const artistUpsert = await prisma.artist.upsert({
        where: {
          identifier: artist.id,
        },
        update: {
          name: artist.name,
          popularity: artist.popularity,
          href: artist.href,
          images: artist.images.map((i) => i.url),
          followers: artist.followers.total,
          genres: artist.genres,
        },
        create: {
          identifier: artist.id,
          name: artist.name,
          popularity: artist.popularity,
          href: artist.href,
          images: artist.images.map((i) => i.url),
          followers: artist.followers.total,
          genres: artist.genres,
        },
      });
    }

    res.status(201)
        .json({
          message: `Upserted ${AlbumUpsertCount} albums, ${playlistUpsertCount} playlists & ${ArtistUpsertCount} artists.`,
          code: 201
        });
  } catch (err) {
    next(err);
  }
});

// get all users
app.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//get user by id
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//create user
app.post('/users', async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: { ...req.body },
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//update user
app.put('/users/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//delete user
app.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// Find song by title or artist
app.get('/songs', async (req, res, next) => {
  try {
    const songs = await prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: req.query.search.toString() } },
          { artist: { contains: req.query.search.toString() } },
        ],
      },
    });
    res.status(200).json(songs);
  } catch (err) {
    next(err);
  }
});

//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
