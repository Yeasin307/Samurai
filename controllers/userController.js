const User = require('../models/User');
const { checkUserExists } = require('../helper/checkUserExists');
const { successResponse } = require('./responseController');

const createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        return successResponse(res, {
            statusCode: 201,
            body: {
                user_id: newUser.user_id,
                user_name: newUser.user_name,
                balance: newUser.balance
            }
        });
    } catch (err) {
        next(err);
    }
}

const getSingleUser = async (req, res, next) => {
    const user_id = req.params.id;

    try {
        const user = await checkUserExists(user_id);

        return res.status(200).json({
            user_id: user.user_id,
            user_name: user.user_name,
            balance: user.balance,
        });
    } catch (err) {
        next(err);
    }
}

const getAllUser = async (req, res, next) => {

    try {
        const users = await User.find({});

        return res.status(200).json({
            status: 200,
            body: {
                users
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    getSingleUser,
    getAllUser
}