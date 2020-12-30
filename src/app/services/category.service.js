

//Repositories
const CategoryRepository = require('../repositories/category.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');


class CategoryService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    createCategory(category, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);

        const promise = CategoryRepository.insert(category, { transacting: dbTransaction });

        return promise;
    }
}

module.exports = CategoryService;
