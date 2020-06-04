var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

module.exports = (app) => {

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findOrCreate(profile);
        return cb(null, user);
  
      } catch(e) {
        return cb(e, null);
      }
    }
  ));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
}