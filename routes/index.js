const express = require('express');

const router = express.Router();

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));
router.use('/goods', require('./good'));
router.use('/brands', require('./brand'));

module.exports = router;
