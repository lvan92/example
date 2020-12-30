const moment = require('moment');
const {  FORMAT_TIME } = require('../constants/enum');

const createSessionDTO = (session, user) => {
    const result = {
        sound_id: session.sound_id,
        sponsor_id: session.sponsor_id,
        event_id: session.event_id,
        session_start_time: session.session_start_time,
        session_duration: session.session_duration,
        session_max_donation_total: session.session_max_donation_total,
        session_max_donation_per_user: session.session_max_donation_per_user,
        session_show_logo: session.session_show_logo,
        session_ads_start: session.session_ads_start,
        session_ads_end: session.session_ads_end,
        isSimulate: session.is_simulate,
        created_by: user.user_id,
        updated_by: user.user_id,
        created_at: new moment.utc().format('YYYY-MM-DD HH:mm:ss')
    }
    return result;
};

const updateSessionDTO = (session, sessionReq, user) => {
    let sessionData = {
        session_id: sessionReq.session_id !== undefined ? sessionReq.session_id : session.session_id,
        sound_id: sessionReq.sound_id !== undefined ? sessionReq.sound_id : session.sound_id,
        sponsor_id: sessionReq.sponsor_id !== undefined ? sessionReq.sponsor_id : session.sponsor_id,
        event_id: sessionReq.event_id !== undefined ? sessionReq.event_id : session.event_id,
        session_start_time: sessionReq.session_start_time !== undefined ? sessionReq.session_start_time : session.session_start_time,
        session_duration: sessionReq.session_duration !== undefined ? sessionReq.session_duration : session.session_duration,
        session_max_donation_total: sessionReq.session_max_donation_total !== undefined ? sessionReq.session_max_donation_total : session.session_max_donation_total,
        session_max_donation_per_user: sessionReq.session_max_donation_per_user !== undefined ? sessionReq.session_max_donation_per_user : session.session_max_donation_per_user,
        session_show_logo: sessionReq.session_show_logo !== undefined ? sessionReq.session_show_logo : session.session_show_logo,
        session_ads_start: sessionReq.session_ads_start !== undefined ? sessionReq.session_ads_start : session.session_ads_start,
        session_ads_end: sessionReq.session_ads_end !== undefined ? sessionReq.session_ads_end : session.session_ads_end,
        isSimulate: sessionReq.is_simulate !== undefined ? sessionReq.is_simulate : session.is_simulate,
        updated_by: user.user_id,
        updated_at: new moment.utc().format('YYYY-MM-DD HH:mm:ss')
    };
    return sessionData;
};

const sessionDetailDTO = (session, user) => {
    let sessionData = {
        session_id: session.session_id !== undefined ? session.session_id : null,
        sound_id: session.sound_id !== undefined ? session.sound_id : null,
        event_id: session.event_id !== undefined ? session.event_id : null,
        sponcor_id: session.sponcor_id !== undefined ? session.sponcor_id : null,
        session_start_time: moment.utc(session.session_start_time).local().format(FORMAT_TIME.DATE),
        session_duration: session.session_duration !== undefined ? session.session_duration : null,
        session_max_donation_total: session.session_max_donation_total !== undefined ? session.session_max_donation_total : null,
        session_max_donation_per_user: session.session_max_donation_per_user !== undefined ? session.session_max_donation_per_user : null,
        session_show_logo: session.session_show_logo !== undefined ? session.session_show_logo : null,
        session_ads_start: session.session_ads_start !== undefined ? session.session_ads_start : null,
        session_ads_end: session.session_ads_end !== undefined ? session.session_ads_end : null,
        is_simulate: session.isSimulate !== undefined ? session.isSimulate : null,
        created_by: user.user_name,
        updated_by: session.updated_by,
        created_at: moment.utc(session.created_at).local().format(FORMAT_TIME.DATE),
        updated_at: session.updated_at !== null ? moment.utc(session.updated_at).local().format(FORMAT_TIME.DATE): null,
    };
    return sessionData;
}

module.exports = {
    createSessionDTO,
    updateSessionDTO,
    sessionDetailDTO,
}
