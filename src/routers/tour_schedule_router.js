const express = require('express');
const router = express.Router();
const TourScheduleController = require('../controllers/tour_schedule_controller');


router.get('/', TourScheduleController.findAll);
router.get('/tour', TourScheduleController.findByTourId);
router.get('/manager', TourScheduleController.findByManagerId);
router.get('/:id', TourScheduleController.findById);


router.post('/', TourScheduleController.create);
router.put('/:id', TourScheduleController.update);
router.delete('/:id', TourScheduleController.delete);

module.exports = router;