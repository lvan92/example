const BaseController = require('./base_controller');
const EventImpactService = require('../services/eventImpact.service');

function EventImpactController() {
  BaseController.apply(this, arguments);
}

EventImpactController.prototype = Object.create(BaseController.prototype);

EventImpactController.prototype.constructor = EventImpactController;

EventImpactController.prototype.updateEventImpact = function (req, res, next) {
  let eventImpact = req.body;
  let eventId = req.params.event_id;

  let promise = EventImpactService.updateEventImpact(eventImpact, eventId);
  this.sendResponse(promise, req, res, next);
  
};

module.exports = new EventImpactController();