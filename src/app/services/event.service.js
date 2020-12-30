const { assign, filter } = require('lodash');
const moment = require('moment');
const { config } = require('../../../configs');
const ERROR_CODE = require('../constants/errorCode');

//Repositories
const EventRepository = require('../repositories/event.repository');
const EventContentRepository = require('../repositories/eventContent.repository');
const UserRepository = require('../repositories/user.repository');
const EventCountryRepository = require('../repositories/eventCountry.repository');
const EventImpactRepository = require('../repositories/eventImpact.repository');

//Services
const BaseService = require('./base.service');
const EventContentService = require('./eventContent.service');
const EventCountryService = require('./eventCountry.service');
const SessionService = require('./session.service');

// Utilities
const Utils = require('../utils/common');

//DTO
const { updateEventContentDTO, createEventContentDTO } = require('../dto/event_content');
const { updateEventDTO, eventDetailDTO, createEventDTO, eventBasicDTO, updateAtEventDTO } = require('../dto/event');
const { createEventCountryDTO } = require('../dto/event_country');

class EventService extends BaseService {
    constructor(...args) {
        super();
        BaseService.apply(this, args);
    }

    async changeEventStatus(eventId, event, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const option = { transacting: dbTransaction, require: false };
        const predicate = {
            event_id: eventId
        };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        }
        const user = await UserRepository.findByProperty(predicateUser, option)

        const promise = EventRepository.findByProperty(predicate, option)
            .then(function (foundAccount) {
                foundAccount.isactive = event.isactive;
                foundAccount.updated_by = user.user_id;
                const dataToUpdate = assign({}, foundAccount);
                return EventRepository.updateByProperty(predicate, dataToUpdate, { transacting: dbTransaction });
            });

