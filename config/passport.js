// config/passport.js
import passportJWT from 'passport-jwt';
import User from '../models/user/User.js';
import '../config/passport.js';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;



const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const configurePassport = passport => passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {

        User.findById(jwt_payload.userId)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));

    })
);


export default configurePassport;

