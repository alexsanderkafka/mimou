import PaymentService from "../service/PaymentService";

import { JsonController, Post, Body, Req, Get, Res } from "routing-controllers";
import { Preference } from "mercadopago";
import { MercadoPagoConfig } from "mercadopago";
import MercadoPagoSecurity from "../security/MercadoPagoSecurity";

@JsonController("/mercado-pago/webhook")
class PayingController {

  private mpSecutiry: MercadoPagoSecurity = new MercadoPagoSecurity();

  @Post()
  public async createPayment(@Body() body: any, @Req() req: any, @Res() res: any) {

    console.log(req.headers);

    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];
  
    await this.mpSecutiry.verifySignature(xSignature, xRequestId, req);

    console.log("Dentro do controller: ");
    console.log("x-signature: " + xSignature);
    console.log("x-request-id: " + xRequestId);
    console.log(body);

    return res.status(200).send();
  }
}

export default PayingController;