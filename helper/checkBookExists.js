const createError = require('http-errors');
const Book = require('../models/Book');

const checkBookExists = async (id) => {
    try {
        const bookExists = await Book.findOne({ id });
        if (!bookExists) {
            throw createError(400, `book with id: ${id} was not found`)
        }

        return bookExists;
    } catch (error) {
        throw error;
    }
}

module.exports = { checkBookExists };