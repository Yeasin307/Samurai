const router = require("express").Router();

const {
    createStation, getAllStation, getSingleStation
} = require('../controllers/stationController');

router.post('/', createStation);

// router.put('/:id', updateBook);

router.get('/:id', getSingleStation);

router.get('/', getAllStation);


module.exports = router;

