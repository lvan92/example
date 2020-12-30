const _ = require('lodash');

//Repositories
const SessionRepository = require('../repositories/session.repository');
const SessionKeywordRepository = require('../repositories/sessionKeyword.repository');

//Services
const UserService = require('../services/user.service');
const SessionContentService = require('./sessionContent.Service');
const SessionKeywordService = require('./sessionKeyword.service');
const SessionKeywordContentService = require('./sessionKeywordContent.service');
const SessionImpactService = require('../services/sessionImpact.service');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSessionDTO, updateSessionDTO, sessionDetailDTO } = require('../dto/session');


class SessionService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    static getSessionByEventId(eventId, dbTransaction) {

        let predicate = {
            event_id: eventId
        }
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['session_content', 'session_keyword', 'session_keyword.session_keyword_content'];
        const option = { transacting: dbTransaction, require: true, withRelated: relations };

        const sessionListData = SessionRepository.findAllByProperty(predicate, option);
        return sessionListData;
    }

    static async getSessionSessionId(sessionId, dbTransaction) {

        let predicate = {
            session_id: sessionId
        }
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true };
        
        let sessionData = await SessionRepository.findByProperty(predicate, option);
        let userData = await UserService.getUserByName('ultrasyncAdministrator');
        let result = sessionDetailDTO(sessionData, userData);
        
        return result;
    }

    static async createSession(sessionReqs) {
        const user = await UserService.getUserByName('ultrasyncAdministrator');

        const promise = BaseService.setDbTransaction(async function (dbTransaction) {
            let option = { transacting: dbTransaction };
            let result = [];
            try {
                for (let sessionReq of sessionReqs) {
                    const sessionCreateData = createSessionDTO(sessionReq, user);
                    const sesssionData = await SessionRepository.insert(sessionCreateData, option);
                    const sessionImpactData = await SessionImpactService.createSessionImpact(sessionReq.impact, sesssionData.session_id);
                    const sessionContentData = await SessionContentService.createSessionContent(sessionReq, sesssionData.session_id, option);
                    const sessionKeywordData = await SessionKeywordService.createSessionKeyword(sessionReq.session_keyword, sesssionData.session_id, option)

                    const sessionKeywordContentData = await SessionKeywordContentService.createSessionKeywordContent(sessionReq.session_keyword, sessionKeywordData, option);
                    result.push({ ...sesssionData, ...sessionImpactData, ...{ session_content: sessionContentData }, ...{ session_keyword: sessionKeywordData }, ...{ session_keyword_content: sessionKeywordContentData} });
                }
            } catch (error) {
                return Promise.reject(error)
            }
            return Promise.resolve({ session: result });
        });

        return promise;
    };

    static async deleteSession(session, dbTransaction) {


        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true, casadeDelete: true };
        if (session.session_deleted.length > 0) {
            for (let sessionId of session.session_deleted) {
                let sessionDeleteResult = await SessionRepository.destroy(sessionId, option);
            };
        };
    };

    static async updateSession(sessionReqs, dbTransaction) {
        let result = [];

        let user = await UserService.getUserByName('ultrasyncAdministrator');
        const promise = BaseService.setDbTransaction(async function (dbTransaction) {
            try {
                let option = { transacting: dbTransaction };
                if (sessionReqs.session_update.length > 0) {
                    for (let sessionDataUpdate of sessionReqs.session_update) {
                        if (sessionDataUpdate.session_id !== undefined) {
                            let predicate = {
                                session_id: sessionDataUpdate.session_id,
                            }
                            let sessionPromise = await SessionRepository.findByProperty(predicate, option);
                            let sessionData = _.assign({}, sessionPromise, updateSessionDTO(sessionPromise, sessionDataUpdate, user));
                            let sessionUpdateData = await SessionRepository.updateByProperty(predicate, sessionData, option);
                            let sessionContentUpdateData = await SessionContentService.updateSessionContent(sessionDataUpdate, predicate.session_id, option);
                            if (sessionDataUpdate.session_keyword.length > 0) {
                                let sessionKeywordUpdateData = await SessionKeywordService.updateSessionKeyword(sessionDataUpdate, predicate.session_id, option);
                                result.push({...sessionUpdateData, ...sessionContentUpdateData, ...{ session_keyword: sessionKeywordUpdateData }});
                            }
                            if (sessionDataUpdate.session_keyword_deleted.length > 0) {
                                for (let sessionKeywordId of sessionDataUpdate.session_keyword_deleted) {
                                    SessionKeywordRepository.destroy(sessionKeywordId, option);
                                }
                            }

                        } else {
                            let sessionCreateData = SessionService.createSession([sessionDataUpdate]);
                        };
                    };
                }

            } catch (error) {
                return Promise.reject(error)
            }
            return Promise.resolve(result);
        });

        return promise;

    }
}

module.exports = SessionService;
