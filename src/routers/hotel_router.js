const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel_controller');


router.get('/', hotelController.findAll);
router.get('/category', hotelController.findByCategoryId);
router.get('/:id', hotelController.findById);


router.post('/', hotelController.create);
router.put('/:id', hotelController.update);
router.delete('/:id', hotelController.delete);

module.exports = router;