const express = require('express');
const User = require('../models/user');
const sha1 = require('js-sha1');

const usersRouter = express.Router();

usersRouter.post('', (req, res, next) => {

  User.findOne({ email: req.body.email }).then( userFound => {
    if (!userFound) {
      const pass = req.body.password;
      pass = 'lksdnfoiegsda' + pass + 'orglnkfsldkfn' + pass + 'snfoibfwwgbwog';
      pass = sha1(pass);
      const user = new User({
        email: req.body.email,
        password: pass
      });

      user.save().then( createdUser => {
        res.status(201).json({
          exists: false
        });
      });
    } else {
      res.status(201).json({
        exists: true
      });
    }
  });

});

usersRouter.post('/check', (req, res, next) => {
  const pass = req.body.password;
  pass = 'lksdnfoiegsda' + pass + 'orglnkfsldkfn' + pass + 'snfoibfwwgbwog';
  pass = sha1(pass);
  User.findOne({ email: req.body.email, password: pass }).then( userFound => {
    if (!userFound) {
      res.status(201).json({
        exists: false
      });
    } else {
      res.status(201).json({
        exists: true
      });
    }
  });
});

module.exports = usersRouter;
