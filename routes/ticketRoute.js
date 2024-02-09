const router = require("express").Router();

const {
    createTicket
} = require('../controllers/ticketController');

router.post('/', createTicket);

// router.get('/:id', getSingleUser);

// router.get('/', getAllUser);


module.exports = router;