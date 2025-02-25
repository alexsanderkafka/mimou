import 'dotenv/config';

import nodemailer from 'nodemailer';

export const transport  = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '0'),
    secure: false,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});