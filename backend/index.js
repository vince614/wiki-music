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
    res.status(201).json(user);
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
