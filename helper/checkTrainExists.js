const createError = require('http-errors');
const Train = require('../models/Train');

const checkTrainExists = async (train_id) => {
    try {
        const trainExists = await Train.findOne({ train_id });
        if (!trainExists) {
            throw createError(400, `book with id: ${train_id} was not found`);
        }

        return trainExists;
    } catch (error) {
        throw error;
    }
}

module.exports = { checkTrainExists };