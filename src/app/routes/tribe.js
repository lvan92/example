const TribeController = require('../controllers/tribe.controller');
const router = require('express').Router();
const passport = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/tribe')
    .get(access, TribeController.getAll.bind(TribeController));
module.exports = router;