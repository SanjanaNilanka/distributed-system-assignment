const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/create', adminController.addAdmin);
router.get('/get', adminController.getAdmins);
router.get('/get/:id', adminController.getAdminByID);
router.put('/update/:id', adminController.updateAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);

module.exports = router;