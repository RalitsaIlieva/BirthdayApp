import passportJwt from 'passport-jwt';
import { PRIVATE_KEY } from '../config.js';

const options = {
  secretOrKey: PRIVATE_KEY,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
  const userData = {
    id: payload.id,
    username: payload.username
  };

  done(null, userData);
});

export default jwtStrategy;
