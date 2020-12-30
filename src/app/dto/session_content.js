const createSessionContentDTO = (sessionContent, session_id) => {
    const result = {
        session_id: session_id,
        language_id: sessionContent.session_content.language_id,
        session_name: sessionContent.session_content.session_name,
        session_motivation_text: sessionContent.session_content.session_motivation_text,
    };

    return result;
}

const updateSessionContentDTO = (sessionContent, sessionContentReq, session_id) => {
    const result = {
        session_id: session_id,
        language_id: sessionContentReq.session_content.language_id !== undefined ? sessionContentReq.session_content.language_id : sessionContent.language_id,
        session_name: sessionContentReq.session_content.session_name !== undefined ? sessionContentReq.session_content.session_name : sessionContent.session_name,
        session_motivation_text: sessionContentReq.session_content.session_motivation_text !== undefined ? sessionContentReq.session_content.session_motivation_text : sessionContent.session_motivation_text,
    };

    return result;
};

module.exports = {
    createSessionContentDTO,
    updateSessionContentDTO,
}
