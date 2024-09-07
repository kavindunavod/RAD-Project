const Rooms = require('../models/roomModel');
const mongoose = require('mongoose')

// get all rooms
const getRooms = async (req, res) => {
    const user_id = req.user._id
    const rooms = await Rooms.find({user_id}).sort({createdAt: -1})
    res.status(200).json(rooms)
}

// get a single room 
const getRoom = async (req, res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such room'})
    }
    
    const room = await Rooms.findById(id)

    if(!room){
        return res.status(404).json({error: 'No such room'})
    }
    res.status(200).json(room)
}

// create a new room
const createRoom = async (req, res) => {
    const { roomNo, roomType, roomRates, airConditioning, roomStatus } = req.body;

    let emptyFields = []

    if(!roomNo) {
        emptyFields.push('roomNo')
    }
    if(!roomType) {
        emptyFields.push('roomType')
    }
    if(!roomRates) {
        emptyFields.push('roomRates')
    }
    if(!airConditioning) {
        emptyFields.push('airConditioning')
    }
    if(!roomStatus) {
        emptyFields.push('roomStatus')
    }
    if(emptyFields.length>0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add to db
    try {
        const user_id = req.user._id
        const room = await Rooms.create({ roomNo, roomType, roomRates, airConditioning, roomStatus, user_id });
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a new room
const deleteRoom = async (req, res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such room'})
    }

    const room = await Rooms.findOneAndDelete({_id: id})

    if(!room){
        return res.status(404).json({error: 'No such room'})
    }

    res.status(200).json(room)
}

// update a new room 
const updateRoom = async (req, res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such room'})
    }

    const room = await Rooms.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!room){
        return res.status(404).json({error: 'No such room'})
    }

    res.status(200).json(room)
}

module.exports = {
    getRooms, 
    getRoom, 
    createRoom, 
    deleteRoom, 
    updateRoom
}