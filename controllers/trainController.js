const Train = require('../models/Train');
const { checkTrainExists } = require('../helper/checkTrainExists');
const { successResponse } = require('./responseController');

const createTrain = async (req, res, next) => {
    try {
        const newTrain = await Train.create(req.body);

        let start, end;

        newTrain.stops.forEach(stop => {
            if (stop.arrival_time === null) {
                start = stop.departure_time;
            } else if (stop => stop.departure_time === null) {
                end = stop.arrival_time;
            }
        });

        return successResponse(res, {
            statusCode: 201,
            body: {
                train_id: newTrain.train_id,
                train_name: newTrain.train_name,
                capacity: newTrain.capacity,
                service_start: start,
                service_ends: end
            }
        });
    } catch (err) {
        next(err);
    }
}

const getSingleTrain = async (req, res, next) => {
    const train_id = req.params.id;

    try {
        const train = await checkTrainExists(train_id);

        return successResponse(res, {
            body: {
                train: {
                    train_id: train.train_id,
                    train_name: train.train_name,
                    capacity: train.capacity,
                }
            }
        });
    } catch (err) {
        next(err);
    }
}

const getAllTrain = async (req, res, next) => {
    try {
        const options = { _id: 0, stops: 0, createdAt: 0, updatedAt: 0, __v: 0 };

        const trains = await Train.find({}, options);

        return successResponse(res, {
            statusCode: 200,
            body: {
                trains
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createTrain,
    // updateTrain,
    getSingleTrain,
    getAllTrain
}