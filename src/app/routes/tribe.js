const TribeController = require('../controllers/tribe.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });

router.route('/api/tribe')
    .get(access, TribeController.getAll.bind(TribeController));

router.route('/api/tribe')
    .post(access, TribeController.createTribe.bind(TribeController));

router.route('/api/tribe/:tribe_id')
    .delete(access, TribeController.deleteTribe.bind(TribeController));

router.route('/api/tribe/:tribe_id')
    .get(access, TribeController.findById.bind(TribeController));

module.exports = router;

