const router = require("express").Router();

const {
    createTrain, getAllTrain, getSingleTrain
} = require('../controllers/trainController');

router.post('/', createTrain);

// router.put('/:id', updateBook);

router.get('/:id', getSingleTrain);

router.get('/', getAllTrain);


module.exports = router;

