const express = require('express');
const app = express();
const port = 3000; 

// Task List
const tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Create exams',
  },
  {
    id: '123457',
    isCompleted: false,
    description: 'test students with an exam',
  },
  // You can add more tasks here
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
  });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
