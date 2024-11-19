const express = require('express');
const router = express.Router();
const accountingForLeaveController = require('../controllers/accountingForLeaveController');
const checkAuth = require('../middlewares/checkAuth'); 

router.get('/', checkAuth, accountingForLeaveController.getAllAccountingForLeave);
router.get('/new', checkAuth, accountingForLeaveController.newAccountingForLeaveForm);
router.post('/new', checkAuth, accountingForLeaveController.createAccountingForLeave);
router.get('/edit/:id', checkAuth, accountingForLeaveController.getAccountingForLeaveById);
router.post('/edit/:id', checkAuth, accountingForLeaveController.updateAccountingForLeave);
router.post('/delete/:id', checkAuth, accountingForLeaveController.deleteAccountingForLeave);

module.exports = router;
