const express = require('express');
const router = express.Router();
const checkerHTTPMethod = require('../middleware/http-method-checker');

module.exports = function (tasks) {
  const handleErrors = (req, res, next) => {
    if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
      return res.status(400).json({ message: 'The body of the POST request is empty' });
    }

    if (req.method === 'POST' && (!req.body.id || !req.body.anotherAttribute)) {
      return res.status(400).json({ message: 'Invalid information or missing attributes to create the task' });
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body || Object.keys(req.body).length === 0)) {
      return res.status(400).json({ message: 'The body of the PUT/PATCH request is empty' });
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body.id || !req.body.anotherAttribute)) {
      return res.status(400).json({ message: 'Invalid information or missing attributes to update the task' });
    }

    next(); 
  };
  
  router.use(validateHTTPMethod);

  router.use(handleErrors);
  
    router.post('/create', (req, res) => {
    const newTask = { ...req.body };
    
    if (!newTask.id || !newTask.description) {
      res.status(400).json({ message: 'Invalid information or missing attributes to create the task' });
      return;
    }
  
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.status(204).json({ message: 'Task deleted successfully' }); // 204 No Content
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });

  router.put('/update/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body; 
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });

  return router;
};

