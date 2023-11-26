const express = require('express');
const router = express.Router();

module.exports = function (tasks) {

    router.post('/create', (req, res) => {
        const newTask = { ...req.body };
        if (!newTask.id) {
            res.status(400).json({ message: ' Task ID is required ' });
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
    } else { res.status(404).json({ message: 'Task not found' });
    }
  });

  router.put('/update/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {res.status(404).json({ message: 'Task not found' });
}
});
return router;
};

