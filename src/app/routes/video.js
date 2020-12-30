const VideoController = require('../controllers/video.controller');
const router = require('express').Router();
const passport = require('passport');

const access = passport.authenticate('jwt', { session: false });

router.route('/api/video/:video_id')
    .get(access, VideoController.getVideoByVideoId.bind(VideoController));

module.exports = router;