import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import ServiceResponse from "../interfaces/service-response";
import { serviceResponseConstantes } from "../constants/service-response.const";

class RequestMiddleware {
    public static areRequestParamsValid(request: Request, response: Response): boolean {
        const errors = validationResult(request);
        const isEmptyErrors = errors.isEmpty();
        if (!isEmptyErrors) {
            const errorParams =  errors.array().map((error) => error.param).join(', ');
            const formattedError: ServiceResponse = {
                code: serviceResponseConstantes.BAD_REQUEST.code,
                description: errorParams.length > 0 ? 
                    `The request have invalid values for following properties: ${errorParams}`
                    : serviceResponseConstantes.BAD_REQUEST.description
            };
            response.status(formattedError.code).json(formattedError);
        }
        return isEmptyErrors
    }
}

export default RequestMiddleware;