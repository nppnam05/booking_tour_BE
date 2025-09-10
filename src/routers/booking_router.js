const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking_controller');

router.get('/user', bookingController.findByUserId);
router.get('/code', bookingController.findByBookingCode);
router.get('/', bookingController.findAll);
router.get('/:id', bookingController.findById);


router.post('/', bookingController.create);
router.put('/:id', bookingController.update);
router.delete('/:id', bookingController.delete);

module.exports = router;