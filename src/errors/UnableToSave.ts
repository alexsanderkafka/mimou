import { HttpError } from "routing-controllers";

export default class UnableToSave extends HttpError{

    private msg: string;

    constructor(msg: string) {
        super(400);
        this.msg = msg;
        Object.setPrototypeOf(this, UnableToSave.prototype);
    }

    toJSON(){
        return {
            timestamp: new Date(),
            statusCode: this.httpCode,
            message: this.msg,
        }
    }
}