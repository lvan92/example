const SoundController = require('../controllers/sound.controller');
const router = require('express').Router();
const passport = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/sound')
    .post(access, SoundController.createSound.bind(SoundController));
router.route('/api/sound')
    .get(access, SoundController.getAll.bind(SoundController));
router.route('/api/sound/:sound_id')
    .delete(access, SoundController.deleteSound.bind(SoundController));

module.exports = router;