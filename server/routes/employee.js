const express = require('express')
const router = express.Router()

const {
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
} = require('../controllers/employeeController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all items
router.get('/', getAllEmployees)

//Get single item
router.get('/:id', getSingleEmployee)

//Create new item
router.post('/', createEmployee)

//Delete existing item
router.delete('/:id', deleteEmployee)

//Update existing item
router.patch('/:id', updateEmployee)


module.exports = router;