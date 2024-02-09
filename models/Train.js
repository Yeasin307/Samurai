const { Schema, model } = require("mongoose");

const trainSchema = Schema({
    train_id: {
        type: Number,
        unique: true,
        require: true
    },
    train_name: {
        type: String,
    },
    capacity: {
        type: Number,
    },
}, { timestamps: true });

module.exports = model("Train", trainSchema);