const { config } = require('../../../configs');

//Repositories
const EventImpactRepository = require('../repositories/eventImpact.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createEventImpactDTO } = require('../dto/event_impact');


class EventImpactService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async updateEventImpactByEvent(eventImpactReq, eventId, dbTransaction) {

        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let eventImpactData = createEventImpactDTO(eventImpactReq.impact, eventId);
        let eventImpactDataResult = await EventImpactRepository.batchInsert(`${config.database.migrations.schemaName}.event_impacts`, eventImpactData);
        return eventImpactDataResult;
    };

    async deletEventImpactByEventId(eventId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        let eventImpactDeleteResult = EventImpactRepository.destroy(eventId, option);
        return eventImpactDeleteResult;
    };

    async updateEventImpact(eventImpactReq, eventId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        let eventImpactData = createEventImpactDTO(eventImpactReq.impact, eventId);
        let eventImpactDeleteResult = this.deletEventImpactByEventId(eventId, { transacting: dbTransaction });

        if (Object.keys(eventImpactDeleteResult).length === 0) {
            let eventImpactDataResult = await EventImpactRepository.batchInsert(`${config.database.migrations.schemaName}.event_impacts`, eventImpactData);
            return eventImpactDataResult;
        };
    }
}

module.exports = new EventImpactService();
