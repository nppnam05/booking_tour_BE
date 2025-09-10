const express = require('express');
const router = express.Router();
const guideEvaluationController = require('../controllers/guide_evaluation_controller');


router.get('/guide', guideEvaluationController.findByGuideId);
router.get('/schedule', guideEvaluationController.findByTourScheduleId);
router.get('/', guideEvaluationController.findAll);
router.get('/:id', guideEvaluationController.findById);

router.post('/', guideEvaluationController.create);
router.put('/:id', guideEvaluationController.update);
router.delete('/:id', guideEvaluationController.delete);


module.exports = router;