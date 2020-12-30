const { assign } = require('lodash')

//Repositories
const EventContentRepository = require('../repositories/eventContent.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { updateEventContentDTO } = require('../dto/event_content');


class EventContentService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async updateEventContentByEvent(eventContentReq, eventId, dbTransaction) {
        let predicate = {
            event_id: eventId
        };
        
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true };

        const eventContent = await EventContentRepository.findByProperty(predicate, option);
        const dataUpdate = assign({}, eventContent, updateEventContentDTO(eventContent, eventContentReq));
        try {
            const eventContentData = EventContentRepository.updateByProperty(predicate, dataUpdate, option);

            return eventContentData;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = new EventContentService();
