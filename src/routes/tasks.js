const express = require('express');
const router = express.Router();
const {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// POST /tasks - Criar nova tarefa
router.post('/', createTask);

// GET /tasks - Listar todas as tarefas (com paginação e filtros)
router.get('/', listTasks);

// GET /tasks/:id - Obter tarefa por ID
router.get('/:id', getTaskById);

// PUT /tasks/:id - Atualizar tarefa
router.put('/:id', updateTask);

// DELETE /tasks/:id - Deletar tarefa
router.delete('/:id', deleteTask);

module.exports = router; 