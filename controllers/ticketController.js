const User = require('../models/User');
// const { checkUserExists } = require('../helper/checkUserExists');
// const { successResponse } = require('./responseController');
const { v4: uuidv4 } = require('uuid');

const createTicket = async (req, res, next) => {
    try {
        const {
            wallet_id, time_after, station_from, station_to
        } = req.body;

        const userInfo = await User.findOne({ user_id: wallet_id });


        return successResponse(res, {
            statusCode: 201,
            body: {
                ticket_id: uuidv4(),
                wallet_id,
                balance: userInfo.balance,
                stations
            }
        });
    } catch (err) {
        next(err);
    }
}

// const getSingleTicket = async (req, res, next) => {
//     const user_id = req.params.id;

//     try {
//         const user = await checkUserExists(user_id);

//         return res.status(200).json({
//             user_id: user.user_id,
//             user_name: user.user_name,
//             balance: user.balance,
//         });
//     } catch (err) {
//         next(err);
//     }
// }

// const getAllUser = async (req, res, next) => {

//     try {
//         const users = await User.find({});

//         return res.status(200).json({
//             status: 200,
//             body: {
//                 users
//             }
//         });
//     } catch (err) {
//         next(err);
//     }
// }

module.exports = {
    createTicket,
    // getSingleUser,
    // getAllUser
}