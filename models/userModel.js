const db = require('./db'); 

const getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM Users WHERE username = ?';
    db.query(query, [username], callback);
};

const createUser = (username, hashedPassword, role_id, callback) => {
    const query = 'INSERT INTO Users (username, password, role_id) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role_id], callback);
};

module.exports = {
    getUserByUsername,
    createUser
};
