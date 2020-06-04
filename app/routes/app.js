const ensureLogin = require('../middleware/ensureLogin');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('*', ensureLogin, function(req, res, next) {
  const user = {
    picture: req.user.picture,
    name: req.user.name
  }

  res.render('app', { 
    title: 'Logged in with Google',
    DATA: {
      user
    }
  });
});

module.exports = router;
