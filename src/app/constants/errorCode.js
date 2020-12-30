const ERROR_CODE = {
    // Event error code: 1000 - 1099
    EVENT: {
        EVENT_CONDITION_WRONG: {
            code: 1000,
            message: 'Condition to get Event is wrong',
            field: '',
            resource: ''
        },
        EVENT_DELETE_WRONG: {
            code: 1001,
            message: 'Current date must bigger than event start time to delete',
            field: '',
            resource: ''
        },
    },
    TRIBE: {
        TRIBE_DOES_NOT_EXIST:{
            code: 1020,
            message: 'Tribe does not exist.',
            field: '',
            resource: ''
        }
    }
}

module.exports = ERROR_CODE;