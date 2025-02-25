import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import NotAcceptTypeOfFile from "../errors/NotAcceptTypeOfFile";

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface{

    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        
        if(error instanceof NotAcceptTypeOfFile){
            response.status(error.httpCode).json(error);
        }

        next(error);
    }
    
}