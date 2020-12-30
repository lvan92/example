
const  AuthController  = require('../controllers/auth.controller');
const  router          = require('express').Router();

router.route('/api/login')
    .post(AuthController.login.bind(AuthController));

module.exports = router;