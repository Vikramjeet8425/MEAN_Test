const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productIds: [{ type: String }],
    totalAmount: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
