const EventContentController = require('../controllers/eventContent.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/eventContent/:event_id')
    .put(access, EventContentController.updateEventContentByEvent.bind(EventContentController));

module.exports = router;