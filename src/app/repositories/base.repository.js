const { isUndefined, each, isString, isError, attempt } = require('lodash');
const Promise = require("bluebird");

const appBookshelf = require('../models/app_bookshelf');
const { QUERY } = require('../constants/BaseApiResource');
function BaseRepository() {

    const hasModelName = isString(this.modelName)
        && this.modelName.trim() !== '';
    if (!hasModelName) {
        throw new Error('modelName (string) of ' + this.constructor.name + ' is missing');
    }

    this.bookshelf = appBookshelf;
}

BaseRepository.prototype.getValue = function (input, defaultValue) {
    return typeof input !== 'undefined' ? input : defaultValue;
};

// Class (ie. static) functions
BaseRepository.setDbTransaction = function (callback) {
    return appBookshelf.transaction(callback);
};

// Instance functions
BaseRepository.prototype.getModel = function () {
    return require('../models/')[this.modelName];
};

BaseRepository.prototype.findAll = function (options) {
    try {
        const Model = this.getModel();
        if (this.modelName === 'Country') {
            var promise = new Model().orderBy('country_name', 'ASC').fetchAll(options);
        } else {
            var promise = new Model().orderBy('created_at', 'DESC').fetchAll(options);
        }

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }
};

BaseRepository.prototype.findById = function (id, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.require = isUndefined(options.require) ? true : options.require;

        const promise = model.where({ [model.idAttribute]: id }).fetch(options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }

};

BaseRepository.prototype.findByProperty = function (predicate, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.require = isUndefined(options.require) ? true : options.require;

        const promise = model.where(predicate).fetch(options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }

};

BaseRepository.prototype.findAllByProperty = function (predicate, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.require = isUndefined(options.require) ? true : options.require;

        const promise = model.where(predicate).fetchAll(options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }

};

BaseRepository.prototype.findAllByPropertyWithOperator = function (column, operator, value, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.require = isUndefined(options.require) ? true : options.require;

        const promise = model.where(column, operator, value).orderBy(column, 'desc').fetchAll(options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }

};

BaseRepository.prototype.insert = function (data, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();

        options.method = QUERY.INSERT;

        const promise = new Model(data).save(null, options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }
};

BaseRepository.prototype.batchInsert = function (tableName, array, options) {
    try {
        const transaction = options ? options.transacting : null;
        const knex = this.bookshelf.knex;
        return knex.batchInsert(tableName, array, 1000).returning('*').transacting(transaction);
    } catch (error) {
        throw error
    }
};

BaseRepository.prototype.update = function (data, options) {
    try {
        options = this.getValue(options, {});
        data.updated_at = new Date(new Date().getTime());
        const Model = this.getModel();

        options.method = QUERY.UPDATE;
        const promise = new Model(data).save(null, options);

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }

};

BaseRepository.prototype.batchUpdate = function (array, options) {
    try {
        options = this.getValue(options, {});
        options.method = QUERY.UPDATE;
        let Model = this.getModel();
        const queries = [];
        if (array.length <= 0) {
            return Promise.resolve();
        }
        each(array, function (item) {
            if (item.updatedAt) {
                item.updatedAt = new Date(new Date().getTime());
            }
            const query = new Model(item).save(null, options);
            queries.push(query);
        });
        return this.handleBookshelfPromise(Promise.all(queries));
    } catch (error) {
        throw error;
    }
};

BaseRepository.prototype.destroy = function (id, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.cascadeDelete = this.getValue(options.cascadeDelete, false);

        const promise = model.where({ [model.idAttribute]: id }).destroy({ cascadeDelete : true });

        return this.handleBookshelfPromise(promise);
    } catch (error) {
        throw error;
    }
};

BaseRepository.prototype.updateByProperty = function (predicate, data, options) {
    try {
        options = this.getValue(options, {});
        const Model = this.getModel();
        const model = new Model();

        options.method = QUERY.UPDATE;
        options.require = isUndefined(options.require) ? true : options.require;
        const promise = model.where(predicate).save(data, options);
        return this.handleBookshelfPromise(promise);

    } catch (error) {
        throw error
    }
}

// Use this function when the bookshelf promise resolve bookshelf.Model or bookshelf.Collection
//
// DONT NEED TO USE THIS, when:
// - Promise resolve normal Javascript datatypes (e.g. int, array, plain object)
// - Or call another repo function
BaseRepository.prototype.handleBookshelfPromise = function (promise) {
    return promise.then(function (rows) {
        const json = getJsonOrNull(rows);
        return Promise.resolve(json);
    });
}

function getJsonOrNull(data) {
    let json = attempt(function dataToJson(d) {
        return d.toJSON();
    }, data);

    if (isError(json)) {
        json = null;
    }

    return json;
}

module.exports = BaseRepository;