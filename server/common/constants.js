const AUTH_LEVEL = {
    BASIC: "10",
    ADMIN: "20",
    SU: "30"
}

const SUBSCRIBER_METHOD = {
    LOG_ERROR: "log_error"
}

const ERROR_TYPE = {
    BAD_REQUEST: "400",
    UNAUTHORIZED: "401",
    NOT_FOUND: "404",
    INTERNAL_SERVER: "500"
}

const VOYAGE_STATUS = {
    LOADING: "10",
    IN_TRANSIT: "20",
    OFFLOADING: "30",
    FINISHED: "100"
}

module.exports = {
    AUTH_LEVEL: AUTH_LEVEL,
    SUBSCRIBER_METHOD: SUBSCRIBER_METHOD,
    ERROR_TYPE: ERROR_TYPE,
    VOYAGE_STATUS: VOYAGE_STATUS
}