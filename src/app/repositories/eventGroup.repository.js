const BaseRepository = require('./base.repository');

function EventGroupRepository() {
    this.modelName = 'Event_Sport_Group'; 
    
    BaseRepository.apply(this, arguments);
}

EventGroupRepository.prototype = Object.create(BaseRepository.prototype);


EventGroupRepository.prototype.constructor = EventGroupRepository;

module.exports = new EventGroupRepository();