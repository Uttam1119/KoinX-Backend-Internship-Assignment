const express = require('express');
const { getStats} = require('../controllers/statsController.js');
const { getDeviation} = require('../controllers/deviationController.js');


const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

module.exports = router;
