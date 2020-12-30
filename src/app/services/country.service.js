//Repositories
const CountryRepository = require('../repositories/country.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { countryBasicDTO } = require('../dto/country');


class CountryService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const option = { transacting: dbTransaction, require: false };

        const promise = CountryRepository.findAll(option).then(function (result) {
            return Promise.resolve({ items: countryBasicDTO(result) });
        });

        return promise;
    }
}

module.exports = CountryService;
