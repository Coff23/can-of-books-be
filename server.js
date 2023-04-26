'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./models/books');

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});

app.get('/books', async (req, res, next) => {
  try {
    let allBooks = await Book.find({});
    console.log(allBooks);
    res.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});

app.post('/books', postBook);

async function postBook(req, res, next) {
  try {
    console.log(req.body);
    let bookData = req.body;

    let createdBook = await Book.create(bookData);

    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookID', deleteBook);

async function deleteBook(req, res, next) {
  try {
    console.log(req.params);

    let id = req.params.bookID;

    await Book.findByIdAndDelete(id);

    res.status(200).send('Book Deleted!');
  } catch (error) {
    next(error);
  }
}

app.put('/books/:bookID', updateBook);

async function updateBook(req, res, next) {
  try {
    let id = req.params.bookID;
    let bookData = req.body;

    let updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true, overwrite: true });

    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not Available');
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});
