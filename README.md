# API de Tarefas (To-Do List)

Uma API RESTful completa para gerenciamento de tarefas construída com Node.js, Express e Sequelize usando SQLite como banco de dados.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Nodemon** - Reinicialização automática em desenvolvimento

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd todo-list-api
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Como executar

### Desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Produção:
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

**Frontend:** Acesse `http://localhost:3000` no seu navegador para usar a interface web.

**API:** Acesse `http://localhost:3000/api` para ver a documentação da API.

## 📚 Endpoints da API

### Base URL
```
http://localhost:3000
```

### 1. Criar Tarefa
**POST** `/tasks`

Cria uma nova tarefa.

**Body:**
```json
{
  "title": "Estudar Node.js",
  "description": "Revisar conceitos de Express e Sequelize",
  "status": "pending"
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "title": "Estudar Node.js",
  "description": "Revisar conceitos de Express e Sequelize",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Listar Tarefas
**GET** `/tasks`

Lista todas as tarefas com paginação e filtros opcionais.

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `status` (opcional): Filtrar por status ("pending" ou "done")

**Exemplos:**
```
GET /tasks
GET /tasks?page=1&limit=5
GET /tasks?status=pending
GET /tasks?status=done&page=2&limit=3
```

**Resposta (200):**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Estudar Node.js",
      "description": "Revisar conceitos de Express e Sequelize",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 10
  }
}
```

### 3. Obter Tarefa por ID
**GET** `/tasks/:id`

Retorna uma tarefa específica pelo ID.

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Estudar Node.js",
  "description": "Revisar conceitos de Express e Sequelize",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Resposta (404):**
```json
{
  "error": "Tarefa não encontrada"
}
```

### 4. Atualizar Tarefa
**PUT** `/tasks/:id`

Atualiza uma tarefa existente.

**Body:**
```json
{
  "title": "Estudar Node.js - Atualizado",
  "description": "Revisar conceitos avançados",
  "status": "done"
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Estudar Node.js - Atualizado",
  "description": "Revisar conceitos avançados",
  "status": "done",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

### 5. Deletar Tarefa
**DELETE** `/tasks/:id`

Remove uma tarefa do banco de dados.

**Resposta (204):** Sem conteúdo

**Resposta (404):**
```json
{
  "error": "Tarefa não encontrada"
}
```

## 📊 Estrutura do Banco de Dados

### Tabela: `tasks`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária, auto-incremento |
| `title` | STRING | Título da tarefa (obrigatório) |
| `description` | TEXT | Descrição da tarefa (opcional) |
| `status` | ENUM | Status da tarefa: "pending" ou "done" (padrão: "pending") |
| `createdAt` | DATETIME | Data de criação (automático) |
| `updatedAt` | DATETIME | Data de atualização (automático) |

## 🏗️ Estrutura do Projeto

```
.
├── src/
│   ├── models/
│   │   └── task.js          # Modelo Sequelize da tarefa
│   ├── controllers/
│   │   └── taskController.js # Lógica de negócio
│   ├── routes/
│   │   └── tasks.js         # Definição das rotas
│   ├── config/
│   │   └── database.js      # Configuração do banco
│   └── app.js              # Arquivo principal da aplicação
├── public/
│   ├── index.html          # Interface do frontend
│   ├── styles.css          # Estilos CSS
│   └── script.js           # JavaScript do frontend
├── database.sqlite         # Banco de dados SQLite
├── package.json
├── .gitignore
└── README.md
```

## 🎨 Frontend

O projeto inclui uma interface web completa com as seguintes funcionalidades:

- **Adicionar Tarefas:** Formulário para criar novas tarefas
- **Listar Tarefas:** Visualização de todas as tarefas com paginação
- **Filtrar por Status:** Filtrar tarefas por status (pendente/concluída)
- **Editar Tarefas:** Modal para editar tarefas existentes
- **Alternar Status:** Marcar tarefas como concluídas ou reabrir
- **Excluir Tarefas:** Remover tarefas com confirmação
- **Notificações:** Feedback visual para todas as ações
- **Design Responsivo:** Interface adaptável para diferentes dispositivos

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com auto-reload
- `npm start` - Inicia o servidor em modo produção

## 🚨 Tratamento de Erros

A API retorna códigos de status HTTP apropriados:

- **200** - Sucesso
- **201** - Criado com sucesso
- **204** - Deletado com sucesso
- **400** - Dados inválidos
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

## 📝 Exemplos de Uso

### Usando cURL

**Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Fazer exercícios", "description": "Correr 5km"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tasks
```

**Atualizar tarefa:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```

**Deletar tarefa:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Usando JavaScript (Fetch)

```javascript
// Criar tarefa
const response = await fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Nova tarefa',
    description: 'Descrição da tarefa'
  })
});

const task = await response.json();
```