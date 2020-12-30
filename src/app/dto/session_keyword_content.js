const createSessionKeywordContentDTO = (sessionKeywordContent, session_keyword_id) => {
    let result = [];
    let arrID = [];

    for (let sessionKeywordIds of session_keyword_id) {
        arrID.push(sessionKeywordIds.session_keyword_id)
    }

    for (let i = 0; i < sessionKeywordContent.length; i++) {
        const obj = {
            session_keyword_id: arrID[i],
            session_keyword_name: sessionKeywordContent[i].session_keyword_content.session_keyword_name,
            language_id: sessionKeywordContent[i].session_keyword_content.language_id,
        }
        result.push(obj);
    }

    return result;
}

const updateSessionKeywordContentDTO = (sessionKeywordContent, sessionKeywordContentReq, session_keyword_id) => {
    const result = {
        session_keyword_id: session_keyword_id,
        session_keyword_name: sessionKeywordContentReq.session_keyword_name !== undefined ? sessionKeywordContentReq.session_keyword_name : sessionKeywordContent.session_keyword_name,
        language_id: sessionKeywordContentReq.language_id !== undefined ? sessionKeywordContentReq.language_id : sessionKeywordContent.language_id,
    }
    return result;
}

module.exports = {
    createSessionKeywordContentDTO,
    updateSessionKeywordContentDTO,
}
