// first create the interface
// then the class with static methods

import { Response } from "express";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T | null;
    error?: string | null;
    code?: string;
}

class ResponseHandler {
    static success<T> (res: Response, message: string, data?: T, status = 200): any {
        const response: ApiResponse<T> = {
            success: true,
            message: message,
            data: data || null
        };
        return res.status(status).json(response);
    }
    static error<T> (res: Response, message: string, status = 400, code?: string, error?: any): any {
        const response: ApiResponse<T> = {
            success: false,
            message: message,
            error: error || null,
            code
        };
        return res.status(status).json(response);
    }

}

export { ResponseHandler, ApiResponse };