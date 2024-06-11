const User = require('../models/user');

exports.createUser = async (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const user = await User.createUser(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};
