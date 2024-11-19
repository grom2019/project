const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const checkAuth = require('../middlewares/checkAuth'); 

router.get('/', checkAuth, staffController.getAllStaff);
router.get('/new', checkAuth, staffController.newStaffForm);
router.post('/new', checkAuth, staffController.createStaff);
router.get('/edit/:id', checkAuth, staffController.getStaffById);
router.post('/edit/:id', checkAuth, staffController.updateStaff);
router.post('/delete/:id', checkAuth, staffController.deleteStaff);

module.exports = router;
