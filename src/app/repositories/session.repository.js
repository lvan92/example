const BaseRepository = require('./base.repository');

function SessionRepository() {
    this.modelName = 'Session';
    BaseRepository.apply(this, arguments);
}

SessionRepository.prototype = Object.create(BaseRepository.prototype);

SessionRepository.prototype.constructor = SessionRepository;

module.exports = new SessionRepository();