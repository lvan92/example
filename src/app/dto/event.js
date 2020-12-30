const moment = require('moment');

// Utilities
const Utils = require('../utils/common');

const { EVENT_TYPE, FORMAT_TIME } = require('../constants/enum');

const updateEventDTO = (event, eventReq, user) => {

    return {
        tribe_id: eventReq.tribe_id !== undefined ? eventReq.tribe_id : event.tribe_id,
        opponent_tribe_id: eventReq.opponent_tribe_id !== undefined ? eventReq.opponent_tribe_id : event.opponent_tribe_id,
        event_sport_group_id: eventReq.event_sport_group_id !== undefined ? eventReq.event_sport_group_id : event.event_sport_group_id,
        event_start_time: eventReq.event_start_time !== undefined ? eventReq.event_start_time : event.event_start_time,
        event_end_time: eventReq.event_end_time !== undefined ? eventReq.event_end_time : event.event_end_time,
        event_type: eventReq.event_type !== undefined ? eventReq.event_type : event.event_type,
        event_repeat: eventReq.event_repeat !== undefined ? eventReq.event_repeat : event.event_repeat,
        event_image_url: eventReq.event_image_url !== undefined ? eventReq.event_image_url : event.event_image_url,
        ismultiday: eventReq.ismultiday !== undefined ? eventReq.ismultiday : event.ismultiday,
        isactive: eventReq.isactive !== undefined ? eventReq.isactive : event.isactive,
        updated_by: user.user_id
    }
};

const eventDetailDTO = (event, user) => {
    let eventType;
    let session = [];

    switch (event.event_type) {
        case 1:
            eventType = EVENT_TYPE.PUBLIC
            break;
        case 2:
            eventType = EVENT_TYPE.GLOBAL
            break;
    };

    event.session.map(item => {
        let session_keyword = [];
        let impacts = [];

        item.impact.map(impact => {
            const obj = {
                impact_id: impact.impact_id,
                impact_name: impact.impact_content.impact_name,
                impact_country: impact.country.country_name,
                impact_category: impact.impact_content.category.category_name,
                impact_image_url: impact.impact_image_url,
                language_id: impact.impact_content.language.language_id,
                language_name: impact.impact_content.language.language_name,
                default_impact: impact._pivot_default_impact
            };
            impacts.push(obj);
        })

        item.session_keyword.map(item => {
            const obj = {
                session_keyword_id: item.session_keyword_id,
                session_keyword_start_time: item.session_keyword_start_time,
                session_keyword_name: item.session_keyword_content.session_keyword_name,
                language_id: item.session_keyword_content.language.language_id,
                language_name: item.session_keyword_content.language.language_name
            }
            session_keyword.push(obj);
        });

        const obj = {
            session_id: item.session_id,
            session_name: item.session_content.session_name,
            sound_id: item.sound.sound_id,
            sound_url: item.sound.sound_url,
            sound_file_name: item.sound.sound_file_name,
            sponsor_id: item.sponsor !== undefined ? item.sponsor.sponsor_id : null,
            sponsor_name: item.sponsor !== undefined ? item.sponsor.sponsor_content.sponsor_name : null,
            session_duration: item.session_duration,
            session_start_time: moment.utc(item.session_start_time).local().format(FORMAT_TIME.DATE),
            session_motivation_text: item.session_content.session_motivation_text !== null ? item.session_content.session_motivation_text : null,
            session_max_donation_total: item.session_max_donation_total,
            session_max_donation_per_user: item.session_max_donation_per_user,
            session_show_logo: item.session_show_logo,
            session_ads_start: item.session_ads_start,
            session_ads_end: item.session_ads_end,
            language_id: item.session_content.language.language_id,
            language_name: item.session_content.language.language_name,
            is_simulate: item.isSimulate,
            session_keyword: session_keyword,
            impact: impacts,
        }
        session.push(obj);
    });
    return {
        event_id: event.event_id,
        event_name: event.event_content.event_name,
        event_start_time: moment.utc(event.event_start_time).local().format(FORMAT_TIME.DATE),
        event_end_time: moment.utc(event.event_end_time).local().format(FORMAT_TIME.DATE),
        event_type: eventType,
        event_image_url: event.event_image_url,
        event_state: Utils.setEventState(moment.utc(event.event_start_time).local().format(FORMAT_TIME.DATE), moment.utc(event.event_end_time).local().format(FORMAT_TIME.DATE), session),
        event_country: event.country_content.country.country_name,
        event_country_id: event.country_content.country.country_id,
        event_address: event.event_content.event_address,
        event_description: event.event_content.event_description,
        isactive: event.isactive,
        ismultiday: event.ismultiday,
        language_id: event.event_content.language.language_id,
        language_name: event.event_content.language.language_name,
        created_by: user.user_name,
        updated_by: event.updated_by,
        created_at: moment.utc(event.created_at).local().format(FORMAT_TIME.DATE),
        updated_at: moment.utc(event.updated_at).local().format(FORMAT_TIME.DATE),
        event_sport_group: event.event_sport_group_id !== null ?
            {
                event_sport_group_id: event.event_sport_group_id,
                event_sport_group_name: event.event_group_content.event_sport_group_name
            } : null,
        tribe: {
            tribe_id: event.tribe.tribe_id,
            tribe_name: event.tribe_content.tribe_name,
            tribe_image_url: event.tribe.tribe_image_url,
            tribe_privacy: event.tribe.tribe_privacy
        },
        opponent_tribe: event.opponent_tribe !== undefined ? {
            tribe_id: event.opponent_tribe.tribe_id,
            tribe_name: event.opponent_tribe_content.tribe_name,
            tribe_image_url: event.opponent_tribe.tribe_image_url,
            tribe_privacy: event.opponent_tribe.tribe_privacy
        } : null,
        session: session,
    }
};

