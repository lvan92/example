const BaseRepository = require('./base.repository');

function CountryRepository() {
    this.modelName = 'Country';
    BaseRepository.apply(this, arguments);
}

CountryRepository.prototype = Object.create(BaseRepository.prototype);

CountryRepository.prototype.constructor = CountryRepository;

module.exports = new CountryRepository();