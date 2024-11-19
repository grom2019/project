const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
    try {
        const { username, password, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(username, hashedPassword, role_id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/auth/login');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

// Логін
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        User.getUserByUsername(username, async (err, results) => {
            if (err) {
                return res.render('login', { error: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.render('login', { error: 'Invalid username or password' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('login', { error: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            req.session.token = token;
            res.redirect('/dashboard');
        });
    } catch (err) {
        res.render('login', { error: 'Internal server error' });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.redirect('/auth/login');
    });
};
