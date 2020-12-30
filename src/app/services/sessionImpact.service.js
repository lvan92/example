const { config } = require('../../../configs');

//Repositories
const SessionImpactRepository = require('../repositories/sessionImpact.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSessionImpactDTO } = require('../dto/session_impact');


class EventImpactService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createSessionImpact(sessionImpactReq, sessionId, dbTransaction) {

        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);

        let sessionImpactData = createSessionImpactDTO(sessionImpactReq, sessionId);
        let sessionImpactDataResult = await SessionImpactRepository.batchInsert(`${config.database.migrations.schemaName}.session_impacts`, sessionImpactData);
        return sessionImpactDataResult;
    };

    async deleteSessionImpactBySessionId(sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        let sessionImpactDeleteResult = SessionImpactRepository.destroy(sessionId, option);
        return sessionImpactDeleteResult;
    };

    async updateSessionImpact(sessionImpactReq, sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let sessionImpactData = createSessionImpactDTO(sessionImpactReq.impact, sessionId);

        if (sessionImpactReq.session_impact_deleted.length > 0) {
            for (let sessionId of sessionImpactReq.session_impact_deleted) {
                this.deleteSessionImpactBySessionId(sessionId, { transacting: dbTransaction });
            }
            let sessionImpactDataResultWithDeleted = await SessionImpactRepository.batchInsert(`${config.database.migrations.schemaName}.session_impacts`, sessionImpactData);
            return sessionImpactDataResultWithDeleted;
        } else {
            let sessionImpactDataResult = await SessionImpactRepository.batchInsert(`${config.database.migrations.schemaName}.session_impacts`, sessionImpactData);
            return sessionImpactDataResult;
        }
    }
}

module.exports = new EventImpactService();