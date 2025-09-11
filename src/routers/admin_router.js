const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/', adminController.findAll);
router.get('/email', adminController.findByEmail);
router.get('/:id', adminController.findById);

router.post('/', adminController.create);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

module.exports = router;