const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config(); 

// Importar las rutas y otros módulos
const route = require('./router');
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');
const showRouter = require('./show-router');
const createTaskController = require('./create-task-controller'); 
const updateTaskController = require('./update-task-controller'); 
const deleteTaskController = require('./delete-task-controller'); 
const listAllTasksController = require('./list-all-tasks-controller'); 
const listCompletedTasksController = require('./list-completed-tasks-controller'); 
const listIncompleteTasksController = require('./list-incomplete-tasks-controller'); 
const getTaskByIdController = require('./get-task-by-id-controller'); 

app.use(express.json());

app.use('/api', route);
app.use('/listas', listViewRouter);
app.use('/editar', listEditRouter);
app.use('/tasks', showRouter);

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido Al Sistema De Gestión De Tareas');
});

app.post('/api/tasks', createTaskController);
app.put('/api/tasks/:id', updateTaskController);
app.delete('/api/tasks/:id', deleteTaskController);

app.get('/api/tasks', listAllTasksController);
app.get('/api/tasks/complete', listCompletedTasksController);

app.get('/api/tasks/incomplete', listIncompleteTasksController);

app.get('/api/tasks/:id', getTaskByIdController);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


