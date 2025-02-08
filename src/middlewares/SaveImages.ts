import multer from "multer";
import NotAcceptTypeOfFile from "../errors/NotAcceptTypeOfFile";
import { BadRequestError } from "routing-controllers";

const fileUpload = () => ({
    storage: multer.memoryStorage(),
    fileFilter: (req: any, file: any, cb: any) => {

        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(!allowedMimes.includes(file.mimetype)){
            //cb(new NotAcceptTypeOfFile("File not allowed"), false);

            cb(new NotAcceptTypeOfFile("File not allowed"), true);    
        }

        cb(null, true);
    },
    limits: {
        /*fieldNameSize: 255,*/
        fileSize: 1024 * 1024 * 5
    }
})

export default fileUpload;