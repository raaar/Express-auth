
var express = require('express');
var router = express.Router();
var passport = require('passport');

const googleAuthConfig = { 
  scope: ['https://www.googleapis.com/auth/plus.login'], 
  prompt: 'select_account'
};

router.get('/google', passport.authenticate('google', googleAuthConfig));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/app');
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(e){
    req.logout();
    res.redirect('/');
  });
})

module.exports = router;

