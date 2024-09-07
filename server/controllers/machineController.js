const Machine = require('../models/machineModel')
const mongoose = require('mongoose')

//get all machines
const getMachines = async (req, res) => {
    const user_id = req.user._id
    const machines = await Machine.find({user_id}).sort({createdAt: -1})

    res.status(200).json(machines)
}

// get a single machine
const getMachine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such machine'})
    }

    const machine = await Machine.findById(id)

    if (!machine) {
        return res.status(404).json({error: 'No such machine'})
    }

    res.status(200).json(machine)
}

// create new machine
const createMachine = async (req, res) => {
    const {name, description, status} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to DB
    try {
        const user_id = req.user._id
        const machine  = await Machine.create({name, description, status,user_id})
        res.status(200).json(machine)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a machine
const deleteMachine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such machine'})
    }

    const machine = await Machine.findOneAndDelete({_id: id})

    if (!machine) {
        return res.status(404).json({error: 'No such machine'})
    }

    return res.status(200).json(machine)
}

// update a machine
const updateMachine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such machine'})
    }

    const machine = await Machine.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!machine) {
        return res.status(404).json({error: 'No such machine'})
    }

    return res.status(200).json(machine)
}

module.exports = {
    getMachines,
    getMachine,
    createMachine,
    deleteMachine,
    updateMachine
}