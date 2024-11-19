const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
    const token = req.session.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
            req.user = decoded; // Зберігаємо дані про користувача, якщо токен дійсний
        } catch (err) {
            console.error('Invalid token:', err.message);
            // Якщо токен недійсний, просто продовжуємо без req.user
        }
    }

    next(); // Продовжуємо обробку запиту незалежно від токена
};

module.exports = optionalAuth;
