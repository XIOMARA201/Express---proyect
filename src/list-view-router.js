const express = require('express');
const router = express.Router();
module.exports = function (tasks) {

    router.get('/complete', (req, res) => {
        const completedTasks = tasks.filter(task => task.isCompleted);
        res.json(completedTasks);
  });

  router.get('/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
});

return router;
};

