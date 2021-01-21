const { assign } = require('lodash');

//Repositories
const TribeContentRepository = require('../repositories/tribeContent.respository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createTribeContentDTO, updateTribeContentDTO, tribeContentDetailDTO } = require('../dto/tribe_content');


class TribeContentService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createTribeContent(tribeContentReq, tribeId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const tribeContentCreateData = createTribeContentDTO(tribeContentReq, tribeId);
        try {
            const tribeContentData = TribeContentRepository.insert(tribeContentCreateData, dbTransaction);

            return tribeContentData;
        } catch (error) {
            throw error;
        }
    }

    async deleteTribeContent(tribe_Id, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        try {
            const tribeContentData = await TribeContentRepository.destroy(tribe_Id, dbTransaction);
            return tribeContentData;
        } catch (error) {
            throw error;
        }
    }

    async findById(tribe_Id, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true};
        const predicate = {
            tribe_id: tribe_Id
        }
        try {
            const tribeContentData = await TribeContentRepository.findByProperty(predicate, option);
            const result = await tribeContentDetailDTO(tribeContentData)
            return result;
        } catch (error) {
            throw error;
        }
    }


    // async updateSessionContent(sessionContentReqs, sessionId, dbTransaction) {
    //     dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
    //     let option = { transacting: dbTransaction, require: false };

    //     let predicate = {
    //         session_id: sessionId,
    //     }
    //     try {
    //         let sessionContentPromise = await SessionContentRepository.findByProperty(predicate, option);

    //         let sessionContentData = assign({}, sessionContentPromise, updateSessionContentDTO(sessionContentPromise, sessionContentReqs, sessionId));
    //         let sessionContentUpdateData = SessionContentRepository.updateByProperty(predicate, sessionContentData, { transacting: dbTransaction });
    //         return sessionContentUpdateData;
    //     } catch (error) {
    //         throw error;
    //     }
        
    // }
}

module.exports = new TribeContentService();
