const Book = require('../models/Book');
const { checkBookExists } = require('../helper/checkBookExists');

const createBook = async (req, res, next) => {
    try {
        const { id, title, author, genre, price } = req.body;

        const newBook = await Book.create({
            id, title, author, genre, price
        });

        return res.status(201).json({
            id: newBook.id,
            title: newBook.title,
            author: newBook.author,
            genre: newBook.genre,
            price: newBook.price
        });
    } catch (err) {
        next(err);
    }
}

const updateBook = async (req, res, next) => {
    const id = req.params.id;

    try {
        await checkBookExists(id);

        const updatedBook = await Book.findOneAndUpdate(
            { id },
            {
                $set: req.body,
            },
            { new: true }
        );

        return res.status(200).json({
            id: updatedBook.id,
            title: updatedBook.title,
            author: updatedBook.author,
            genre: updatedBook.genre,
            price: updatedBook.price
        });
    } catch (err) {
        next(err);
    }
}

const getSingleBook = async (req, res, next) => {
    const id = req.params.id;

    try {
        const book = await checkBookExists(id);

        return res.status(200).json({
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            price: book.price
        });
    } catch (err) {
        next(err);
    }
}

const getAllBook = async (req, res, next) => {

    const { author, title, genre, sort, order } = req.query;

    // add search criteria
    const filter = {};
    if (author) {
        filter.author = author;
    }
    if (title) {
        filter.title = title;
    }
    if (genre) {
        filter.genre = genre;
    }

    // add sort and order options
    const sortOptions = {};
    if (sort) {
        sortOptions[sort] = order === 'ASC' ? 1 : -1;
    }

    const options = { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 };

    try {
        const books = await Book.find(filter, options).lean().sort(sortOptions);

        return res.status(200).json({
            books
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBook,
    updateBook,
    getSingleBook,
    getAllBook
}