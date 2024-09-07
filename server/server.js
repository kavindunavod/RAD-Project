require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const reservationRoutes = require('./routes/reservation')
const employeeRoutes = require('./routes/employee')
const foodRoutes = require('./routes/foods')
const recordRoutes = require('./routes/room')
const machineRoute = require('./routes/machines')

const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/reservation', reservationRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/foods', foodRoutes)
app.use('/api/room', recordRoutes)
app.use('/api/machines', machineRoute)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening to the port
        app.listen(process.env.PORT, () => {
            console.log('Connect to the DB & Listenning to the port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

