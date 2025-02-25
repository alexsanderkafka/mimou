import { HttpError } from "routing-controllers";

export default class PaymentNotMade extends HttpError{

    private msg: string;

    constructor(msg: string) {
        super(402);
        this.msg = msg;
        Object.setPrototypeOf(this, PaymentNotMade.prototype);
    }

    toJSON(){
        return {
            timestamp: new Date(),
            statusCode: this.httpCode,
            message: this.msg,
        }
    }
}