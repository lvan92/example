const countryBasicDTO = (country) => {
    let result = [];
    country.map(item => {
        const obj = {
            country_id: item.country_id,
            country_name: item.country_name,
            isactive: item.isactive,
        }
        result.push(obj);
    });

    return result;
};

module.exports = {
    countryBasicDTO,
};