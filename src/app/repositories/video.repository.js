const BaseRepository = require('./base.repository');

function VideoRepository() {
    this.modelName = 'Video';
    BaseRepository.apply(this, arguments);
}

VideoRepository.prototype = Object.create(BaseRepository.prototype);

VideoRepository.prototype.constructor = VideoRepository;

module.exports = new VideoRepository();