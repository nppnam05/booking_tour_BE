const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite_controller');


router.get('/user', favoriteController.findByUserId);
router.get('/tour', favoriteController.findByTourId);
router.get('/', favoriteController.findAll);
router.get('/:id', favoriteController.findById);

router.post('/', favoriteController.create);
router.put('/:id', favoriteController.update);
router.delete('/:id', favoriteController.delete);

module.exports = router;