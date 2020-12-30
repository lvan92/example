const EventRepository = require('../repositories/event.repository');
const SessionRepository = require('../repositories/session.repository');
const Utils = require('../utils/common');
const moment = require('moment');
const { SOCKET_MESSAGE } = require('../constants/enum');
const { eventBasicSocketDTO, eventDetailDTOSocketDTO } = require('../dto/event');


module.exports = function Server(io, server) {
    let socketio = io.listen(server);
    let eventFinal = [];
    let sessionFinal = [];

    socketio.on('connection', function (socket) {
        console.log('user connected: ', socket.id);
        socket.on(SOCKET_MESSAGE.LISTEN_DATA_FROM_CLIENT, async function (data) {

            let dataParsed = JSON.parse(data);
            socket.join(dataParsed.deviceId);
            const currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');

            if (dataParsed.message === SOCKET_MESSAGE.GET_ALL_EVENT_UPCOMING) {
                let dbTransaction = null
                let relations = ['session', 'event_content', 'session.sponsor', 'session.sponsor.sponsor_content', 
                'session.session_content', 'session.session_content.language', 'session.sound',
                'tribe', 'tribe_content', 'opponent_tribe', 'session.impact', 'session.impact.impact_content',
                'session.impact.impact_content.language', 'session.impact.impact_content.language', 'session.impact.impact_content.category', 'session.impact.country', 
                'opponent_tribe_content', 'session.session_keyword','session.session_keyword.session_keyword_content', 
                'session.session_keyword.session_keyword_content.language'];
                let option = { transacting: dbTransaction, require: false, withRelated: relations };
                let result = await EventRepository.findAll(option);
                let upCommingEventList = Utils.getUpComingEvent(result);

                let upCommingEventListFilterd = Utils.sortEventBySessionStartTime(upCommingEventList, true);

                if (upCommingEventListFilterd !== undefined) {
                    for (let eventData of upCommingEventListFilterd) {
                        let sessionFinal = [];
                        for (let sessionData of eventData.session) {

                            let sessionStartTime = moment.utc(sessionData.session_start_time).local().format('YYYY-MM-DD HH:mm:ss');
                            let remaining_time = moment(sessionStartTime).diff(currentDate, 'seconds');


                            sessionFinal.push({ ...sessionData, remaining_time })
                        }
                        eventFinal.push(eventBasicSocketDTO(eventData, sessionFinal));
                    }

                    socketio.to(dataParsed.deviceId).emit(SOCKET_MESSAGE.SEND_LIST_EVENT_UPCOMING_DATA_TO_CLIENT, eventFinal);
                    eventFinal = [];
                }
            }

            if (dataParsed.message === SOCKET_MESSAGE.GET_EVENT_DETAIL) {
                const predicate = {
                    event_id: dataParsed.eventId,
                };

                const dbTransaction = null;
                const relations = ['event_content', 'event_content.language', 'tribe', 'tribe_content', 'opponent_tribe', 'opponent_tribe_content', 'session',
                    'session.sponsor', 'session.sponsor.sponsor_content', 'session.session_content', 'session.session_content.language', 'session.sound', 'session.impact', 'session.impact.impact_content',
                    'session.impact.impact_content.language', 'session.impact.impact_content.language', 'session.impact.impact_content.category', 'session.impact.country', 'session.session_keyword',
                    'session.session_keyword.session_keyword_content', 'session.session_keyword.session_keyword_content.language'];
                const option = { transacting: dbTransaction, require: false, withRelated: relations };
                const result = await EventRepository.findByProperty(predicate, option);
                if (result !== undefined) {
                    for (let sessionData of result.session) {

                        let sessionStartTime = moment.utc(sessionData.session_start_time).local().format('YYYY-MM-DD HH:mm:ss');
                        let remainingTime = moment(sessionStartTime).diff(currentDate, 'seconds');

                        sessionFinal.push({ ...sessionData, remainingTime })
                    }
                    socketio.to(dataParsed.deviceId).emit(SOCKET_MESSAGE.SEND_EVENT_DETAIL_DATA_TO_CLIENT, eventDetailDTOSocketDTO(result, sessionFinal));
                    sessionFinal = [];
                }
            }

            if (dataParsed.message === SOCKET_MESSAGE.CHECK_TIME_STREAMING) {

                let dbTransaction = null;
                let option = { transacting: dbTransaction, require: false };

                let result = await SessionRepository.findById(dataParsed.sessionId, option);
                let currentTime = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
                let sessionStartTime = moment.utc(result.session_start_time).local().format('YYYY-MM-DD HH:mm:ss')
                let timePassed = moment(currentTime).diff(sessionStartTime, 'seconds');
                socket.emit(SOCKET_MESSAGE.SEND_REMAINING_TIME_STREAMING, timePassed);
            };
        });
    });

    return this;
};