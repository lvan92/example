const BaseRepository = require('./base.repository');

function SessionContentRepository() {
    this.modelName = 'Session_Content';
    BaseRepository.apply(this, arguments);
}

SessionContentRepository.prototype = Object.create(BaseRepository.prototype);

SessionContentRepository.prototype.constructor = SessionContentRepository;

module.exports = new SessionContentRepository();