const { TRIBE_PRIVACY, FORMAT_TIME } = require('../constants/enum');
const moment = require('moment');

const tribeBasicDTO = (tribes) => {
    let result = [];
    let tribePrivacy;
    tribes.map(item => {
        switch (item.tribe_privacy) {
            case 1:
                tribePrivacy = TRIBE_PRIVACY.PUBLIC;
                break;
            case 2:
                tribePrivacy = TRIBE_PRIVACY.PRIVATE;
                break;
        }
        const obj = {
            tribe_id: item.tribe_id,
            tribe_name: item.tribe_content.tribe_name,
            tribe_description: item.tribe_content.tribe_description,
            tribe_access_code: item.tribe_access_code,
            no_of_events: item.event_as_home.length + item.event_as_guess.length,
            no_of_members: item.user.length,
            tribe_privacy: item.tribe_privacy,
            tribe_image_url: item.tribe_image_url,
            isactive: item.isactive,
            language_id: item.tribe_content.language.language_id,
            language_name: item.tribe_content.language.language_name,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
        }
        result.push(obj);
    });

    return result;
}

module.exports = {
    tribeBasicDTO
}
