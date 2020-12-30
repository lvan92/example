const BaseController = require('./base_controller');
const EventService = require('../services/event.service');
const { validationResult } = require('express-validator');

function EventController() {
  BaseController.apply(this, arguments);
  this.EventService = new EventService();
}

EventController.prototype = Object.create(BaseController.prototype);

EventController.prototype.constructor = EventController;

EventController.prototype.changeEventStatus = function (req, res, next) {
  const self = this;
  const eventId = parseInt(req.params.event_id);
  const event = req.body;
    
  const promise = self.EventService.changeEventStatus(eventId, event);
  this.sendResponse(promise, req, res, next);
};

EventController.prototype.updateEvent = function (req, res, next) {
  const self = this;
  const eventId = parseInt(req.params.event_id);
  const event = req.body;

  const promise = self.EventService.updateEvent(eventId, event);
  this.sendResponse(promise, req, res, next);
};

EventController.prototype.createEvent = function (req, res, next) {
  const self = this;
  let event = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const promise = self.EventService.createEvent(event);
    this.sendResponse(promise, req, res, next);
  }

};

EventController.prototype.getAllEvent = function (req, res, next) {
  const self = this;

  const condition = String(req.params.condition);
  const promise = self.EventService.getAllEvent(condition);
  this.sendResponse(promise, req, res, next);
}

EventController.prototype.getAllEventUpComing = function (req, res, next) {
  const self = this;

  const promise = self.EventService.getAllEventUpComing();
  this.sendResponse(promise, req, res, next);
}

EventController.prototype.getEventDetail = function (req, res, next) {
  const self = this;
  const eventId = parseInt(req.params.event_id);

  const promise = self.EventService.getEventDetail(eventId);
  this.sendResponse(promise, req, res, next);
}

EventController.prototype.updateAtEventDetail = function (req, res, next) {
  const self = this;
  const eventId = req.params.event_id;

  const promise = self.EventService.updateAtEventDetail(eventId);
  this.sendResponse(promise, req, res, next);
};

EventController.prototype.deleteEvent = function (req, res, next) {
  const self = this;
  const eventId = req.params.event_id;

  const promise = self.EventService.deleteEvent(eventId);
  this.sendResponse(promise, req, res, next);
};

module.exports = new EventController();