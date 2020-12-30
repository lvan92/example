const createSessionKeywordDTO = (sessionKeyword, session_id) => {
        const result = {
            session_id: session_id,
            session_keyword_start_time: sessionKeyword.session_keyword_start_time,
        }
    
    return result;
}

const updateSessionKeywordDTO = (sessionKeyWordReq, session_id) => {
    let result = [];
    sessionKeyWordReq.map(item => {
        if (item.session_keyword_id) {
            const obj = {
                session_keyword_id: item.session_keyword_id,
                session_id: session_id,
                session_keyword_start_time: item.session_keyword_start_time,
            }
            result.push(obj);
        }
    });
    return result;
}

module.exports = {
    createSessionKeywordDTO,
    updateSessionKeywordDTO,
}
