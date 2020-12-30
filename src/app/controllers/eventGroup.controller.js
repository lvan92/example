const BaseController  = require('./base_controller');
const EventGroupService = require('../services/eventGroup.service');

function EventGroupController() {
  BaseController.apply(this, arguments);
  this.EventGroupService = new EventGroupService();
}

EventGroupController.prototype = Object.create(BaseController.prototype);

EventGroupController.prototype.constructor = EventGroupController;

EventGroupController.prototype.getAll = function (req, res, next) {
  const self = this;
  
  const promise = self.EventGroupService.getAll();
  this.sendResponse(promise, req, res, next);
}

module.exports = new EventGroupController();