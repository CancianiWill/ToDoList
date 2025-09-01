const Task = require('../models/task');

// Criar nova tarefa
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        error: 'Título é obrigatório' 
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'pending'
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Listar todas as tarefas com paginação e filtros
const listTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (status && ['pending', 'done'].includes(status)) {
      whereClause.status = status;
    }

    const { count, rows } = await Task.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      tasks: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Obter tarefa por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada' 
      });
    }

    res.json(task);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Atualizar tarefa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada' 
      });
    }

    // Validação do status
    if (status && !['pending', 'done'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status deve ser "pending" ou "done"' 
      });
    }

    // Atualiza apenas os campos fornecidos
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Deletar tarefa
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada' 
      });
    }

    await task.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask
}; 