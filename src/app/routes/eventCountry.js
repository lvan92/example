const EventCountryController = require('../controllers/eventCountry.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/eventCountry/:event_id')
    .put(access, EventCountryController.updateEventCountryByEvent.bind(EventCountryController));

module.exports = router;