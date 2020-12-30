const updateEventContentDTO = (eventContent, eventContentReq) => {    
    return {
        event_name: eventContentReq.event_name !== undefined  ? eventContentReq.event_name : eventContent.event_name,
        event_description: eventContentReq.event_description !== undefined  ? eventContentReq.event_description : eventContent.event_description ,
        event_address: eventContentReq.event_address !== undefined  ? eventContentReq.event_address : eventContent.event_address,
        language_id: eventContentReq.language_id !== undefined  ? eventContentReq.language_id : eventContent.language_id,
    }
};

const createEventContentDTO = (eventContent, eventId) => {
    return {
        event_id: eventId,
        event_name: eventContent.event_name,
        event_description: eventContent.event_description ,
        event_address: eventContent.event_address,
        language_id: eventContent.language_id,
    }
};

module.exports = {
    updateEventContentDTO,
    createEventContentDTO,
};
