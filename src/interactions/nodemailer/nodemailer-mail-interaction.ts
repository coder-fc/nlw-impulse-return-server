import nodemailer from 'nodemailer'
import { MailInteraction, SendMailData } from "../mail-interaction";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7e30bce1c15475",
        pass: "cd466d09e63501"
    }
});

export class NodemailerMailInteraction implements MailInteraction {
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <equipe@feedget.com',
            to: 'Felipe Costa <felipech3344@gmail.com>',
            subject,
            html: body,
        });
    }
}