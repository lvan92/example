const BaseRepository = require('./base.repository');

function SponsorRepository() {
    this.modelName = 'Sponsor';
    BaseRepository.apply(this, arguments);
}

SponsorRepository.prototype = Object.create(BaseRepository.prototype);

SponsorRepository.prototype.constructor = SponsorRepository;

module.exports = new SponsorRepository();