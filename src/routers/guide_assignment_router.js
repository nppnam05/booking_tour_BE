const express = require('express');
const router = express.Router();
const guideAssignmentController = require('../controllers/guide_assignment_controller');


router.get('/', guideAssignmentController.findAll);
router.get('/schedule', guideAssignmentController.findByTourScheduleId);
router.get('/guide', guideAssignmentController.findByGuideId);
router.get('/:id', guideAssignmentController.findById);


router.post('/', guideAssignmentController.create);
router.put('/:id', guideAssignmentController.update);
router.delete('/:id', guideAssignmentController.delete);

module.exports = router;