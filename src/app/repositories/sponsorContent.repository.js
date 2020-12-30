const BaseRepository = require('./base.repository');

function SponsorContentRepository() {
    this.modelName = 'Sponsor_Content';
    BaseRepository.apply(this, arguments);
}

SponsorContentRepository.prototype = Object.create(BaseRepository.prototype);

SponsorContentRepository.prototype.constructor = SponsorContentRepository;

module.exports = new SponsorContentRepository();