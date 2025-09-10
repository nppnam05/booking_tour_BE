const express = require('express');
const router = express.Router();
const UserNotificationController = require('../controllers/user_notification_controller');

router.get('/user', UserNotificationController.findByUserId);
router.get('/', UserNotificationController.findAll);
router.get('/:id', UserNotificationController.findById);

router.post('/', UserNotificationController.create);
router.put('/:id', UserNotificationController.update);
router.delete('/:id', UserNotificationController.delete);

module.exports = router;