const router = require("express").Router();

const taskController = require('../controllers/taskController');
const checkToken = require("../middleware/authMiddleware");
// Todas as rotas precisam de autenticação
router.use(checkToken);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
