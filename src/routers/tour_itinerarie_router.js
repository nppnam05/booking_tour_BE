const express = require('express');
const router = express.Router();
const TourItineraryController = require('../controllers/tour_itinerarie_controller');



router.get('/', TourItineraryController.findAll);
router.get('/tour', TourItineraryController.findByTourId);
router.get('/:id', TourItineraryController.findById);

router.post('/', TourItineraryController.create);
router.put('/:id', TourItineraryController.update);
router.delete('/:id', TourItineraryController.delete);

module.exports = router;