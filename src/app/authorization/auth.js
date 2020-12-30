const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const UserRepository = require('../repositories/user.repository');
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    const user = UserRepository.findByProperty({ user_id: jwt_payload.user_id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports = strategy;