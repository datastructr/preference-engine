import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy((email, password, done) => {
    Users.findOne({
        where: {email: email}
    }).then(user => {
        if (!user) {
            return done(null, false, { message: 'Problem with email address.' });
        }
        if (!user.authenticate(password)) {
            return done(null, false, { message: 'Problem with email/password' });
        }
        return done(null, user);
    })
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

export default passport;