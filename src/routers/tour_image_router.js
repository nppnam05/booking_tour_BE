const express = require('express');
const router = express.Router();
const TourImageController = require('../controllers/tour_image_controller');


router.get('/', TourImageController.findAll);
router.get('/tour', TourImageController.findByTourId);
router.get('/:id', TourImageController.findById);

router.post('/', TourImageController.create);
router.put('/:id', TourImageController.update);
router.delete('/:id', TourImageController.delete);

module.exports = router;