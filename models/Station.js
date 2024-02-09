const { Schema, model } = require("mongoose");

const stationSchema = Schema({
    station_id: {
        type: Number,
    },
    station_name: {
        type: String,
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
}, { timestamps: true });

module.exports = model("Station", stationSchema);