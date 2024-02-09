const Train = require('../models/Train');
const { checkTrainExists } = require('../helper/checkTrainExists');

const createTrain = async (req, res, next) => {
    try {
        const newTrain = await Train.create(req.body);

        return res.status(201).json({
            train_id: newTrain.train_id,
            train_name: newTrain.train_name,
            capacity: newTrain.capacity,
        });
    } catch (err) {
        next(err);
    }
}

// const updateTrain = async (req, res, next) => {
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

const getSingleTrain = async (req, res, next) => {
    const train_id = req.params.train_id;

    try {
        const train = await checkTrainExists(train_id);

        return res.status(200).json({
            train_id: train.train_id,
            train_name: train.train_name,
            capacity: train.capacity,
        });
    } catch (err) {
        next(err);
    }
}

const getAllTrain = async (req, res, next) => {

    try {
        const trains = await Train.find();

        return res.status(200).json({
            trains
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