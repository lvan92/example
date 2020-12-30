const SessionController = require('../controllers/session.controller');
const router = require('express').Router();
const passport = require('passport');
const { validateCreateSession } = require('../utils/validator');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/session')
    .post(access, validateCreateSession, SessionController.createSession.bind(SessionController));

router.route('/api/session')
    .put(access, SessionController.updateSession.bind(SessionController));

router.route('/api/session/delete')
    .post(access, SessionController.deleteSession.bind(SessionController));

router.route('/api/session/:session_id')
    .get(access, SessionController.getSessionbySessionId.bind(SessionController));

module.exports = router;