const createTribeContentDTO = (tribeContent, tribe_id) => {
    const result = {
        tribe_id: tribe_id,
        language_id: 1,
        tribe_name: tribeContent.tribe_name,
        tribe_description: tribeContent.tribe_description !== null ? tribeContent.tribe_description : "",
        ispublish: true,
    };

    return result;
}

const updateTribeContentDTO = (tribeContent, tribeContentReq, tribe_id) => {
    const result = {
        tribe_id: tribe_id,
        language_id: tribeContentReq.language_id !== undefined ? tribeContentReq.language_id : tribeContent.language_id,
        tribe_name: tribeContentReq.tribe_name !== undefined ? tribeContentReq.tribe_name : tribeContent.tribe_name,
        tribe_description: tribeContentReq.tribe_description !== undefined ? tribeContentReq.tribe_description : tribeContent.tribe_description,
        ispublish: tribeContentReq.ispublish !== undefined ? tribeContentReq.ispublish : tribeContent.ispublish
    };

    return result;
};

const tribeContentDetailDTO = (tribeContent) => {
    const result = {
        language_id: tribeContent.language_id !== undefined ? tribeContent.language_id : null,
        tribe_name: tribeContent.tribe_name !== undefined ? tribeContent.tribe_name : null,
        tribe_description: tribeContent.tribe_description !== undefined ? tribeContent.tribe_description : null,
        ispublish: tribeContent.ispublish !== undefined ? tribeContent.ispublish : null
    };

    return result;
};



module.exports = {
    createTribeContentDTO,
    updateTribeContentDTO,
    tribeContentDetailDTO
}
