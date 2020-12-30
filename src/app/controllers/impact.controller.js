const BaseController = require('./base_controller');
const ImpactService = require('../services/impact.service');
const { validationResult } = require('express-validator');

function ImpactController() {
  BaseController.apply(this, arguments);
  this.ImpactService = new ImpactService();
}

ImpactController.prototype = Object.create(BaseController.prototype);

ImpactController.prototype.constructor = ImpactController;

ImpactController.prototype.getAll = function (req, res, next) {
  const self = this;

  const promise = self.ImpactService.getAll();
  this.sendResponse(promise, req, res, next);
}

ImpactController.prototype.createImpact = function (req, res, next) {
  const self = this;
  let impact = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const promise = self.ImpactService.createImpact(impact);
    this.sendResponse(promise, req, res, next);
  }
}

ImpactController.prototype.updateImpact = function (req, res, next) {
  const self = this;
  const impactId = parseInt(req.params.impact_id);
  const impact = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const promise = self.ImpactService.updateImpact(impactId, impact);
    this.sendResponse(promise, req, res, next);
  }
};

module.exports = new ImpactController();