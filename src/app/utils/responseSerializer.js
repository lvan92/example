"use strict"
const RESOURCES = require('../constants/BaseApiResource');
const { HTTP_CODE } = require('../constants/http');
const _ = require('lodash');
class ResponseSerializer {
    constructor() {
    }
    singleResourceResponse(data, resource) {
        return {
            data: data,
            meta: {
                type: resource
            }
        };
    }
    collectionResourceResponse(data, resource) {
        const items = createListItems(data, resource);

        return {
            items: items,
            meta: {
                type: RESOURCES.COLLECTION,
                count: items.length
            }
        };
    }
    collectionResourceRawResponse(data, resource) {
        return {
            items: data,
            meta: {
                type: RESOURCES.COLLECTION,
                count: data.length
            }
        };
    }
    createErrorResult(err, httpStatus) {
        httpStatus = httpStatus || HTTP_CODE.BAD_REQUEST;

        if (err.name === "ValidationError") {
            return buildValidationErrorResponse(err, httpStatus);
        }
        else if (err.resource) {
            return buildResourceErrorResponse(err, httpStatus);
        }
        else if (_.isArray(err)) {
            return buildErrorResponseFromArray(err, httpStatus);
        }

        return buildSystemErrorResponse(err);
    }
}




function createListItems(data, resource) {
    const items = [];
    data.forEach(function (item) {
        items.push({
            data: item,
            meta: {
                type: resource
            }
        });
    });
    return items;
}


function getErrorItem(resource, field, code, message, details) {
    return {
        resource: resource,
        field: field,
        code: code,
        message: message,
        details: details,
        date: new Date()
    };
}

function getErrorItemMeta() {
    return {
        type: RESOURCES.ERROR
    };
}

function getErrorListMeta(status) {
    return {
        type: RESOURCES.COLLECTION,
        http_status: status
    }
}

function buildValidationErrorResponse(err, httpStatus) {
    const errors = [];
    Object.keys(err.errors).forEach(function (field) {
        errors.push({
            error: getErrorItem(err.resource, field, err.errorCode.code, err.errorCode.message, err.errors[field]),
            meta: getErrorItemMeta()
        });
    });

    return {
        errors: errors,
        meta: getErrorListMeta(httpStatus)
    };
}

function buildResourceErrorResponse(err, httpStatus) {
    return {
        errors: [{
            error: getErrorItem(err.resource, err.field, err.code, err.message, err.details),
            meta: getErrorItemMeta()
        }],
        meta: getErrorListMeta(httpStatus)
    };
}

function buildSystemErrorResponse(err) {
    return {
        errors: [{
            error: getErrorItem(RESOURCES.SYSTEM, null, null, err.message, err.detail),
            meta: getErrorItemMeta()
        }],
        meta: getErrorListMeta(HTTP_CODE.SERVER_ERROR)
    };
}

function buildErrorResponseFromArray(err, httpStatus) {
    const errors = [];
    _.forEach(err, function (error) {
        errors.push({
            error: getErrorItem(error.resource, error.field, error.code, error.message, null),
            meta: getErrorItemMeta()
        })
    });

    return {
        errors: errors,
        meta: getErrorListMeta(httpStatus)
    }
}

module.exports = new ResponseSerializer();