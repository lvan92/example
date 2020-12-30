const EVENT_TYPE = {
    'PUBLIC': 1,
    'GLOBAL': 2
};

const EVENT_SPORT_GROUP_TYPE = {
    'PUBLIC': 1,
    'GLOBAL': 2
};

const TRIBE_PRIVACY = {
    'PUBLIC': 1,
    'PRIVATE': 2
}
const IMPACT_TYPE = {
    'PUBLIC': 1,
    'PRIVATE': 2
};

const SOCKET_MESSAGE = {
    LISTEN_DATA_FROM_CLIENT: 'listen-data-from-client',
    GET_ALL_EVENT_UPCOMING: 'get-all-event-upcoming',
    GET_EVENT_DETAIL: 'get-event-detail',
    SEND_LIST_EVENT_UPCOMING_DATA_TO_CLIENT: 'send-list-event-upcoming-data-to-client',
    SEND_EVENT_DETAIL_DATA_TO_CLIENT: 'send-event-detail-data-to-client',
    CHECK_TIME_STREAMING: 'check-time-streaming',
    SEND_REMAINING_TIME_STREAMING: 'current-position-in-session',
};

const EVENT_STATE = {
    UP_COMING: 'Up-coming',
    IN_SESSION: 'In-session',
    PAST: 'Past',
    FUTURE: 'Future',
    JUST_END: 'Just Ended',
    ARCHIVED: 'Archived',
    IN_PROCESS: 'In-progress',  
};

const TIME = {
    SEVEN_DAYS: 604800,
    THIRTY_MINUTES: 1800,
};

const FORMAT_TIME = {
    DATE : 'YYYY-MM-DD HH:mm:ss',
}

module.exports = {
    EVENT_TYPE,
    EVENT_SPORT_GROUP_TYPE,
    TRIBE_PRIVACY,
    IMPACT_TYPE,
    SOCKET_MESSAGE,
    EVENT_STATE,
    TIME,
    FORMAT_TIME,
}