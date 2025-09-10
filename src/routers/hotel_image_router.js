const express = require('express');
const router = express.Router();
const hotelImageController = require('../controllers/hotel_image_controller');

router.get('/hotel', hotelImageController.findByHotelId);
router.get('/', hotelImageController.findAll);
router.get('/:id', hotelImageController.findById);

router.post('/', hotelImageController.create);
router.put('/:id', hotelImageController.update);
router.delete('/:id', hotelImageController.delete);

module.exports = router;