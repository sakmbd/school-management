// middlewares/auth.js
import passport from 'passport';

export const auth = passport.authenticate('jwt', { session: false });