const createEventDTO = (event, user) => {
    return {
        event_sport_group_id: event.event_sport_group_id,
        tribe_id: event.tribe_id,
        opponent_tribe_id: event.opponent_tribe_id,
        event_start_time: event.event_start_time,
        event_end_time: event.event_end_time,
        event_type: event.event_type,
        event_image_url: event.event_image_url,
        ismultiday: event.ismultiday,
        isactive: event.isactive,
        created_at: new moment.utc().format(FORMAT_TIME.DATE),
        created_by: user.user_id,
        updated_by: user.user_id,
    }
};

const eventBasicDTO = (events) => {
    let result = [];
    let eventType;

    events.map(item => {
        switch (item.event_type) {
            case 1:
                eventType = EVENT_TYPE.PUBLIC
                break;
            case 2:
                eventType = EVENT_TYPE.GLOBAL
                break;
        }

        let sessions = [];
        item.session.map(session => {
            const obj = {
                session_id: session.session_id,
                session_name: session.session_content.session_name,
                session_motivation_text: session.session_content.session_motivation_text,
                session_duration: session.session_duration,
                session_start_time: moment.utc(session.session_start_time).local().format(FORMAT_TIME.DATE)
            }
            sessions.push(obj);
        });

        const obj = {
            event_id: item.event_id,
            event_country_id: item.country_content.country_id,            
            event_name: item.event_content.event_name,
            event_start_time: moment.utc(item.event_start_time).local().format(FORMAT_TIME.DATE),
            event_end_time: moment.utc(item.event_end_time).local().format(FORMAT_TIME.DATE),
            event_type: eventType,
            event_image_url: item.event_image_url,
            event_state: Utils.setEventState(moment.utc(item.event_start_time).local().format(FORMAT_TIME.DATE), moment.utc(item.event_end_time).local().format(FORMAT_TIME.DATE), sessions),
            isactive: item.isactive,
            ismultiday: item.ismultiday,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
            event_sport_group: item.event_sport_group_id !== null ?
                {
                    event_sport_group_id: item.event_sport_group_id,
                    event_sport_group_name: item.event_group_content.event_sport_group_name
                } : null,
            tribe: {
                tribe_id: item.tribe.tribe_id,
                tribe_name: item.tribe_content.tribe_name,
                tribe_image_url: item.tribe.tribe_image_url
            },
            opponent_tribe: item.opponent_tribe !== undefined ? {
                tribe_id: item.opponent_tribe.tribe_id,
                tribe_name: item.opponent_tribe_content.tribe_name,
                tribe_image_url: item.opponent_tribe.tribe_image_url
            } : null,
            session: sessions
        }
        result.push(obj);
    });

    return result;
}

