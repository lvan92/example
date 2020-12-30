const _ = require('lodash');

//Repositories
const EventGroupRepository = require('../repositories/eventGroup.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DOT
const { eventGroupBasicDTO } = require('../dto/event_group');


class EventGroupService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['event_group_content', 'event_group_content.country', 'event'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };

        const promise = EventGroupRepository.findAll(option).then(function (result) {
            const sortedArray = _.orderBy(result, ['event_group_content.event_sport_group_name'], ['asc']);

            return Promise.resolve({ items: eventGroupBasicDTO(sortedArray) });
        });

        return promise;
    }
}

module.exports = EventGroupService;
