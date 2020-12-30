
const EventController = require('../controllers/event.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });
const { validateCreateEvent } = require('../utils/validator');

router.route('/api/event/:event_id?')
    .put(access, EventController.updateEvent.bind(EventController));

router.route('/api/event/:event_id/status')
    .put(access, EventController.changeEventStatus.bind(EventController));

router.route('/api/event')
    .post(access, validateCreateEvent, EventController.createEvent.bind(EventController));

router.route('/api/event/condition/:condition?')
    .get(access, EventController.getAllEvent.bind(EventController));

router.route('/api/event/upComing')
    .get(access, EventController.getAllEventUpComing.bind(EventController));
    
router.route('/api/event/:event_id')
    .get(access, EventController.getEventDetail.bind(EventController));

router.route('/api/event/:event_id/updateAt')
    .get(access, EventController.updateAtEventDetail.bind(EventController));

router.route('/api/event/:event_id')
    .delete(access, EventController.deleteEvent.bind(EventController));
module.exports = router;