const eventBasicSocketDTO = (event, session) => {
    let eventType;
    let sessions = [];
    
    switch (event.event_type) {
        case 1:
            eventType = EVENT_TYPE.PUBLIC
            break;
        case 2:
            eventType = EVENT_TYPE.GLOBAL
            break;
    };

    session.map(item => {
        let session_keyword = [];
        var impacts = [];

        item.impact.map(impact => {
            const obj = {
                impact_id: impact.impact_id,
                impact_name: impact.impact_content.impact_name,
                impact_country: impact.country.country_name,
                impact_category: impact.impact_content.category.category_name,
                impact_image_url: impact.impact_image_url,
                language_id: impact.impact_content.language.language_id,
                language_name: impact.impact_content.language.language_name,
                default_impact: impact._pivot_default_impact
            }
            impacts.push(obj);
        });

        item.session_keyword.map(item => {
            const obj = {
                session_keyword_id: item.session_keyword_id,
                session_keyword_start_time: item.session_keyword_start_time,
                session_keyword_name: item.session_keyword_content.session_keyword_name,
                language_id: item.session_keyword_content.language.language_id,
                language_name: item.session_keyword_content.language.language_name
            }
            session_keyword.push(obj);
        });

        const obj = {
            session_id: item.session_id,
            session_name: item.session_content.session_name,
            sound_id: item.sound.sound_id,
            sound_url: item.sound.sound_url,
            sponsor_id: item.sponsor !== undefined ? item.sponsor.sponsor_id : null,
            sponsor_name: item.sponsor !== undefined ? item.sponsor.sponsor_content.sponsor_name : null,
            session_duration: item.session_duration,
            session_start_time: moment.utc(item.session_start_time).local().format(FORMAT_TIME.DATE),
            session_show_logo: item.session_show_logo,
            session_ads_start: item.session_ads_start,
            session_ads_end: item.session_ads_end,
            language_id: item.session_content.language.language_id,
            language_name: item.session_content.language.language_name,
            session_motivation_text: item.session_content.session_motivation_text,
            session_keyword: session_keyword,
            is_simulate: item.isSimulate,
            remaining_time: item.remaining_time,
            impact: impacts,
        }
        sessions.push(obj);
    })

    const obj = {
        event_id: event.event_id,
        event_name: event.event_content.event_name,
        event_start_time: moment.utc(event.event_start_time).local().format(FORMAT_TIME.DATE),
        event_end_time: moment.utc(event.event_end_time).local().format(FORMAT_TIME.DATE),
        event_type: eventType,
        isactive: event.isactive,
        event_image_url: event.event_image_url,
        created_by: event.created_by,
        updated_by: event.updated_by,
        created_at: moment.utc(event.created_at).local().format(FORMAT_TIME.DATE),
        updated_at: moment.utc(event.updated_at).local().format(FORMAT_TIME.DATE),
        ismultiday: event.ismultiday,
        session: sessions,
        tribe: {
            tribe_id: event.tribe.tribe_id,
            tribe_name: event.tribe_content.tribe_name,
            tribe_image_url: event.tribe.tribe_image_url,
            tribe_privacy: event.tribe.tribe_privacy
        },
        opponent_tribe: event.opponent_tribe !== undefined ? {
            tribe_id: event.opponent_tribe.tribe_id,
            tribe_name: event.opponent_tribe_content.tribe_name,
            tribe_image_url: event.opponent_tribe.tribe_image_url,
            tribe_privacy: event.opponent_tribe.tribe_privacy
        } : null,
    }
    return obj;
};

