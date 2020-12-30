const BaseRepository = require('./base.repository');

function SoundRepository() {
    this.modelName = 'Sound';
    BaseRepository.apply(this, arguments);
}

SoundRepository.prototype = Object.create(BaseRepository.prototype);

SoundRepository.prototype.constructor = SoundRepository;

module.exports = new SoundRepository();