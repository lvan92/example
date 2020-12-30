const BaseRepository = require('./base.repository');

function EventRepository() {
    this.modelName = 'Event';
    BaseRepository.apply(this, arguments);
}

EventRepository.prototype = Object.create(BaseRepository.prototype);

EventRepository.prototype.constructor = EventRepository;

module.exports = new EventRepository();