const ImpactController = require('../controllers/impact.controller');
const router = require('express').Router();
const passport = require('passport');
const access = passport.authenticate('jwt', { session: false });
const { validateCreateImpact, validateUpdateImpact } = require('../utils/validator');

router.route('/api/impact')
    .get(access, ImpactController.getAll.bind(ImpactController));

router.route('/api/impact')
    .post(access, validateCreateImpact, ImpactController.createImpact.bind(ImpactController));

router.route('/api/impact/:impact_id')
    .put(access, validateUpdateImpact, ImpactController.updateImpact.bind(ImpactController));

module.exports = router;