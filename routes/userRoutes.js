// routes/userRoutes.js
// Definerer API-endpoints for bruger-relaterede requests.
// Mapper HTTP-routes til userController.
// Hører til Controller-laget i MVC.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;