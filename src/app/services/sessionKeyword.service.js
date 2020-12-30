const { assign } = require('lodash');
const Promise = require('bluebird');

//Repositories
const SessionKeywordRepository = require('../repositories/sessionKeyword.repository');

//Services
const BaseService = require('./base.service');
const SessionKeywordContentService = require('./sessionKeywordContent.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSessionKeywordDTO, updateSessionKeywordDTO } = require('../dto/session_keyword');


class SessionKeywordService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createSessionKeyword(sessionKeywordReqs, sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);

        let result = [];
        if (sessionKeywordReqs !== undefined) {
            for (let sessionKeywordReq of sessionKeywordReqs) {
                try {
                    const sessionKeywordCreateData = createSessionKeywordDTO(sessionKeywordReq, sessionId);
                    await SessionKeywordRepository.insert(sessionKeywordCreateData, dbTransaction).then(function (data) {
                        result.push(data);
                    })
                } catch (error) {
                    throw error;
                }
            };
        }


        return Promise.resolve(result);
    }

    async updateSessionKeyword(sessionKeywordReqs, sessionId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false }
        let result = [];
        let predicate = {
            session_id: sessionId,
        }
        try {
            if (sessionKeywordReqs !== undefined) {
                let sessionKeywordPromise = await SessionKeywordRepository.findAllByProperty(predicate, option);
                let newSessionKeyword = updateSessionKeywordDTO(sessionKeywordReqs.session_keyword, sessionId);
                let sessionKeywordData = [];
                let sesionKeywordContentDatas = []
                for (let sessionKeywordReq of sessionKeywordReqs.session_keyword) {
                    if (sessionKeywordReq.session_keyword_id) {
                        sessionKeywordData = assign(sessionKeywordPromise, newSessionKeyword, sessionKeywordReq.session_keyword_id);

                        sesionKeywordContentDatas.push({
                            session_keyword_id: sessionKeywordReq.session_keyword_id,
                            session_keyword_content: sessionKeywordReq.session_keyword_content
                        });
                    } else {
                        const sessionKeywordData = await this.createSessionKeyword([sessionKeywordReq], sessionId, dbTransaction);

                        await SessionKeywordContentService.createSessionKeywordContent([sessionKeywordReq], sessionKeywordData, dbTransaction);

                    }
                }
                if (sessionKeywordData.length <= 3) {

                    let sessionKeywordUpdateData = await SessionKeywordRepository.batchUpdate(sessionKeywordData, dbTransaction);
                    for (let sessionKeywordContentData of sesionKeywordContentDatas) {
                        let sessionKeywordContentUpdateData = SessionKeywordContentService.updateSessionKeywordContent(sessionKeywordContentData.session_keyword_content, sessionKeywordContentData.session_keyword_id, dbTransaction);
                        result.push({ ...sessionKeywordUpdateData, ...sessionKeywordContentUpdateData });
                    }
                }
                if (sessionKeywordReqs.session_keyword_deleted.length > 0) {
                    for (let sessionKeywordId of sessionKeywordReqs.session_keyword_deleted) {
                        SessionKeywordRepository.destroy(sessionKeywordId, dbTransaction);
                    }
                }
            }
        } catch (error) {
            throw error;
        }
        return result
    }
}

module.exports = new SessionKeywordService();
