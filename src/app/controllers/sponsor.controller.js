const BaseController = require('./base_controller');
const SponsorService = require('../services/sponsor.service');

function SponsorController() {
    BaseController.apply(this, arguments);
    this.SponsorService = new SponsorService();
}

SponsorController.prototype = Object.create(BaseController.prototype);

SponsorController.prototype.constructor = SponsorController;

SponsorController.prototype.getAll = function (req, res, next) {
    const self = this;
  
    const promise = self.SponsorService.getAll();
    this.sendResponse(promise, req, res, next);
  }

module.exports = new SponsorController();