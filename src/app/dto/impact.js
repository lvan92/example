const moment = require('moment');

const { IMPACT_TYPE } = require('../constants/enum');

const impactBasicDTO = (impacts) => {
    let result = [];
    let impactType;
    impacts.map(item => {
        switch (item.impact_type) {
            case 1:
                impactType = IMPACT_TYPE.PUBLIC;
                break;
            case 2:
                impactType = IMPACT_TYPE.PRIVATE;
                break;
        };
        const obj = {            
            impact_id: item.impact_id,
            impact_name: item.impact_content.impact_name,
            impact_type: item.impact_type,
            impact_total_donation: item.impact_total_donation,
            impact_image_url: item.impact_image_url,
            category_id: item.impact_content.category.category_id,
            category_name: item.impact_content.category.category_name,
            country_id: item.country.country_id,
            country_name: item.country.country_name,
            language_id: item.impact_content.language.language_id,
            language_name: item.impact_content.language.language_name,
            isactive: item.isactive,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: item.created_at,
            updated_at: item.updated_at,
        };
        result.push(obj);
    });

    return result;
};

const createImpactDTO = (impactReq, user) => {
    return {
        impact_type: impactReq.impact_type,
        country_id: impactReq.country_id,
        impact_image_url: impactReq.impact_image_url ,
        created_by: user.user_id,
        created_at: new moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        updated_by: user.user_id,
    }
};

const updateImpactDTO = (impact, impactReq, user) => {    
    return {
        impact_type: impactReq.impact_type !== undefined ? impactReq.impact_type : impact.impact_type,
        country_id: impactReq.country_id !== undefined ? impactReq.country_id : impact.country_id,
        impact_total_donation: impactReq.impact_total_donation !== undefined ? impactReq.impact_total_donation : impact.impact_total_donation,
        impact_image_url: impactReq.impact_image_url !== undefined ? impactReq.impact_image_url : impact.impact_image_url,
        isactive: impactReq.isactive !== undefined ? impactReq.isactive : impact.isactive,
        updated_at: new moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        updated_by: user.user_id
    }
};

module.exports = {
    impactBasicDTO,
    createImpactDTO,
    updateImpactDTO
}