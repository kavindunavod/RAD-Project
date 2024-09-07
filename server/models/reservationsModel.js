const mongoose = require('mongoose');

const Schema = mongoose.Schema

const reservationSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Reservation', reservationSchema);