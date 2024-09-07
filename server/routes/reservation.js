const express = require('express')
const {
    getReservations,
    getReservation,
    createReservation,
    deleteReservation,
    updateReservation
} = require('../controllers/reservationControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getReservations)

router.get('/:id', getReservation)

router.post('/', createReservation)

router.delete('/:id', deleteReservation)

router.patch('/:id', updateReservation)

module.exports = router