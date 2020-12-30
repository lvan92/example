const CountryController = require('../controllers/country.controller');
const router = require('express').Router();
const passport = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/country')
    .get(access, CountryController.getAll.bind(CountryController));

module.exports = router;