const _ = require('lodash');

//Repositories
const ImpactRepository = require('../repositories/impact.repository');
const ImpactContentRepository = require('../repositories/impactContent.repository');
const UserRepository = require('../repositories/user.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { impactBasicDTO, createImpactDTO, updateImpactDTO } = require('../dto/impact');
const { createImpactContentDTO, updateImpactContentDTO } = require('../dto/impact_content');


class ImpactService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['country', 'impact_content', 'impact_content.language', 'impact_content.category'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };

        const promise = ImpactRepository.findAll(option).then(function (result) {
            const sortedAray = _.orderBy(result, ['impact_content.impact_name'], ['asc']);

            return Promise.resolve({ items: impactBasicDTO(sortedAray) });
        });

        return promise;
    }

    async createImpact(impactReq, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };

        const user = await UserRepository.findByProperty(predicateUser, option);

        const promise = BaseService.setDbTransaction(function (dbTransaction) {
            const impactData = createImpactDTO(impactReq, user);
            return ImpactRepository.insert(impactData, option)
                .then(function (impact) {
                    const impactContentData = createImpactContentDTO(impactReq, impact.impact_id);
                    return ImpactContentRepository.insert(impactContentData, option)
                        .then(function (impactContent) {
                            return Promise.resolve({ ...impactContent, ...impact })
                        })
                        .catch(function (err) {
                            if (err) {
                                return Promise.reject(err);
                            }
                            return Promise.resolve();
                        });
                });
        });

        return promise;
    }

    async updateImpact(impactId, impact, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let predicate = {
            impact_id: impactId
        };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };
        const user = await UserRepository.findByProperty(predicateUser, option);
        const impactPromise = await ImpactRepository.findByProperty(predicate, option);
        const impactData = _.assign({}, impactPromise, updateImpactDTO(impactPromise, impact, user));

        const impactContentPromise = await ImpactContentRepository.findByProperty(predicate, option);
        const impactContentData = _.assign({}, impactContentPromise, updateImpactContentDTO(impactContentPromise, impact));

        const promise = BaseService.setDbTransaction(function (dbTransaction) {
            return ImpactRepository.updateByProperty(predicate, impactData, { transacting: dbTransaction })
                .then(function (objCode) {
                    return ImpactContentRepository.updateByProperty(predicate, impactContentData, { transacting: dbTransaction })
                        .then(function (objCode2) {
                            return Promise.resolve({ ...objCode, ...objCode2 });
                        })
                        .catch(function (err) {
                            if (err) {
                                return Promise.reject(err);
                            }
                            return Promise.resolve();
                        });
                });
        });

        return promise;
    }

}

module.exports = ImpactService;
