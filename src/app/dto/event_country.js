const createEventCountryDTO = (event, eventId) => {
    return {
        event_id: eventId,
        country_id: event.country_id,
        address: event.address,
    }
};

const updateEventCountryDTO = (eventCountry, req) => {
    return {
        country_id: req.country_id !== undefined ? req.country_id : eventCountry.country_id,
        address: req.address !== undefined ? req.address : eventCountry.address,
    }
};

module.exports = {
    createEventCountryDTO,
    updateEventCountryDTO,
};