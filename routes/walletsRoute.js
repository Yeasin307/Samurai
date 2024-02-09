const router = require("express").Router();

const {getBalance, addBalance} = require('../controllers/walletsController');

router.get('/:wallet_id', getBalance);
router.put('/:wallet_id', addBalance);


module.exports = router;

