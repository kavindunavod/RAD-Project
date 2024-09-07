const Reservation = require('../models/reservationsModel')
const mongoose = require('mongoose')

//get all reservation
const getReservations = async (req, res) => {
    const user_id = req.user._id

    const reservation = await Reservation.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(reservation)
}


// get a single reservation
const getReservation = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findById(id)

    if(!reservation) {
        return res.status(404).json({error: 'No such reservation'})
    }

    res.status(200).json(reservation)
}


// create a new reservation
const createReservation = async (req, res) => {
    const {fname, lname, nic, room, members, phone, days} = req.body

    let emptyFields = []

    if(!fname) {
        emptyFields.push('fname')
    }
    if(!lname) {
        emptyFields.push('lname')
    }
    if(!nic) {
        emptyFields.push('nic')
    }
    if(!room) {
        emptyFields.push('room')
    }
    if(!members) {
        emptyFields.push('members')
    }
    if(!phone) {
        emptyFields.push('phone')
    }
    if(!days) {
        emptyFields.push('days')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const reservation = await Reservation.create({fname, lname, nic, room, members, phone, days, user_id})
        res.status(200).json(reservation)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a reservation
const deleteReservation = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndDelete({_id: id})

    
    if(!reservation) {
        return res.status(400).json({error: 'No such reservation'})
    }

    res.status(200).json(reservation)
}

// update a workout
const updateReservation = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!reservation) {
        return res.status(400).json({error: 'No such reservation'})
    }

    res.status(200).json(reservation)
}



module.exports = {
    getReservations,
    getReservation,
    createReservation,
    deleteReservation,
    updateReservation
}