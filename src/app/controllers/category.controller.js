const BaseController  = require('./base_controller');
const CategoryService = require('../services/category.service');

function CategoryController() {
  BaseController.apply(this, arguments);
  this.CategoryService = new CategoryService();
}

CategoryController.prototype = Object.create(BaseController.prototype);

CategoryController.prototype.constructor = CategoryController;

CategoryController.prototype.createCategory = function (req, res, next) {
  const self = this;
  let category = req.body;

  const promise = self.CategoryService.createCategory(category);
  this.sendResponse(promise, req, res, next);
};

module.exports = new CategoryController();