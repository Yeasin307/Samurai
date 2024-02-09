const createError = require('http-errors');
const User = require('../models/User');

const checkUserExists = async (user_id) => {
    try {
        const userExists = await User.findOne({ user_id });
        if (!userExists) {
            throw createError(400, `book with id: ${user_id} was not found`)
        }

        return userExists;
    } catch (error) {
        throw error;
    }
}

module.exports = { checkUserExists };