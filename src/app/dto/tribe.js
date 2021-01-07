const { TRIBE_PRIVACY, FORMAT_TIME } = require('../constants/enum');
const moment = require('moment');
const { genAccessCode } = require('../../common/utils/function/genAccessCode');

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
            tribe_privacy: tribePrivacy,
            tribe_image_url: item.tribe_image_url, 
            isactive: item.isactive,
            language_id: item.tribe_content.language.language_id,
            language_name: item.tribe_content.language.language_name,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
            category_id: item.category.category_id,
            category_name: item.category.category_name,
            country_id: item.country_id
        }
        result.push(obj);
    });

    return result;
}

const tribeDetailDTO = (item) => {
    let tribeData = {
        tribe_id: item.tribe_id !== undefined ? item.tribe_id : null,
        tribe_access_code: item.tribe_access_code !== undefined ? item.tribe_access_code : null,
        tribe_privacy: item.tribe_privacy !== undefined ? item.tribe_privacy : null,
        tribe_image_url: item.tribe_image_url !== undefined ? item.tribe_image_url : null,
        created_by: item.created_by !== undefined ? item.created_by : null,
        updated_by: item.updated_by !== undefined ? item.updated_by : null,
        created_at: moment.utc(item.created_at).local().format(FORMAT_TIME.DATE),
        updated_at: item.updated_at !== null ? moment.utc(item.updated_at).local().format(FORMAT_TIME.DATE): null,
        isactive: item.isactive !== undefined ? item.isactive : null,
        category_id: item.category_id !== undefined ? item.category_id : null,
        country_id: item.country_id !== undefined ? item.country_id : null
    }
    return tribeData
}

const tribeCreateDTO = (item, user) => {
    let tribeData = { 
        tribe_id: item.tribe_id,
        tribe_access_code: genAccessCode(),
        tribe_privacy: 1,
        tribe_image_url: "https://ultrasyncstorageaccount1.blob.core.windows.net/images/tribe/tribe_barca.png",
        created_by: user.user_id,
        updated_by: user.user_id,
        created_at: moment.utc().format(FORMAT_TIME.DATE),
        isactive: item.isactive,
        category_id: item.category_id,
        country_id: item.country_id
    }
    return tribeData
}


const updateTribeDTO = (item, itemReq, user) => {
    let tribeData = {
        tribe_id: itemReq.tribe_id !== undefined ? itemReq.tribe_id : item.tribe_id,
        tribe_access_code: itemReq.tribe_access_code !== undefined ? itemReq.tribe_access_code : item.tribe_access_code,
        tribe_privacy: itemReq.tribe_privacy !== undefined ? itemReq.tribe_privacy : item.tribe_privacy,
        tribe_image_url: itemReq.tribe_image_url !== undefined ? itemReq.tribe_image_url : item.tribe_image_url,
        isactive: itemReq.isactive !== undefined ? itemReq.isactive : item.isactive,
        category_id: itemReq.category_id !== undefined ? itemReq.category_id : null,
        country_id: itemReq.country_id !== undefined ? itemReq.country_id : null,
        updated_by: user.user_id,
        updated_at: new moment.utc().format('YYYY-MM-DD HH:mm:ss')
    }
    return tribeData
}


module.exports = {
    tribeBasicDTO,
    tribeDetailDTO,
    tribeCreateDTO,
    updateTribeDTO
}
