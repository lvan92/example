const BaseRepository = require('./base.repository');

function CategoryRepository() {
    this.modelName = 'Event_Impact';
    BaseRepository.apply(this, arguments);
}

CategoryRepository.prototype = Object.create(BaseRepository.prototype);

CategoryRepository.prototype.constructor = CategoryRepository;

module.exports = new CategoryRepository();