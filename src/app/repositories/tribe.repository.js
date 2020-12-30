const BaseRepository = require('./base.repository');

function TribeRepository() {
    this.modelName = 'Tribe';
    BaseRepository.apply(this, arguments);
}

TribeRepository.prototype = Object.create(BaseRepository.prototype);

TribeRepository.prototype.constructor = TribeRepository;

module.exports = new TribeRepository();