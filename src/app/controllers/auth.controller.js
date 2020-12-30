const BaseController  = require('./base_controller');
const UserRepository  = require('../repositories/user.repository');
const jwt             = require('jsonwebtoken');

function AuthController() {
    BaseController.apply(this, arguments);
}

AuthController.prototype = Object.create(BaseController.prototype);

AuthController.prototype.constructor = AuthController;

AuthController.prototype.login = async function(req, res, next) {
    const { name, password } = req.body;
    if (name && password) {
        let user = await UserRepository.findByProperty({ user_name: name });
        if (!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        if (user.user_password === password) {
            // token expired in 1 hour
            const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
            let payload = { user_id: user.user_id, exp: expiration };
            let token = jwt.sign(payload, process.env.SECRET_KEY);
            res.json({ msg: 'ok', token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
};

module.exports = new AuthController();