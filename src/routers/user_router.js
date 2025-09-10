const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/email', userController.findByEmail);
router.get('/role', userController.findByRole);
router.get('/username', userController.checkUsernameExists);

router.get('/', userController.findAll);
router.get('/:id', userController.findById);

router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


module.exports = router;