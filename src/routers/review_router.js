const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');



router.get('/', reviewController.findAll);
router.get('/tour', reviewController.findByTourId);
router.get('/user', reviewController.findByUserId);
router.get('/:id', reviewController.findById);


router.post('/', reviewController.create);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete);

module.exports = router;