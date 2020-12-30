const BaseRepository = require('./base.repository');

function UserRepository() {
    this.modelName = 'Users';
    BaseRepository.apply(this, arguments);
}

UserRepository.prototype = Object.create(BaseRepository.prototype);

UserRepository.prototype.constructor = UserRepository;

module.exports = new UserRepository();