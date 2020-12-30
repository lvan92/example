const SessionImpactController = require('../controllers/sessionImpact.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/sessionImpact/:session_id')
    .put(access, SessionImpactController.updateSessionImpact.bind(SessionImpactController));

module.exports = router;