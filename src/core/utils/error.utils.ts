import {ValidationError} from "../types/validation-errors";

export const createErrorMessages = (
    errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
    return { errorMessages: errors };
};