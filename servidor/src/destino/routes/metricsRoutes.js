const express = require('express'); 
const { getMetricsController } = require('../../getMetrics/controllers/getMetricsControllers');

const router = express.Router();

router.get('/', getMetricsController)

module.exports = router