const eventDetailDTOSocketDTO = (event, sessionList) => {
    let eventType;
    let sessions = [];

    switch (event.event_type) {
        case 1:
            eventType = EVENT_TYPE.PUBLIC
            break;
        case 2:
            eventType = EVENT_TYPE.GLOBAL
            break;
    };
        
    sessionList.map(item => {
        let session_keyword = [];
        let impacts = [];

        item.impact.map(impact => {
            const obj = {
                impact_id: impact.impact_id,
                impact_name: impact.impact_content.impact_name,
                impact_country: impact.country.country_name,
                impact_category: impact.impact_content.category.category_name,
                impact_image_url: impact.impact_image_url,
                language_id: impact.impact_content.language.language_id,
                language_name: impact.impact_content.language.language_name,
                default_impact: impact._pivot_default_impact
            };
            impacts.push(obj);
        });

        item.session_keyword.map(item => {
            const obj = {
                session_keyword_id: item.session_keyword_id,
                session_keyword_start_time: item.session_keyword_start_time,
                session_keyword_name: item.session_keyword_content.session_keyword_name,
                language_id: item.session_keyword_content.language.language_id,
                language_name: item.session_keyword_content.language.language_name
            }
            session_keyword.push(obj);
        });
        let obj = {
            session_id: item.session_id,
            session_name: item.session_content.session_name,
            sound_id: item.sound.sound_id,
            sound_url: item.sound.sound_url,
            sponsor_id: item.sponsor !== undefined ? item.sponsor.sponsor_id : null,
            sponsor_name: item.sponsor !== undefined ? item.sponsor.sponsor_content.sponsor_name : null,
            session_duration: item.session_duration,
            session_start_time: moment.utc(item.session_start_time).local().format(FORMAT_TIME.DATE),
            session_show_logo: item.session_show_logo,
            session_ads_start: item.session_ads_start,
            session_ads_end: item.session_ads_end,
            language_id: item.session_content.language.language_id,
            language_name: item.session_content.language.language_name,
            session_motivation_text: item.session_content.session_motivation_text,
            session_keyword: session_keyword,
            is_simulate: item.isSimulate,
            remaining_time: item.remainingTime,
            impact: impacts,
        }
        sessions.push(obj);
    });

    return {
        event_id: event.event_id,
        event_name: event.event_content.event_name,
        event_description: event.event_content.event_description,
        event_start_time: moment.utc(event.event_start_time).local().format(FORMAT_TIME.DATE),
        event_end_time: moment.utc(event.event_end_time).local().format(FORMAT_TIME.DATE),
        event_type: eventType,
        event_image_url: event.event_image_url,
        isactive: event.isactive,
        ismultiday: event.ismultiday,
        created_by: event.created_by,
        updated_by: event.updated_by,
        created_at: event.created_at,
        updated_at: event.updated_at,
        tribe: {
            tribe_id: event.tribe.tribe_id,
            tribe_name: event.tribe_content.tribe_name,
            tribe_image_url: event.tribe.tribe_image_url,
            tribe_privacy: event.tribe.tribe_privacy
        },
        opponent_tribe: event.opponent_tribe !== undefined ? {
            tribe_id: event.opponent_tribe.tribe_id,
            tribe_name: event.opponent_tribe_content.tribe_name,
            tribe_image_url: event.opponent_tribe.tribe_image_url,
            tribe_privacy: event.opponent_tribe.tribe_privacy
        } : null,
        session: sessions,
    }
};

const updateAtEventDTO = (event) => {
    return {
        updated_at: new moment.utc().format(FORMAT_TIME.DATE), 
    }
}

module.exports = {
    updateEventDTO,
    eventDetailDTO,
    createEventDTO,
    eventBasicDTO,
    eventDetailDTOSocketDTO,
    eventBasicSocketDTO,
    updateAtEventDTO,
}