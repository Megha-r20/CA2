const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Movie = require('./schema.js');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.get('/item', (req, res) => {
    res.status(200).json({ message: 'Harry Potter' });
});

app.post('/item', async (req, res) => {
    try {
        const { Bookname, author, genre } = req.body;
        if (!Bookname || !author || !genre) {
            return res.status(404).json({ error: 'Book data not received' });
        }

        const newBook = new Book({ Bookname });
        await newBook.save();

        return res.status(201).json({ message: 'Book added successfully', Book: newBook });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});

const db = async () => {
    try {
        await mongoose.connect(process.env.MODUL_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Server Connected');
    } catch (e) {
        console.error('MongoDB connection error:', e);
    }
};
db();

app.put('/Book/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(400).json({ error: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error occurred while updating Book' });
    }
});

app.delete('/Book/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(400).json({ error: 'Book not found' });

        res.json({ message: 'Book successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error occurred while deleting Book' });
    }
});

app.listen(port, () => {
    console.log(`Connected Successfully: http://localhost:${port}`);
});



const mongoose = require('mongoose');

