const createError = require('http-errors');
const Station = require('../models/Station');

const checkStationExists = async (station_id) => {
    try {
        const stationExists = await Station.findOne({ station_id });
        if (!stationExists) {
            throw createError(404, `station with id: ${station_id} was not found`);
        }

        return stationExists;
    } catch (error) {
        throw error;
    }
}

module.exports = { checkStationExists };