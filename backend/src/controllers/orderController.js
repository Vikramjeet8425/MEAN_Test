const Order = require('../models/Order');

exports.createOrder = async (req,res) => {
    try {
        const o = await Order.create(req.body);
        res.status(201).json(o);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getOrder = async (req,res) => {
    try {
        const o = await Order.findById(req.params.id);
        if (!o) return res.status(404).json({ message: 'Not found' });
        res.json(o);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrder = async (req,res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteOrder = async (req,res) => {
    try {
        const removed = await Order.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
