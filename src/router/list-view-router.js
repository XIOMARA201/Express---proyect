const express = require('express');
const router = express.Router();

module.exports = function (tasks) {
    const validateParams = (req, res, next) => {
        const param = req.params.validate;

        if (!isValid(param)) {
            return res.status(400).send('Invalid parameter');
    }

    next();
};

router.get('/complete', (req, res) => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    res.json(completedTasks);
  });

  router.get('/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
  });

  router.get('/route-with-parameter/:validate', validateParams);

  return router;
};

function isValid(param) {
    if (param.length >= 10 && param.length <= 25) {
        return true;
    }

    return false;
}




