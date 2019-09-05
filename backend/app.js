const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const app = express();

const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

const password = 'L4bwTQ1epjlbYbtA';
const dbName = 'angular-notes';
mongoose.connect('mongodb+srv://toto:'+password+'@cluster0-ysgvg.mongodb.net/'+dbName+'?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// they are all app.use() res.setHeader
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

module.exports = app;
