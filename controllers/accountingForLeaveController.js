const moment = require('moment');
const AccountingForLeave = require('../models/accountingForLeaveModel');
const Staff = require('../models/staffModel');

exports.getAllAccountingForLeave = (req, res) => {
    AccountingForLeave.getAllAccountingForLeave((err, results) => {
        if (err) {
            console.error('Error fetching accounting for leave:', err);
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }

        results.forEach(record => {
            record.until_date_time = moment(record.until_date_time).format('YYYY-MM-DD HH:mm:ss');
            record.return_date_time = moment(record.return_date_time).format('YYYY-MM-DD HH:mm:ss');
        });

        console.log('Fetched accounting for leave:', results);
        res.render('accountingForLeave', { accountingForLeave: results });
    });
};

exports.getAccountingForLeaveById = (req, res) => {
    const { id } = req.params;
    AccountingForLeave.getAccountingForLeaveById(id, (err, results) => {
        if (err) {
            console.error('Error fetching accounting for leave by ID:', err);
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'AccountingForLeave not found' });
        }

        results[0].until_date_time = moment(results[0].until_date_time).format('YYYY-MM-DD HH:mm:ss');
        results[0].return_date_time = moment(results[0].return_date_time).format('YYYY-MM-DD HH:mm:ss');

        console.log('Fetched accounting for leave by ID:', results[0]);
        res.render('edit-accountingForLeave', { accountingForLeave: results[0] });
    });
};

exports.newAccountingForLeaveForm = async (req, res) => {
    try {
        Staff.getAllStaff((err, staff) => {
            if (err) {
                console.error('Error fetching staff:', err);
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            console.log('Fetched staff:', staff);
            res.render('create-accountingForLeave', { staff: staff });
        });
    } catch (err) {
        console.error('Error in newAccountingForLeaveForm:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.createAccountingForLeave = async (req, res) => {
    try {
        const { military_rank_and_full_name, until_date_time, return_date_time } = req.body;
        console.log('Creating accounting for leave with data:', req.body);
        AccountingForLeave.createAccountingForLeave(military_rank_and_full_name, until_date_time, return_date_time, (err, results) => {
            if (err) {
                console.error('Error creating accounting for leave:', err);
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            console.log('Created accounting for leave:', results);
            res.redirect('/accountingForLeave');
        });
    } catch (err) {
        console.error('Error in createAccountingForLeave:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.updateAccountingForLeave = (req, res) => {
    const { id } = req.params;
    const { military_rank_and_full_name, until_date_time, return_date_time } = req.body;
    console.log('Updating accounting for leave with ID:', id, 'and data:', req.body);
    AccountingForLeave.updateAccountingForLeave(id, military_rank_and_full_name, until_date_time, return_date_time, (err, results) => {
        if (err) {
            console.error('Error updating accounting for leave:', err);
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        console.log('Updated accounting for leave:', results);
        res.redirect('/accountingForLeave');
    });
};

exports.deleteAccountingForLeave = (req, res) => {
    const { id } = req.params;
    console.log('Deleting accounting for leave with ID:', id);
    AccountingForLeave.deleteAccountingForLeave(id, (err, results) => {
        if (err) {
            console.error('Error deleting accounting for leave:', err);
            return res.status(500).json({ error: 'Internal server error', details: err.message });
        }
        console.log('Deleted accounting for leave:', results);
        res.redirect('/accountingForLeave');
    });
};
