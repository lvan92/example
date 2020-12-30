const BaseRepository = require('./base.repository');

function ImpactRepository() {
    this.modelName = 'Impact'; 
    
    BaseRepository.apply(this, arguments);
}

ImpactRepository.prototype = Object.create(BaseRepository.prototype);


ImpactRepository.prototype.constructor = ImpactRepository;

module.exports = new ImpactRepository();