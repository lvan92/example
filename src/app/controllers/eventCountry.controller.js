const BaseController  = require('./base_controller');
const EventCountryService = require('../services/eventCountry.service');

function EventCountryController() {
  BaseController.apply(this, arguments);
}

EventCountryController.prototype = Object.create(BaseController.prototype);

EventCountryController.prototype.constructor = EventCountryController;

EventCountryController.prototype.updateEventCountryByEvent = function (req, res, next) {
  const eventId = req.params.event_id;
  const eventCountry = req.body;

  const promise = EventCountryService.updateEventCountryByEvent(eventCountry, eventId);
  this.sendResponse(promise, req, res, next);
}

module.exports = new EventCountryController();