'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

const ResponseSerializer = require('../utils/responseSerializer');

const BaseService = require('../services/base.service');

function BaseController() {
    this.BaseService = new BaseService();
    this.resource = null;
}

BaseController.prototype.setDbTransaction = function (callback) {
    return this.Business.setDbTransaction(callback);
}
BaseController.prototype.sendResponseWithResult = function (result, req, res, next) {
    const promise = new Promise(function(resolve, reject) {
        res.set('Cache-Control', 'no-cache,no-store');
        res.json(result);
        resolve(result);
     } );
}
BaseController.prototype.sendResponse = function (promise, req, res, next) {
    return formatResponse(promise, this.resource)
        .then(function (result) {
            res.set('Cache-Control', 'no-cache,no-store');
            res.json(result);
        })
        .catch(function (error) {
            next(error);
        });
}

BaseController.prototype.sendRawResponse = function (promise, req, res, next) {
    return formatRawResponse(promise, this.resource)
        .then(function (result) {
            res.set('Cache-Control', 'no-cache,no-store');
            res.json(result);
        })
        .catch(function (error) {
            next(error);
        });
}

function formatResponse(responsePromise, resource) {
    let formattedResponse = {};

    return responsePromise.then(function (results) {
        if (_.isArray(results)) {
            formattedResponse = ResponseSerializer.collectionResourceResponse(results, resource);
        }
        else {
            formattedResponse = ResponseSerializer.singleResourceResponse(results, resource);
        }

        return Promise.resolve(formattedResponse);
    });
}

function formatRawResponse(responsePromise, resource) {
    let formattedResponse = {};

    return responsePromise.then(function (results) {
        if (_.isArray(results)) {
            formattedResponse = ResponseSerializer.collectionResourceRawResponse(results, resource);
        }
        else {
            formattedResponse = ResponseSerializer.singleResourceResponse(results, resource);
        }

        return Promise.resolve(formattedResponse);
    });
}

module.exports = BaseController;