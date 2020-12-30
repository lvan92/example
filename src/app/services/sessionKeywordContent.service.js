const { assign } = require('lodash');
const Promise = require('bluebird');

//Repositories
const SessionKeywordContentRepository = require('../repositories/sessionKeywordContent.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSessionKeywordContentDTO, updateSessionKeywordContentDTO } = require('../dto/session_keyword_content');

const { config } = require('../../../configs');

class SessionKeywordContentService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createSessionKeywordContent(sessionKeywordReqs, sessionKeywordIds, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let result = [];
        if (sessionKeywordReqs !== undefined) {

                    try {
                        const sessionKeywordContentCreateData = createSessionKeywordContentDTO(sessionKeywordReqs, sessionKeywordIds);
                        await SessionKeywordContentRepository.batchInsert(`${config.database.migrations.schemaName}.session_keyword_content_multi_languages`,sessionKeywordContentCreateData, dbTransaction).then(function (data) {
                            result.push(data);
                        });
                    } catch (error) {
                        throw error;
                    }
        }

        return Promise.resolve(result);
    }

    async updateSessionKeywordContent(sessionKeywordReq, sessionKeywordId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let predicate = {
            session_keyword_id: sessionKeywordId,
        };

        if (sessionKeywordReq !== undefined) {
            try {
                let sessionKeywordContentPromise = await SessionKeywordContentRepository.findByProperty(predicate, option);
                let sessionkeywordContentData = assign({}, sessionKeywordContentPromise, updateSessionKeywordContentDTO(sessionKeywordContentPromise, sessionKeywordReq, sessionKeywordId));
                let sessionKeywordContentUpdateData = await SessionKeywordContentRepository.updateByProperty(predicate, sessionkeywordContentData, option);

                return sessionKeywordContentUpdateData;
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = new SessionKeywordContentService();
