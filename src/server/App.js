const express = require('express');
const port = 3000;
require('dotenv').config();

const route = require('./router');
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

app.use(express.json());

app.use('/api', route);
app.use('/lists', listViewRouter);
app.use('/edit', listEditRouter);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Task Management System');
  });

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });

  
  