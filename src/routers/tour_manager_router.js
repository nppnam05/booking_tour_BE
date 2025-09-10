const express = require('express');
const router = express.Router();
const tourManagerController = require('../controllers/tour_manager_controller');

router.get('/', tourManagerController.findAll);
router.get('/:id', tourManagerController.findById);

router.post('/', tourManagerController.create);
router.put('/:id', tourManagerController.update);
router.delete('/:id', tourManagerController.delete);

module.exports = router;