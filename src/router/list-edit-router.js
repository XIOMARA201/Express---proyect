const express = require('express');
const router = express.Router();
const checkerHTTPMethod = require('../middleware/http-method-checker');

module.exports = function (tasks) {
    const handleErrors = (req, res, next) => {
        if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
            return res.status(400).json({ message: 'Empty body for POST request' });
          }

          if (req.method === 'POST' && (!req.body.id || !req.body.otherAttribute)) {
            return res.status(400).json({ message: 'Invalid information or missing attributes to create the task' });
          }
          if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body || Object.keys(req.body).length === 0)) {
            return res.status(400).json({ message: 'Empty body for PUT/PATCH request' });
          }
      
         if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body.id || !req.body.otherAttribute)) {
        return res.status(400).json({ message: 'Invalid information or missing attributes to update the task' });
           }
           next();
        };

        router.use(checkerHTTPMethod);
        router.use(handleErrors);

        router.post('/create', (req, res) => {
            const newTask = { ...req.body };

            if (!newTask.id) {
                res.status(400).json({ message: 'Task ID is required' });
                return;
              }
              tasks.push(newTask);
              res.json(newTask);
  });

        router.delete('/eliminate/:id', (req, res) => {
             const taskId = req.params.id;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {

            tasks.splice(taskIndex, 1);
             res.json({ message: 'Task deleted successfully' });
             } else {
             res.status(404).json({ message: 'Task not found' });
    }
  });

         router.put('/update/:id', (req, res) => {
            const taskId = req.params.id;
         const updatedTask = req.body; // Se espera un objeto con detalles actualizados de la tarea
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
