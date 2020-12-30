const _ = require('lodash');
const { config } = require('../../../configs');
const requestPromise = require('request-promise');
const mediaServiceServer = require('../constants/MediaService');
const http = require('../constants/http');

//Repositories
const SoundRepository = require('../repositories/sound.repository');
const UserRepository = require('../repositories/user.repository');
const SessionRepository = require('../repositories/session.repository');

//Services
const BaseService = require('./base.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { createSoundDTO, soundBasicDTO } = require('../dto/sound');


class ImpactService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async createSound(soundReq, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };

        const user = await UserRepository.findByProperty(predicateUser, option);

        const promise = BaseService.setDbTransaction(function (dbTransaction) {
            const soundData = createSoundDTO(soundReq, user);
            return SoundRepository.batchInsert(`${config.database.migrations.schemaName}.sounds`, soundData, option)
                .then(function (sound) {
                    return Promise.resolve({ items: sound })
                }).catch(function (err) {
                    if (err) {
                        return Promise.reject(err);
                    }
                    return Promise.resolve();
                });
        });

        return promise;
    }

    getAll(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const predicate = {
            isactive: true
        };
        const option = { transacting: dbTransaction, require: false };
        const promise = SoundRepository.findAllByProperty(predicate, option).then(function (result) { 
            const sortedList = _.orderBy(result, [sound => sound.sound_file_name.toLowerCase()], ['asc']);
            return Promise.resolve({ items: soundBasicDTO(sortedList) });
        });

        return promise;
    }

    async deleteSound(soundId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const option = { transacting: dbTransaction, require: false };
        const sound = await SoundRepository.findById(soundId, option);
        if (sound !== null) {
            const soundMediaService = {
                method: 'POST',
                uri: `${mediaServiceServer}/api/sound/delete`,
                body: {
                    sound_url: sound.sound_url
                },
                json: true
            };

            const predicate = {
                sound_id: sound.sound_id
            };
            const session = await SessionRepository.findByProperty(predicate, option);
            const promise = BaseService.setDbTransaction(function (dbTransaction) {
                if (session === null) {
                    return SoundRepository.destroy(soundId, option).then(function (result) {
                        requestPromise(soundMediaService).then(() => {
                            return Promise.resolve(result);
                        }).catch(error => {
                            return Promise.reject(error)
                        });
                    })
                } else {
                    throw new Error(http.SOUND_MESSAGE.SOUND_IS_USED);
                }
            })

            return promise;
        } else {
            throw new Error(http.SOUND_MESSAGE.SOUND_ID_NOT_FOUND);
        }
    }
}

module.exports = ImpactService;
