const express = require('express');
const router = express.Router();
const categoryTourController = require('../controllers/category_tour_controller');

router.get('/location', categoryTourController.findByLocationId);
router.get('/name', categoryTourController.findByName);
router.get('/', categoryTourController.findAll);
router.get('/:id', categoryTourController.findById);


router.post('/', categoryTourController.create);
router.put('/:id', categoryTourController.update);
router.delete('/:id', categoryTourController.delete);

module.exports = router;