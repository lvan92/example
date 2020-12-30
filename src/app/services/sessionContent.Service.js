const { assign } = require('lodash');

//Repositories
const SessionContentRepository = require('../repositories/sessionContent.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSessionContentDTO, updateSessionContentDTO } = require('../dto/session_content');


class SessionContentService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createSessionContent(sessionContentReq, sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const sessionContentCreateData = createSessionContentDTO(sessionContentReq, sessionId);
        try {
            const sessionContentData = SessionContentRepository.insert(sessionContentCreateData, dbTransaction);

            return sessionContentData;
        } catch (error) {
            throw error;
        }
        
    }

    async updateSessionContent(sessionContentReqs, sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let predicate = {
            session_id: sessionId,
        }
        try {
            let sessionContentPromise = await SessionContentRepository.findByProperty(predicate, option);

            let sessionContentData = assign({}, sessionContentPromise, updateSessionContentDTO(sessionContentPromise, sessionContentReqs, sessionId));
            let sessionContentUpdateData = SessionContentRepository.updateByProperty(predicate, sessionContentData, { transacting: dbTransaction });
            return sessionContentUpdateData;
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = new SessionContentService();
