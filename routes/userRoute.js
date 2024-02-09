const router = require("express").Router();

const {
    createUser, getSingleUser, getAllUser
} = require('../controllers/userController');

router.post('/', createUser);

// router.put('/:id', updateBook);

router.get('/:id', getSingleUser);

router.get('/', getAllUser);


module.exports = router;

