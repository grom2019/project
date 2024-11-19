const Staff = require('../models/staffModel');

exports.getAllStaff = async (req, res) => {
    try {
        Staff.getAllStaff((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.render('staff', { staff: results });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.newStaffForm = (req, res) => {
    res.render('create-staff');
};

exports.createStaff = async (req, res) => {
    try {
        const { full_name, position, military_rank } = req.body;
        Staff.createStaff(full_name, position, military_rank, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/staff');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.getStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        Staff.getStaffById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Staff not found' });
            }
            res.render('edit-staff', { staff: results[0] });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, position, military_rank } = req.body;
        Staff.updateStaff(id, full_name, position, military_rank, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/staff');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        Staff.deleteStaff(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error', details: err.message });
            }
            res.redirect('/staff');
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
