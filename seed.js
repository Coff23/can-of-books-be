'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(preocess.env.DB_URL);

const Book = require('./models/books');

async function seed() {
    await Book.create({
        title:'Moby Dick',
        description: 'A whale',
        status: true
    });

    console.log('moby dick was created');

    await Book.create() ({
        title: 'Atomic Habits',
        description: 'About fixing habits',
        status: true
    });

    console.log('atomic habits was created');

    await Book.create() ({
        title: 'Harry Potter',
        description: 'You are a wizard',
        status: true
    });

    console.log('harry potter was created');

    mongoose.disconnect();
}

seed();
