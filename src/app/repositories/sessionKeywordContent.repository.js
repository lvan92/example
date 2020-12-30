const BaseRepository = require('./base.repository');

function SessionKeywordContentRepository() {
    this.modelName = 'Session_Keyword_Content';
    BaseRepository.apply(this, arguments);
}

SessionKeywordContentRepository.prototype = Object.create(BaseRepository.prototype);

SessionKeywordContentRepository.prototype.constructor = SessionKeywordContentRepository;

module.exports = new SessionKeywordContentRepository();