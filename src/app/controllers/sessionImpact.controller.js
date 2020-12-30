const BaseController = require('./base_controller');
const SessionImpactService = require('../services/sessionImpact.service');

function SessionImpactController() {
  BaseController.apply(this, arguments);
}

SessionImpactController.prototype = Object.create(BaseController.prototype);

SessionImpactController.prototype.constructor = SessionImpactController;

SessionImpactController.prototype.updateSessionImpact = function (req, res, next) {
  let sessionImpact = req.body;
  let sessionId = req.params.session_id;

  let promise = SessionImpactService.updateSessionImpact(sessionImpact, sessionId);
  this.sendResponse(promise, req, res, next);
  
};

module.exports = new SessionImpactController();