const { EVENT_SPORT_GROUP_TYPE } = require('../constants/enum');

const eventGroupBasicDTO = (eventGroups) => {
    let result = [];
    let eventSportGroupType;
    eventGroups.map(item => {
        switch (item.event_sport_group_type) {
            case 1:
                eventSportGroupType = EVENT_SPORT_GROUP_TYPE.PUBLIC
                break;
            case 2:
                eventSportGroupType = EVENT_SPORT_GROUP_TYPE.GLOBAL
                break;
        };
        const obj = {            
            event_sport_group_id: item.event_sport_group_id,
            event_sport_group_name: item.event_group_content.event_sport_group_name,
            no_of_events: item.event.length,
            event_sport_group_description: item.event_group_content.event_sport_group_description,
            event_sport_group_category: item.event_sport_category,
            event_sport_group_image_url: item.event_sport_group_image_url,
            event_sport_group_start_time: item.event_sport_start_time,
            event_sport_group_end_time: item.event_sport_end_time,
            event_sport_group_type: eventSportGroupType,
            language_id: item.event_group_content.language_id,
            language_name: item.event_group_content.country.language_name,
            isactive: item.isactive,
            ismultiday: item.ismultiday,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
        };
        result.push(obj);
    });

    return result;
}

module.exports = {
    eventGroupBasicDTO
}