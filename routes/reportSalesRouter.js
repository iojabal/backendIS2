const express = require('express')

const {registrarReporte,
    getReportes,
    getReportePorFecha,} = require('../controllers/reportSaleController')

const router = express.Router()


router.post('/', registrarReporte)
router.get('/', getReportes)
router.get('/:fecha', getReportePorFecha)

module.exports = router