const express = require('express');
const path = require('path');
const { syncDatabase } = require('./config/database');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota raiz - redireciona para o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota da API para documentação
app.get('/api', (req, res) => {
  res.json({
    message: 'API de Tarefas (To-Do List)',
    version: '1.0.0',
    endpoints: {
      'POST /tasks': 'Criar nova tarefa',
      'GET /tasks': 'Listar todas as tarefas',
      'GET /tasks/:id': 'Obter tarefa por ID',
      'PUT /tasks/:id': 'Atualizar tarefa',
      'DELETE /tasks/:id': 'Deletar tarefa'
    }
  });
});

// Rotas da API
app.use('/tasks', taskRoutes);

// Middleware para tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.url} não existe`
  });
});

// Middleware para tratamento de erros gerais
app.use((error, req, res, next) => {
  console.error('Erro na aplicação:', error);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Algo deu errado no servidor'
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Sincronizar banco de dados
    await syncDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📱 API disponível em: http://localhost:${PORT}`);
      console.log(`📚 Documentação: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer(); 