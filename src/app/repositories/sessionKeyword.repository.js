const BaseRepository = require('./base.repository');

function SessionKeywordRepository() {
    this.modelName = 'Session_Keyword';
    BaseRepository.apply(this, arguments);
}

SessionKeywordRepository.prototype = Object.create(BaseRepository.prototype);

SessionKeywordRepository.prototype.constructor = SessionKeywordRepository;

module.exports = new SessionKeywordRepository();