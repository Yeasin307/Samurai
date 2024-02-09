const { Schema, model } = require("mongoose");

const stopSchema = new Schema({
    station_id: Number,
    arrival_time: [String],
    departure_time: [String],
    fare: Number
});

const trainSchema = Schema({
    train_id: {
        type: Number,
    },
    train_name: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    stops: {
        type: [stopSchema],
    }
}, { timestamps: true });

module.exports = model("Train", trainSchema);