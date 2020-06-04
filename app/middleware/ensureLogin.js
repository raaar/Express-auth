const User = require('../models/User');

module.exports = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/');
  }
}