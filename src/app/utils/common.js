const _ = require('lodash');
const moment = require('moment');
const { EVENT_STATE, TIME } = require('../constants/enum');

module.exports.getValueOrDefault = function (input, defaultValue) {
    return typeof input !== 'undefined' ? input : defaultValue;
}

module.exports.getUpComingEvent = function (result) {
    const currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let filteredArray = [];
    result.map(event => {
        let sessionStartTime = [];
        let latestSession = null;
        let newestSession = null;
        _.forEach(event.session, function (item) {
            sessionStartTime.push(moment(item.session_start_time));
        })

        if (sessionStartTime.length > 0) {
            const maxSession = moment.max(sessionStartTime);
            const minSession = moment.min(sessionStartTime);
            latestSession = moment.utc(maxSession).local().format('YYYY-MM-DD HH:mm:ss');
            newestSession = moment.utc(minSession).local().format('YYYY-MM-DD HH:mm:ss');
        }
        const latestDiffSeconds = moment(currentDate).diff(latestSession, 'seconds');
        const newestDiffSeconds = moment(newestSession).diff(currentDate, 'seconds');

        if (newestDiffSeconds <= TIME.SEVEN_DAYS && newestDiffSeconds > 0) {
            filteredArray.push(event);
        } else if (newestDiffSeconds < 0 && latestDiffSeconds <= TIME.THIRTY_MINUTES && currentDate < moment.utc(event.event_end_time).local().format('YYYY-MM-DD HH:mm:ss')) {
            filteredArray.push(event);
        }
    });

    return filteredArray
}

module.exports.setEventState = function (eventStartTime, eventEndTime, sessions) {

    const currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
    const diffSecondStartTime = moment(eventStartTime).diff(currentDate, 'seconds');
    const diffSecondEndTime = moment(eventEndTime).diff(currentDate, 'seconds');

    if (diffSecondStartTime > TIME.SEVEN_DAYS) {
        return EVENT_STATE.FUTURE;
    }
    if (diffSecondStartTime <= TIME.SEVEN_DAYS && diffSecondStartTime > 0) {
        return EVENT_STATE.UP_COMING;
    }  
    if (diffSecondStartTime <= 0 && diffSecondEndTime >= 0) {
        for (let sessionData of sessions) {
            let sessionEndTime = moment(sessionData.session_start_time).add(sessionData.session_duration, 'seconds').format('YYYY-MM-DD HH:mm:ss');
            let checksessionEndTime = moment(sessionEndTime).isAfter(currentDate);
            let checksessionStartTime = moment(sessionData.session_start_time).isSameOrBefore(currentDate);

            if (checksessionStartTime && checksessionEndTime) {
                return EVENT_STATE.IN_SESSION;
            };
        };
        return EVENT_STATE.IN_PROCESS;
    };

    let sessionEndTimeWithSixMonths = moment(eventEndTime).add(6, 'months');
    let checksessionEndTime = sessionEndTimeWithSixMonths.isBefore(currentDate);

    if (checksessionEndTime) {
        return EVENT_STATE.ARCHIVED;
    } else {
        if (moment(eventEndTime).add(30, 'minutes').isAfter(currentDate)) {
    
            return EVENT_STATE.JUST_END; 
        }else {    
            return  EVENT_STATE.PAST;
        } 
    }
}

module.exports.sortEventBySessionStartTime = function (event, checkEventLastEnds) {
    let sessionStartTimeData = [];
    let resultfilterd = [];
    let currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let sessionJustEnds = [];
    for (let i = 0; i < event.length; i++) {
            for (let sessionData of event[i].session) {
                // set hard code duration and time ads video 
                if (moment(sessionData.session_start_time).add(113, 'seconds').isSameOrBefore(currentDate)) {
                    sessionJustEnds.push(event[i]);
                } else {
                    sessionStartTimeData.push({ sessionStartTime: sessionData.session_start_time, eventIndex: i });
                }
            }        
    }

    sessionStartTimeData.sort(function (item1, item2) {
        return item1.sessionStartTime - item2.sessionStartTime;
    });

    let uniqueSessionData = _.uniqBy(sessionStartTimeData, 'eventIndex');
    for (let item of uniqueSessionData){
        resultfilterd.push(event[item.eventIndex]);
    }
    let result= [];
    if (checkEventLastEnds) {
        result = _.uniqBy([...resultfilterd, ...sessionJustEnds], 'event_id');
    } else {
        result = resultfilterd;
    }
    
    return result;
}

module.exports.sortEventBySessionStartTimeforWeb = function (event, checkEventLastEnds) {
    let sessionStartTimeData = [];
    let eventfilterd = [];
    let currentDate = new moment.utc().format('YYYY-MM-DD HH:mm:ss');
    let sessionJustEnds = [];
    for (let i = 0; i < event.length; i++) {
            for (let sessionData of event[i].session) {
                // set hard code duration and time ads video 
                if (moment(sessionData.session_start_time).isAfter(currentDate)) {
                    sessionStartTimeData.push({ sessionStartTime: sessionData.session_start_time, eventIndex: i });
                } else {
                    sessionJustEnds.push(event[i]);
                }
            }        
    }

    sessionStartTimeData.sort(function (item1, item2) {
        return item1.sessionStartTime - item2.sessionStartTime;
    });

    let uniqueSessionData = _.uniqBy(sessionStartTimeData, 'eventIndex');
    for (let item of uniqueSessionData){
        eventfilterd.push(event[item.eventIndex]);
    }
    let result= [];
    if (checkEventLastEnds) {
        result = _.uniqBy([...eventfilterd, ...sessionJustEnds], 'event_id');
    } else {
        result = eventfilterd;
    }
    
    return result;
}