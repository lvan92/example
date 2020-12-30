const BaseRepository = require('./base.repository');

function ImpactContentRepository() {
    this.modelName = 'Impact_Content'; 
    
    BaseRepository.apply(this, arguments);
}

ImpactContentRepository.prototype = Object.create(BaseRepository.prototype);


ImpactContentRepository.prototype.constructor = ImpactContentRepository;

module.exports = new ImpactContentRepository();