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

TribeController.prototype.createTribe = function (req, res, next) {
  const self = this;
  let tribe = req.body;
  
  const promise = self.TribeService.createTribe(tribe);
  this.sendResponse(promise, req, res, next);
};

TribeController.prototype.deleteTribe = function (req, res, next) {
  const self = this;
  let tribe_id = req.params.tribe_id;
  
  const promise = self.TribeService.deleteTribe(tribe_id);
  this.sendResponse(promise, req, res, next);
}

TribeController.prototype.findById = function (req, res, next) {
  const self = this;
  let tribe_id = req.params.tribe_id;
  // console.log(tribe_id)
  const promise = self.TribeService.findById(tribe_id);
  this.sendResponse(promise, req, res, next);
}


module.exports = new TribeController();