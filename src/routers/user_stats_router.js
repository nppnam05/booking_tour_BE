const express = require('express');
const router = express.Router();
const userStatController = require('../controllers/user_stats_controller');

router.get('/user', userStatController.findByUserId);
router.get('/', userStatController.findAll);
router.get('/:id', userStatController.findById);

router.post('/', userStatController.create);
router.put('/:id', userStatController.update);
router.delete('/:id', userStatController.delete);

module.exports = router;