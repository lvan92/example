const BaseRepository = require('./base.repository');

function SessionImpactRepository() {
    this.modelName = 'Session_Impact';
    BaseRepository.apply(this, arguments);
}

SessionImpactRepository.prototype = Object.create(BaseRepository.prototype);

SessionImpactRepository.prototype.constructor = SessionImpactRepository;

module.exports = new SessionImpactRepository();