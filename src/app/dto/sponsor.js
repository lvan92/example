const moment = require('moment');

const sponsorBasicDTO = (sponsors) => {
    let result = [];
    sponsors.map(item => {
        const obj = {
            sponsor_id: item.sponsor_id,
            country_id: item.country_id,
            sponsor_total_funding: item.sponsor_total_funding,
            sponsor_image_url: item.sponsor_image_url,
            sponsor_name: item.sponsor_content.sponsor_name,
            sponsor_description: item.sponsor_content.sponsor_description,
            language_id: item.sponsor_content.language.language_id,            
            language_name: item.sponsor_content.language.language_name,
            isactive: item.isactive,
            created_by: item.created_by,
            updated_by: item.updated_by,
            created_at: moment.utc(item.created_at).local().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: item.updated_at !== null ? moment.utc(item.updated_at).local().format('YYYY-MM-DD HH:mm:ss') : null,
        }
        result.push(obj);
    });

    return result;
}

module.exports = {
    sponsorBasicDTO
}
