const BaseController = require('./base_controller');
const TribeService = require('../services/tribe.service');
const { validationResult } = require('express-validator');

function TribeController() {
    BaseController.apply(this, arguments);
    this.TribeService = new TribeService();
}

TribeController.prototype = Object.create(BaseController.prototype);

TribeController.prototype.constructor = TribeController;

TribeController.prototype.getAll = function (req, res, next) {
    const self = this;
  
    const promise = self.TribeService.getAll();
    this.sendResponse(promise, req, res, next);
  }

module.exports = new TribeController();