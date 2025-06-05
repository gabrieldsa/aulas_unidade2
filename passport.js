// backend/config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: 'SEU_CLIENT_ID',
  clientSecret: 'SEU_CLIENT_SECRET',
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Aqui você pode salvar os dados do usuário em seu "banco de dados"
  const user = {
    id: profile.id,
    nome: profile.displayName,
    email: profile.emails[0].value,
    foto: profile.photos[0].value
  };
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
