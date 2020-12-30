const _ = require('lodash')

//Repositories
const SponsorRepository = require('../repositories/sponsor.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { sponsorBasicDTO } =require('../dto/sponsor');


class SponsorService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['sponsor_content', 'sponsor_content.language'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };
        const promise = SponsorRepository.findAll(option).then(function (result) {
            const sortedArray = _.orderBy(result, ['sponsor_content.sponsor_name'], ['asc'] );
            return Promise.resolve({ items: sponsorBasicDTO(sortedArray) });
        });

        return promise;
    }
}

module.exports = SponsorService;
