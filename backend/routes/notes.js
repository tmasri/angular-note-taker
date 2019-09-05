const express = require('express');
const Note = require('../models/note');

const noteRouter = express.Router();

noteRouter.get('/:email', (req, res, next) => {

  Note.find({ user: req.params.email }).then( documents => {
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
    fontStyle: req.body.fontStyle,
    user: req.body.email
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

noteRouter.post('/init', (req, res, next) => {

  const note1 = new Note({
    title: 'Note Title',
    content: 'Add any note you want here, it can be as big or small as you want!',
    color: null,
    fontStyle: null,
    user: req.body.email
  });
  const note2 = new Note({
    title: 'Colors',
    content: 'You don\'t have to stick with plain old black, you can change the color of your note according to priority, organization, subject, or just because you don\'t want to stick with black text',
    color: 'blue',
    fontStyle: 'Arimo',
    user: req.body.email
  });
  const note3 = new Note({
    title: 'Red',
    content: 'Red can be thought of as a very important thing that you need to remember',
    color: 'red',
    fontStyle: 'Default',
    user: req.body.email
  });
  const note4 = new Note({
    title: 'Green',
    content: 'You can even choose green as a happy note or if you\'re feeling lucky!',
    color: 'green',
    fontStyle: 'Default',
    user: req.body.email
  });
  const note5 = new Note({
    title: 'Or Magenta',
    content: 'If you\'re feeling Magentic 😉',
    color: 'magenta',
    fontStyle: 'Default',
    user: req.body.email
  });
  const note6 = new Note({
    title: 'That\'s not all!!',
    content: 'You can also change the way your notes font looks',
    color: 'black',
    fontStyle: 'Cinzel',
    user: req.body.email
  });
  const note7 = new Note({
    title: 'AND...',
    content: 'You can choose both a color and a font!!!!',
    color: 'orange',
    fontStyle: 'Exo',
    user: req.body.email
  });
  const note8 = new Note({
    title: 'You can even change them whenever you want!!!',
    content: 'did this notes priority just change from urgent to happy? click on "Font family" to change the fonts look and click the underlined "a" to change the notes color',
    color: 'red',
    fontStyle: 'Cinzel',
    user: req.body.email
  });
  const note9 = new Note({
    title: 'So What are you waiting for?',
    content: 'Start taking some notes!',
    color: 'green',
    fontStyle: 'Caveat',
    user: req.body.email
  });

  note1.save().then(
    note2.save().then(
      note3.save().then(
        note4.save().then(
          note5.save().then(
            note6.save().then(
              note7.save().then(
                note8.save().then(
                  note9.save().then(
                    res.status(201).json({
                      built: true
                    })
                  )
                )
              )
            )
          )
        )
      )
    )
  );

});

module.exports = noteRouter;
