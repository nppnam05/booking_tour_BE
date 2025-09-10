const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment_controller');

router.get('/booking', paymentController.findByBookingId);
router.get('/transaction', paymentController.findByTransactionId);
router.get('/', paymentController.findAll);
router.get('/:id', paymentController.findById);

router.post('/', paymentController.create);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

module.exports = router;