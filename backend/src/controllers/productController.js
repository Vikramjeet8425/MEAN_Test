const Product = require('../models/Product');

exports.createProduct = async (req,res) => {
    try {
        const p = await Product.create(req.body);
        res.status(201).json(p);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getProducts = async (req,res) => {
    try {
        const items = await Product.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req,res) => {
    try {
        const p = await Product.findById(req.params.id);
        if (!p) return res.status(404).json({ message: 'Not found' });
        res.json(p);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProduct = async (req,res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req,res) => {
    try {
        const removed = await Product.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
