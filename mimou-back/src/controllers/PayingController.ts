import PaymentService from "../service/PaymentService";

import { JsonController, Post, Body, Req, Get, Res } from "routing-controllers";
import { Payment } from "mercadopago";
import MercadoPagoSecurity from "../security/MercadoPagoSecurity";
import { client } from "../mercadopago";
import EmailService from "../service/EmailService";

import QRCode from "../utils/QRCode";

@JsonController("/mercado-pago/webhook")
class PayingController {

  private mpSecutiry: MercadoPagoSecurity = new MercadoPagoSecurity();
  private paymentService: PaymentService = new PaymentService();

  private emailService: EmailService = new EmailService();

  @Post()
  public async createPayment(@Body() body: any, @Req() req: any, @Res() res: any) {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];
  
    await this.mpSecutiry.verifySignature(xSignature, xRequestId, req);

    try{

      const {type, data} = body;

      if(type == "payment"){

        const payment = new Payment(client);
        const paymentData = await payment.get({ id: data.id});

        const dataToUpdate = {
            personId: paymentData.metadata.id,
            collectorId: paymentData.collector_id,
            paymentId: paymentData.payment_method?.id,
            status: paymentData.status,
            externalReference: paymentData.external_reference,
            paymentType: paymentData.payment_method?.type,
            processingMode: paymentData.processing_mode,
            merchantAccountId: paymentData.merchant_account_id,
            planId: paymentData.metadata.plan
        }

        const response: any = await this.paymentService.updatePayment(dataToUpdate);
        
        if(!response){
            return res.status(400).send();
        }

        const qrCodePath = await QRCode.generateQRCode(response.customUrl);

        if(!qrCodePath){
            return res.status(400).send();
        }

        await this.emailService.sendEmail(response, qrCodePath);
      }


    }catch(err){
      console.log(err);
    }

    return res.status(200).send();
  }
}

export default PayingController;