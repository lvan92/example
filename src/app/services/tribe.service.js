const { orderBy } = require('lodash');
const ERROR_CODE = require('../constants/errorCode');

//Repositories
const TribeRepository = require('../repositories/tribe.repository');
const UserRepository = require('../repositories/user.repository');
const TribeContentRepository = require('../repositories/tribeContent.respository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { tribeBasicDTO, tribeDetailDTO, tribeCreateDTO, tribeContentDTO, updateTribeDTO } =require('../dto/tribe');


class TribeService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['tribe_content', 'tribe_content.language', 'user', 'event_as_home', 'event_as_guess'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };
        const promise = TribeRepository.findAll(option).then(function (result) {
            const sortedList = orderBy(result, [tribe => tribe.tribe_content.tribe_name], ['asc']);
            return Promise.resolve({ items: tribeBasicDTO(sortedList) });
        });

        return promise;
    }

}

module.exports = TribeService;
