const mongoose = require('mongoose');
const { Schema } = mongoose;

const PurchasedCarSchema = new Schema({
    userId: {
        type: String,
        ref: 'user'
    },
    carId: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        default: function () {
            return this.product[0].price;
        },
    },
    order_status:{
        type: String,
        default: 'Pending',
    },

    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('rented-cars', PurchasedCarSchema);