const router = require("express").Router();

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

// Rota com autenticação necessaria
router.get('/:id', authMiddleware, userController.getUserById);

// Rotas que não precisam de autenticação
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);

module.exports = router;