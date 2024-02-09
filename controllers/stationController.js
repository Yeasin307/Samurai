const Station = require('../models/Station');
const { checkStationExists } = require('../helper/checkStationExists');

const createStation = async (req, res, next) => {
    try {
        const newStation = await Station.create(req.body);

        return res.status(201).json({
            station_id: newStation.station_id,
            station_name: newStation.station_name,
            longitude: newStation.longitude,
            latitude: newStation.latitude,
        });
    } catch (err) {
        next(err);
    }
}

// const updateStation = async (req, res, next) => {
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

const getSingleStation = async (req, res, next) => {
    const station_id = req.params.id;

    try {
        const station = await checkStationExists(station_id);

        return res.status(200).json({
            station_id: station.station_id,
            station_name: station.station_name,
            longitude: station.longitude,
            latitude: station.latitude,
        });
    } catch (err) {
        next(err);
    }
}

const getAllStation = async (req, res, next) => {

    try {
        const stations = await Station.find();

        return res.status(200).json({
            stations
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createStation,
    // updateStation,
    getSingleStation,
    getAllStation
}