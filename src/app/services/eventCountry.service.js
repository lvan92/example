const { assign } = require('lodash');

//Repositories
const EventCountryRepository = require('../repositories/eventCountry.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { updateEventCountryDTO } = require('../dto/event_country');


class EventCountryService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async updateEventCountryByEvent(eventCountryReq, eventId, dbTransaction) {
        let predicate = {
            event_id: eventId
        };

        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true };

        const eventCountry = await EventCountryRepository.findByProperty(predicate, option);
        const dataUpdate = assign({}, eventCountry, updateEventCountryDTO(eventCountry, eventCountryReq));
        try {
            const eventCountryData = EventCountryRepository.updateByProperty(predicate, dataUpdate, option);

            return eventCountryData;
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = new EventCountryService();
