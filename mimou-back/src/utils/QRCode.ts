import * as fs from 'fs';
import path from "path";
import QRCodeStyling from "qr-code-styling";

import nodeCanvas from 'canvas';
import { JSDOM } from 'jsdom';

export default abstract class QRCode{

    private static qrCodeDir = path.join(__dirname, '../../qrcodes');

    public static async generateQRCode(customUrl: string): Promise<string | undefined>{
        try{
    
            if (!fs.existsSync(this.qrCodeDir)) {
                fs.mkdirSync(this.qrCodeDir, { recursive: true });
            }

            const qrCodePath = path.join(this.qrCodeDir, `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`);

            const options: any = {
                width: 400,
                height: 400,
                data: `http://192.168.0.2:3000${customUrl}`,
                image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
                dotsOptions: {
                  color: "#F08080",
                  type: "classy-rounded"
                },
                backgroundOptions: {
                  color: "#e9ebee",
                },
                imageOptions: {
                  crossOrigin: "anonymous",
                  margin: 20
                }
              }
              
              const qrCodeImage = new QRCodeStyling({
                jsdom: JSDOM,
                nodeCanvas: nodeCanvas, 
                ...options,
                imageOptions: {
                  saveAsBlob: true,
                  crossOrigin: "anonymous",
                  margin: 20
                },
              });

              qrCodeImage.getRawData("png").then(( buffer: any) => {
                fs.writeFileSync(`${qrCodePath}`, buffer);
              });

              return qrCodePath;

        }catch(err){
            console.log(err);
            return undefined;
        }    
    }
}