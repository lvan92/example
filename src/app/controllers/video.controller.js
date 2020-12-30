const BaseController = require('./base_controller');
const VideoService = require('../services/video.service');

function VideoController() {
    BaseController.apply(this, arguments);
    this.VideoService = new VideoService();
}

VideoController.prototype = Object.create(BaseController.prototype);

VideoController.prototype.constructor = VideoController;

VideoController.prototype.getVideoByVideoId = function (req, res, next) {
    const self = this;
    const videoId = parseInt(req.params.video_id);

    const promise = self.VideoService.getVideoByVideoId(videoId);
    this.sendResponse(promise, req, res, next);
  }

module.exports = new VideoController();