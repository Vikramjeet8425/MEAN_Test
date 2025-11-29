const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    try {
        const { username, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username }});
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ userId: user.id, token: token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
