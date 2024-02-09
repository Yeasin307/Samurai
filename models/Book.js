const { Schema, model } = require("mongoose");

const bookSchema = Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
}, { timestamps: true });

module.exports = model("Book", bookSchema);