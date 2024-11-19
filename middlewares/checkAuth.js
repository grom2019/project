const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/auth/login');
    }
};

module.exports = checkAuth;
