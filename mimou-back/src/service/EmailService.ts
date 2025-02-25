import 'dotenv/config';

import { transport } from "../mail";
import { format, parseISO } from 'date-fns';
import { ptBR } from "date-fns/locale";

export default class EmailService{

    public async sendEmail(data: any, path: string){

        try{
            transport.sendMail({
                from: `Mimou <${process.env.MAIL_USER}>`,
                to: data.email,
                subject: `Mimou - ${data.name}`,
                text: 'Seu presente está pronto para ser entregue!🎉\n Compartilhe o QRCode',
                html:  `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; text-align: center;">
                    <img src="https://via.placeholder.com/150" alt="Logo" style="width: 150px; margin-bottom: 20px;">
                    <h1 style="color: #BF6064; margin-bottom: 20px;">Seu presente está pronto para ser entregue!🎉</h1>
                    <p style="font-size: 16px; color: #343A40;">Ficamos felizes em ter você conosco. Compartilhe o link abaixo com a pessoa que você deseja dar o presente ou compartilhe o QRCode.</p>
                    <a href="http://192.168.0.2:3000/presente${data.customUrl}" style="display: inline-block; padding: 12px 24px; background-color: #F08080; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; box-shadow: 0 0 40px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 0, 0, 0.3);">
                        Acessar Presente
                    </a>
                    <p style="font-size: 16px; color: #343A40;">Lembre-se. Você escolheu o plano ${data.plan.getName()} e o link é válido até ${format(parseISO(data.urlValidateUntil.toString()), 'dd/MM/yyyy', { locale: ptBR })}.</p>
                </div>
                `,
                attachments: [
                    {
                        filename: 'qrcode.png',
                        path: path,
                        cid: 'image_cid'
                    }
                ]
            });
        }catch(err){
            console.log(err)
        }

        
    }
}