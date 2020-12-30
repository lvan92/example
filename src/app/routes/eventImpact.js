
const EventImpactController = require('../controllers/eventImpact.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/eventImpact/:event_id')
    .put(access, EventImpactController.updateEventImpact.bind(EventImpactController));

module.exports = router;