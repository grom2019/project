const db = require('./db');

const getAllAccountingForLeave = (callback) => {
    const query = 'SELECT * FROM accountingForLeave';
    db.query(query, callback);
};

const getAccountingForLeaveById = (accountingForLeaveId, callback) => {
    const query = 'SELECT * FROM accountingForLeave WHERE id = ?';
    db.query(query, [accountingForLeaveId], callback);
};

const createAccountingForLeave = (military_rank_and_full_name, until_date_time, return_date_time, callback) => {
    const query = 'INSERT INTO accountingForLeave (military_rank_and_full_name, until_date_time, return_date_time) VALUES (?, ?, ?)';
    db.query(query, [military_rank_and_full_name, until_date_time, return_date_time], callback);
};

const updateAccountingForLeave = (accountingForLeaveId, military_rank_and_full_name, until_date_time, return_date_time, callback) => {
    const query = 'UPDATE accountingForLeave SET military_rank_and_full_name = ?, until_date_time = ?, return_date_time = ? WHERE id = ?';
    db.query(query, [military_rank_and_full_name, until_date_time, return_date_time, accountingForLeaveId], callback);
};

const deleteAccountingForLeave = (accountingForLeaveId, callback) => {
    const query = 'DELETE FROM accountingForLeave WHERE id = ?';
    db.query(query, [accountingForLeaveId], callback);
};

module.exports = {
    getAllAccountingForLeave,
    getAccountingForLeaveById,
    createAccountingForLeave,
    updateAccountingForLeave,
    deleteAccountingForLeave
};
