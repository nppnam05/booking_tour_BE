const express = require('express');
const router = express.Router();
const userCompletedTourController = require('../controllers/user_completed_tour_controller');


router.get('/user', userCompletedTourController.findByUserId);
router.get('/tour', userCompletedTourController.findByTourId);
router.get('/', userCompletedTourController.findAll);
router.get('/:id', userCompletedTourController.findById);

router.post('/', userCompletedTourController.create);
router.put('/:id', userCompletedTourController.update);
router.delete('/:id', userCompletedTourController.delete);


module.exports = router;