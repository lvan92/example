'use strict'

const HTTP_STATUS = {
    SUCCESS: "OK",
    SERVER_ERROR: "Server error",
    NOT_FOUND: "Not found",
    BAD_REQUEST: "Bad request",
    CONFLICT: "Conflict",
    CREATED: "Created",
    FORBIDDEN: "Forbidden"
}

const HTTP_CODE = {
    SUCCESS: 200,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    CREATED: 201,
    FORBIDDEN: 403
}

const UPLOAD_MESSAGE = {
    NOT_SUPPORT_FILE_TYPE: "Invalid file type. Only JPG, PNG image files are allowed.",
    LIMIT_FILE_SIZE: "File size is too large. Allowed file size less than "
}

const SOUND_MESSAGE = {
    SOUND_ID_NOT_FOUND: "Sound ID Not Found",
    SOUND_IS_USED: "Sound Is Used",
}

module.exports = {
    HTTP_STATUS,
    HTTP_CODE,
    UPLOAD_MESSAGE,
    SOUND_MESSAGE
}