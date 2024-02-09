const Station = require('../models/Station');
const Train = require('../models/Train');
const { checkStationExists } = require('../helper/checkStationExists');
const { successResponse } = require('./responseController');
const createError = require('http-errors');

const createStation = async (req, res, next) => {
    try {
        const newStation = await Station.create(req.body);

        return successResponse(res, {
            statusCode: 201,
            body: {
                station_id: newStation.station_id,
                station_name: newStation.station_name,
                longitude: newStation.longitude,
                latitude: newStation.latitude,
            }
        });
    } catch (err) {
        next(err);
    }
}

const getSingleStation = async (req, res, next) => {
    const id = req.params.id;

    try {
        const station = await checkStationExists(id);

        const trains = await Train.find({
            stops: {
                $elemMatch: {
                    station_id: id
                }
            }
        });

        const formatedTrains = trains.map((train) => {
            let arrival_time, departure_time;

            train.stops.forEach(stop => {
                if (stop.station_id == id) {
                    arrival_time = stop.arrival_time;
                    departure_time = stop.departure_time;
                }
            });

            return {
                train_id: train.train_id,
                arrival_time,
                departure_time
            }
        });

        formatedTrains.sort((a, b) => {
            if (a.departure_time === null && b.departure_time !== null) {
                return -1;
            } else if (a.departure_time !== null && b.departure_time === null) {
                return 1;
            } else {
                if (a.departure_time === b.departure_time) {
                    if (a.arrival_time === null && b.arrival_time !== null) {
                        return -1;
                    } else if (a.arrival_time !== null && b.arrival_time === null) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    return a.departure_time.localeCompare(b.departure_time);
                }
            }
        });

        return successResponse(res, {
            statusCode: 200,
            body: {
                station_id: id,
                trains: formatedTrains
            }
        });

    } catch (err) {
        next(err);
    }
}

const getAllStation = async (req, res, next) => {
    try {
        const options = { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 };

        const stations = await Station.find({}, options);

        return successResponse(res, {
            statusCode: 200,
            body: {
                stations
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createStation,
    getSingleStation,
    getAllStation
}