        return promise;
    }

    async updateEvent(eventId, event, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        const predicate = {
            event_id: eventId
        };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };
        const user = await UserRepository.findByProperty(predicateUser, option);
        const eventPromise = await EventRepository.findByProperty(predicate, option);
        const eventData = assign({}, eventPromise, updateEventDTO(eventPromise, event, user));

        const promise = BaseService.setDbTransaction(async function (dbTransaction) {
            try {
                const eventUpdateData = await EventRepository.updateByProperty(predicate, eventData, { transacting: dbTransaction });

                return Promise.resolve(eventUpdateData);
            } catch (error) {
                return Promise.reject(error)
            }
        });

        return promise;
    }

    async createEvent(eventReq, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };
        const predicateUser = {
            user_name: 'ultrasyncAdministrator'
        };

        const user = await UserRepository.findByProperty(predicateUser, option);
        const eventData = createEventDTO(eventReq, user);

        const promise = BaseService.setDbTransaction(function (dbTransaction) {
            return EventRepository.insert(eventData, option)
                .then(function (event) {
                    const eventContentData = createEventContentDTO(eventReq, event.event_id);
                    return EventContentRepository.insert(eventContentData, option)
                        .then(function (eventContent) {
                            const eventCountryData = createEventCountryDTO(eventReq, eventContent.event_id);
                            return EventCountryRepository.insert(eventCountryData, option)
                                .then(function (eventCountry) {
                                    return Promise.resolve({ ...event, ...eventContent, ...eventCountry })
                                }).catch(function (err) {
                                    if (err) {
                                        return Promise.reject(err);
                                    }
                                    return Promise.resolve();
                                })
                        })
                });
        });

        return promise;
    }

    async getAllEvent(condition, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['event_content', 'tribe', 'tribe_content', 'opponent_tribe', 'opponent_tribe_content', 'event_group_content', 'session', 'session.session_content', 'country_content'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };
        const currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
        const currentDateForWeb = new moment.utc().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        let promise = null;
        let errs = [];
        if (condition === 'app-future') {
            let result = await EventRepository.findAllByPropertyWithOperator('event_end_time', '>=' , currentDate, option);
            promise = Utils.sortEventBySessionStartTime(result, false);
            promise = filter(promise, { isactive: true });

        } else if (condition === 'future') {
            let result = await EventRepository.findAllByPropertyWithOperator('event_end_time', '>', currentDate, option);
            promise = Utils.sortEventBySessionStartTimeforWeb(result, true); 
            promise = filter(promise, { isactive: true });

        } else if (condition === 'past') {
            promise = await EventRepository.findAllByPropertyWithOperator('event_end_time', '<', currentDate, option);
            
        } else {
            errs.push(ERROR_CODE.EVENT.EVENT_CONDITION_WRONG);
            return Promise.reject(errs);
        }

        return { items: eventBasicDTO(promise) }
    }

    getAllEventUpComing(dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['event_content', 'tribe', 'tribe_content', 'opponent_tribe', 'opponent_tribe_content', 'event_group_content', 'session', 'session.session_content', 'country_content'];
        const option = { transacting: dbTransaction, require: false, withRelated: relations };
        const promise = EventRepository.findAll(option).then(function (result) {
            const upComingList = Utils.getUpComingEvent(result);
            upComingList.sort(function (item1, item2) {
                if (item1.event_start_time < item2.event_start_time) {
                    return -1;
                };
                if (item1.event_start_time > item2.event_start_time) {
                    return 1;
                }
                return 0
            });

            return Promise.resolve({ items: eventBasicDTO(upComingList) });
        });

        return promise;
    }

    getEventDetail(eventId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        const relations = ['event_content', 'event_content.language', 'tribe', 'tribe_content', 'opponent_tribe', 'opponent_tribe_content', 'event_group_content', 'session',
            'session.sponsor', 'session.sponsor.sponsor_content', 'session.session_content', 'session.session_content.language', 'session.session_keyword',
            'session.session_keyword.session_keyword_content', 'session.session_keyword.session_keyword_content.language', 'session.sound', 'session.impact', 'session.impact.impact_content',
            'session.impact.impact_content.language', 'session.impact.impact_content.language', 'session.impact.impact_content.category', 'session.impact.country', 'country_content', 'country_content.country'];
        const option = { transacting: dbTransaction, require: true, withRelated: relations };
        const promise = EventRepository.findById(eventId, option).then(function (result) {
            if (result !== null) {
                let option = { transacting: dbTransaction, require: true }
                const predicateUser = {
                    user_id: result.created_by,
                };

                return UserRepository.findByProperty(predicateUser, option).then(function (user) {
                    return Promise.resolve(eventDetailDTO(result, user));
                }).catch(function (err) {
                    if (err) {
                        return Promise.reject(err);
                    };
                    return Promise.resolve();
                });
            }
        });

        return promise;
    }

    async updateAtEventDetail(eventId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: false };

        let predicate = {
            event_id: eventId
        };
        let eventPromise = await EventRepository.findByProperty(predicate, option);
        const eventData = assign({}, eventPromise, updateAtEventDTO(eventPromise));
        const promise = BaseService.setDbTransaction(async function (dbTransaction) {
            try {
                const eventUpdateData = await EventRepository.updateByProperty(predicate, eventData, { transacting: dbTransaction });

                return Promise.resolve(eventUpdateData);
            } catch (error) {
                return Promise.reject(error)
            }
        });

        return promise;
    }

    async deleteEvent(eventId, dbTransaction) {
        dbTransaction = Utils.getValueOrDefault(dbTransaction, null);
        let option = { transacting: dbTransaction, require: true, casadeDelete: true };

        let predicate = {
            event_id: eventId
        };

        let eventdata = await EventRepository.findByProperty(predicate, option);
        let eventStartTime = moment.utc(eventdata.event_start_time).local().format('YYYY-MM-DD HH:mm:ss');
        let currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
        let checkTime = moment(eventStartTime).diff(currentDate, 'minutes');
        if (checkTime > 0) {
            let eventDeleteResult = await EventRepository.destroy(eventId, option);
            return Promise.resolve(eventDeleteResult);
        } else {
            return Promise.reject(ERROR_CODE.EVENT.EVENT_DELETE_WRONG);
        };
    };
}

module.exports = EventService;