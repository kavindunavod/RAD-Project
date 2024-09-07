const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

//get all employees
const getAllEmployees = async (req, res) => {
    const user_id = req.user._id
    const employees = await Employee.find({user_id}).sort({createdAt: -1})
    res.status(200).json(employees)
}

//get single employee
const getSingleEmployee = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Employee not found'})
    }
   
    const employee = await Employee.findById(id)

    if (!employee){
        return res.status(404).json({error: 'Employee not found'})
    }
    res.status(200).json(employee)
}

//create new employee
const createEmployee = async (req, res) => {
    const {name, contact, job, salary} = req.body
    
    let emptyFields = []

    if (!name){
        emptyFields.push('name')
    }
    if (!contact){
        emptyFields.push('contact')
    }
    if (!job){
        emptyFields.push('job')
    }
    if (!salary){
        emptyFields.push('salary')
    }

    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in the required fields:', emptyFields})
    }

    try{
        const user_id = req.user._id
        const employee = await Employee.create({name, contact, job, salary, user_id})
        res.status(200).json(employee)
        
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete existing employee
const deleteEmployee = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Employee not found'})
    }
    
    const employee = await Employee.findOneAndDelete({_id: id})

    if (!employee){
        return res.status(404).json({error: 'Employee not found'})
    }
    res.status(200).json(employee)
}


//update existing employee
const updateEmployee = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Employee not found'})
    }

    const employee = await Employee.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!employee){
        return res.status(404).json({error: 'Employee not found'})
    }
    res.status(200).json(employee)
}


module.exports = {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
}