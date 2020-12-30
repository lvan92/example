const BaseRepository = require('./base.repository');

function EventContentRepository() {
    this.modelName = 'Event_Content';
    BaseRepository.apply(this, arguments);
}

EventContentRepository.prototype = Object.create(BaseRepository.prototype);

EventContentRepository.prototype.constructor = EventContentRepository;

module.exports = new EventContentRepository();