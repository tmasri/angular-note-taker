const express = require('express');
const Note = require('../models/note');

const noteRouter = express.Router();

noteRouter.get('', (req, res, next) => {

  Note.find().then( documents => {
    res.status(200).json({
      message: 'Notes successfully fetched!',
      notes: documents
    });
  });
});

noteRouter.post('', (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    color: req.body.color,
    fontStyle: req.body.fontStyle
  });

  note.save().then(createdNote => {
    res.status(201).json({
      message: 'Note Added Successfully',
      postId: createdNote._id
    });
  });
});

noteRouter.put('/:id', (req, res, next) => {
  const note = new Note({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    color: req.body.color,
    fontStyle: req.body.fontStyle
  });
  Note.updateOne({ _id: req.body.id }, note).then(result => {
    res.status(200).json({
      message: 'Note updated!'
    });
  });
});

noteRouter.delete('/:id', (req, res, next) => {
  Note.deleteOne({ _id: req.params.id }).then(result=> {
    res.status(200).json({
      message: 'Note deleted'
    });
  });
});

module.exports = noteRouter;
