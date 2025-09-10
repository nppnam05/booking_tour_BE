const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour_controller');

router.get('/category', tourController.findByCategoryId);
router.get('/', tourController.findAll);
router.get('/:id', tourController.findById);


router.post('/', tourController.create);
router.put('/:id', tourController.update);
router.delete('/:id', tourController.delete);

module.exports = router;