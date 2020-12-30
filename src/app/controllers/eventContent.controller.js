const BaseController  = require('./base_controller');
const EventContentService = require('../services/eventContent.service');

function EventContentController() {
  BaseController.apply(this, arguments);
}

EventContentController.prototype = Object.create(BaseController.prototype);

EventContentController.prototype.constructor = EventContentController;

EventContentController.prototype.updateEventContentByEvent = function (req, res, next) {
  const eventId = req.params.event_id;
  const eventContent = req.body;

  const promise = EventContentService.updateEventContentByEvent(eventContent, eventId);
  this.sendResponse(promise, req, res, next);
}

module.exports = new EventContentController();