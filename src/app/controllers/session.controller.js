const BaseController = require('./base_controller');
const SessionService = require('../services/session.service');
const { validationResult } = require('express-validator');

function SessionController() {
  BaseController.apply(this, arguments);
  this.SessionService = new SessionService();
}

SessionController.prototype = Object.create(BaseController.prototype);

SessionController.prototype.constructor = SessionController;

SessionController.prototype.createSession = function (req, res, next) {
  const self = this;
  let session = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const promise = SessionService.createSession(session);
    this.sendResponse(promise, req, res, next);
  }
};

SessionController.prototype.updateSession = function (req, res, next) {

  let session = req.body;
  const promise = SessionService.updateSession(session);
  this.sendResponse(promise, req, res, next);  
};

SessionController.prototype.deleteSession = function (req, res, next) {

  let session = req.body;
  const promise = SessionService.deleteSession(session);
  this.sendResponse(promise, req, res, next);  
};

SessionController.prototype.getSessionbySessionId = function (req, res, next) {
  
  const sessionId = parseInt(req.params.session_id);
  const promise = SessionService.getSessionSessionId(sessionId);
  this.sendResponse(promise, req, res, next); 
};

module.exports = new SessionController();