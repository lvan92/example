const BaseRepository = require('./base.repository');

function EventCountryRepository() {
    this.modelName = 'Event_Country';
    BaseRepository.apply(this, arguments);
}

EventCountryRepository.prototype = Object.create(BaseRepository.prototype);

EventCountryRepository.prototype.constructor = EventCountryRepository;

module.exports = new EventCountryRepository();