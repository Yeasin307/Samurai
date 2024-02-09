const router = require("express").Router();

const {
    createBook, updateBook,
    getSingleBook, getAllBook
} = require('../controllers/bookController');

router.post('/', createBook);

router.put('/:id', updateBook);

router.get('/:id', getSingleBook);

router.get('/', getAllBook);


module.exports = router;

