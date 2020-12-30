const BaseController  = require('./base_controller');
const CountryService = require('../services/country.service');

function CountryController() {
  BaseController.apply(this, arguments);
  this.CountryService = new CountryService();
}

CountryController.prototype = Object.create(BaseController.prototype);

CountryController.prototype.constructor = CountryController;

CountryController.prototype.getAll = function (req, res, next) {
  const self = this;
  
  const promise = self.CountryService.getAll();
  this.sendResponse(promise, req, res, next);
}

module.exports = new CountryController();