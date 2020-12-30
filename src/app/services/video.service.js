//Repositories
const VideoRepository = require('../repositories/video.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { videoDetailDTO } = require('../dto/video');

class VideoService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    getVideoByVideoId(videoId, dbTransaction) {       
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true };

        const promise = VideoRepository.findById(videoId, option).then(function (result) {
            if (result !== null) {
                return Promise.resolve(videoDetailDTO(result));
            }
            return Promise.reject()
        });

        return promise;
    }
}

module.exports = VideoService;