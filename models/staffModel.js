const db = require('./db');

const getAllStaff = (callback) => {
    const query = 'SELECT * FROM Staff';
    db.query(query, callback);
};

const getStaffById = (staffId, callback) => {
    const query = 'SELECT * FROM Staff WHERE id = ?';
    db.query(query, [staffId], callback);
};

const createStaff = (full_name, position, military_rank, callback) => {
    const query = 'INSERT INTO Staff (full_name, position, military_rank) VALUES (?, ?, ?)';
    db.query(query, [full_name, position, military_rank], callback);
};

const updateStaff = (staffId, full_name, position, military_rank, callback) => {
    const query = 'UPDATE Staff SET full_name = ?, position = ?, military_rank = ? WHERE id = ?';
    db.query(query, [full_name, position, military_rank, staffId], callback);
};

const deleteStaff = (staffId, callback) => {
    const deleteStaffQuery = 'DELETE FROM Staff WHERE id = ?';
    db.query(deleteStaffQuery, [staffId], (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        const deleteStaffQuery = 'DELETE FROM Staff WHERE id = ?';
        db.query(deleteStaffQuery, [staffId], callback);
    });
};

module.exports = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
};
