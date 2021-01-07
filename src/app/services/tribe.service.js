const { orderBy } = require('lodash');
const ERROR_CODE = require('../constants/errorCode');

//Repositories
const TribeRepository = require('../repositories/tribe.repository');
const UserRepository = require('../repositories/user.repository');
const TribeContentRepository = require('../repositories/tribeContent.respository');

//Services
const BaseService = require('./base.service');
const TribeContentService = require('./tribeContent.service')
// Utilities
const Utils = require('../utils/common');

//DTO
const { tribeBasicDTO, tribeDetailDTO, tribeCreateDTO, updateTribeDTO } =require('../dto/tribe');
const { createTribeContentDTO, updateTribeContentDTO } = require('../dto/tribe_content');


class TribeService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['tribe_content', 'tribe_content.language', 'user', 'event_as_home', 'event_as_guess', 'category'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };
        const promise = TribeRepository.findAll(option).then(function (result) {
            const sortedList = orderBy(result, [tribe => tribe.tribe_content.tribe_name], ['asc']);
            return Promise.resolve({ items: tribeBasicDTO(sortedList) });
        });

        return promise;
    }

    static async getTribeTribeId(tribe_id, dbTransaction) {

        let predicate = {
            tribe_id: tribe_id
        }
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true };
        
        let tribeData = await TribeRepository.findByProperty(predicate, option);
        let userData = await UserService.getUserByName('ultrasyncAdministrator');
        let result = tribeDetailDTO(tribeData, userData);
        
        return result;
    }
                 
    async createTribe(tribeReq, dbTransaction) {
        // const user = await UserService.getUserByName('ultrasyncAdministrator');
        // console.log(user)
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };

        const user = await UserRepository.findByProperty(predicateUser, option);
        // console.log(user)
        const promise = BaseService.setDbTransaction(async function (dbTransaction) {
            let option = { transacting: dbTransaction };
            let result;
            try {
                // console.log(tribeReq)
                const tribeCreatedData = await tribeCreateDTO(tribeReq, user);
                // console.log(tribeCreatedData)
                const tribeData = await TribeRepository.insert(tribeCreatedData, option);
                const tribeContentData = await TribeContentService.createTribeContent(tribeReq, tribeData.tribe_id, option);
                result = { ...tribeData, ...tribeContentData};
            
            } catch (error) {
                console.log(error)
                return Promise.reject(error)
            }
            return Promise.resolve(result);
        });

        return promise;
    };

    async deleteTribe(tribe_id, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true, casadeDelete: true };
        let result;
        
        try{
            // let tribeContentDataResult = await TribeContentService.deleteTribeContent(tribe_id, option)
            let tribeDataResult = await TribeRepository.destroy(tribe_id, option);
            result = tribeDataResult
            
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
        return Promise.resolve(result);
    };

    async findById(tribe_id, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true};

        let result;
        try{
            // let tribeContentDataResult = await TribeContentService.deleteTribeContent(tribe_id, option)
            let tribeData = await TribeRepository.findById(tribe_id, option)
            let tribeDataResult = await tribeDetailDTO(tribeData)
            //tribe content result 
            let tribeDataContentResult = await TribeContentService.findById(tribe_id)
            result = {...tribeDataResult, ...tribeDataContentResult}
            
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
        return Promise.resolve(result);
    };

    async updateTribe(tribe_id, tribe, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let predicate = {
            tribe_id: tribe_id
        };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };
        const user = await UserRepository.findByProperty(predicateUser, option);
        const tribePromise = await TribeRepository.findByProperty(predicate, option);
        const tribeData = _.assign({}, tribePromise, updateTribeDTO(tribePromise, tribe, user));

        const tribeContentPromise = await TribeContentRepository.findByProperty(predicate, option);
        const tribeContentData = _.assign({}, tribeContentPromise, updateTribeContentDTO(tribeContentPromise, tribe, tribe_id));

        const promise = BaseService.setDbTransaction(function (dbTransaction) {
            return TribeRepository.updateByProperty(predicate, tribeData, { transacting: dbTransaction })
                .then(function (objCode) {
                    return TribeContentRepository.updateByProperty(predicate, tribeContentData, { transacting: dbTransaction })
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

module.exports = TribeService;
