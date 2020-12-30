const BaseController = require('./base_controller');
const SoundService = require('../services/sound.service');

function SoundController() {
    BaseController.apply(this, arguments);
    this.SoundService = new SoundService();
}

SoundController.prototype = Object.create(BaseController.prototype);

SoundController.prototype.constructor = SoundController;

SoundController.prototype.createSound = function (req, res, next) {
    const self = this;
    let Sound = req.body;

    const promise = self.SoundService.createSound(Sound);
    this.sendResponse(promise, req, res, next);

}

SoundController.prototype.getAll = function (req, res, next) {
    const self = this;
  
    const promise = self.SoundService.getAll();
    this.sendResponse(promise, req, res, next);
  }

SoundController.prototype.deleteSound = function (req, res, next) {
    const self = this;
    const soundId = req.params.sound_id;
    const promise = self.SoundService.deleteSound(soundId);
    this.sendResponse(promise, req, res, next);
  }

module.exports = new SoundController();