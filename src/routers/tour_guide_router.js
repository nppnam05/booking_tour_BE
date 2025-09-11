const express = require('express');
const router = express.Router();
const tourGuideController = require('../controllers/tour_guide_controller');


router.get('/', tourGuideController.findAll);
router.get('/manager', tourGuideController.findByManager);
router.get('/user', tourGuideController.findByUserId);
router.get('/:id', tourGuideController.findById);


router.post('/', tourGuideController.create);
router.put('/:id', tourGuideController.update);
router.delete('/:id', tourGuideController.delete);

module.exports = router;