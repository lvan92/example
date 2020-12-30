const BaseRepository = require('./base.repository');

function TribeContentRepository() {
    this.modelName = 'Tribe_Content';
    BaseRepository.apply(this, arguments);
}

TribeContentRepository.prototype = Object.create(BaseRepository.prototype);

TribeContentRepository.prototype.constructor = TribeContentRepository;

module.exports = new TribeContentRepository();