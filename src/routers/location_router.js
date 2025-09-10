const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location_controller');

router.get('/search', locationController.searchByName);
router.get('/', locationController.findAll);
router.get('/:id', locationController.findById);


router.post('/', locationController.create);
router.put('/:id', locationController.update);
router.delete('/:id', locationController.delete);

module.exports = router;