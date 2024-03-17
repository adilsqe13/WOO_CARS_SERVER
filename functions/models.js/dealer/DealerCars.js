const mongoose = require('mongoose');
const { Schema } = mongoose;


const CarDealersSchema = new Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agency'
    },
    agencyName: {
        type: String,
        required: true,
    },
    vehicle_model: {
        type: String,
        required: true,
    },
    vehicle_number: {
        type: String,
        required: true,
    },
    seating_capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('car-dealers', CarDealersSchema);