const User = require('../models/User');
const { checkUserExists } = require('../helper/checkUserExists');

const createUser = async (req, res, next) => {
    try {
        // const { user_id, user_name, balance } = req.body;

        const newUser = await User.create(req.body);

        return res.status(201).json({
            user_id: newUser.user_id,
            user_name: newUser.user_name,
            balance: newUser.balance
        });
    } catch (err) {
        next(err);
    }
}

// const updateBook = async (req, res, next) => {
//     const id = req.params.id;

//     try {
//         await checkBookExists(id);

//         const updatedBook = await Book.findOneAndUpdate(
//             { id },
//             {
//                 $set: req.body,
//             },
//             { new: true }
//         );

//         return res.status(200).json({
//             id: updatedBook.id,
//             title: updatedBook.title,
//             author: updatedBook.author,
//             genre: updatedBook.genre,
//             price: updatedBook.price
//         });
//     } catch (err) {
//         next(err);
//     }
// }

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

    // const { author, title, genre, sort, order } = req.query;

    // // add search criteria
    // const filter = {};
    // if (author) {
    //     filter.author = author;
    // }
    // if (title) {
    //     filter.title = title;
    // }
    // if (genre) {
    //     filter.genre = genre;
    // }

    // // add sort and order options
    // const sortOptions = {};
    // if (sort) {
    //     sortOptions[sort] = order === 'ASC' ? 1 : -1;
    // }

    // const options = { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 };

    try {
        // const books = await Book.find(filter, options).lean().sort(sortOptions);
        const users = await User.find({});

        return res.status(200).json({
            users
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    // updateBook,
    getSingleUser,
    getAllUser
}