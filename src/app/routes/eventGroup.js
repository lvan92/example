
const EventGroupController = require('../controllers/eventGroup.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/eventGroup')
    .get(access, EventGroupController.getAll.bind(EventGroupController));

module.exports = router;