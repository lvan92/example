//Repositories
const UserRepository = require('../repositories/user.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');



class UserService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getUserByName(userName, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const predicate = {
            user_name: userName
        };
        const option = { transacting: dbTransaction, require: false};
        const promise = UserRepository.findByProperty(predicate, option).then(function (result) {
            if (result !== null) {
                return Promise.resolve(result);
            }
            return Promise.reject(() => {
                throw new Error('User Not Found')
            })
        });

        return promise;
    }
}

module.exports = new UserService();
