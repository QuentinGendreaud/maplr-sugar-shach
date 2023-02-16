import ServiceResponse from "../interfaces/service-response";

export const serviceResponseConstantes: {[key: string]: ServiceResponse} = {
    SUCCESS: {
        code: 200,
    },
    CREATED: {
        code: 201,
    },
    ACCEPTED: {
        code: 202,
    },
    NO_CONTENT: {
        code: 204,
    },
    BAD_REQUEST: {
        code: 400,
        description: 'Bad request'
    },
    NOT_FOUND: {
        code: 404,
        description: 'Element not found'
    },
    SERVER_ERROR: {
        code: 500,
        description: 'Internal server error'
    }
}