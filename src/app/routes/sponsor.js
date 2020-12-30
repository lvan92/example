const SponsorController = require('../controllers/sponsor.controller');
const router = require('express').Router();
const passport = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/sponsor')
    .get(access, SponsorController.getAll.bind(SponsorController));

module.exports = router;