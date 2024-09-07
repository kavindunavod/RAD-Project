const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomNo: {
        type: Number, 
        required: true
    },

    roomType: {
        type: String,
        required: true
    },

    roomRates: {
        type: Number, 
        required: true
    },

    airConditioning: {
        type: String,
        required: true
    },

    roomStatus: {
        type: String, 
        required: true
    },

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Room', roomSchema);

