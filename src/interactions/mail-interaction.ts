export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailInteraction {
    sendMail: (data: SendMailData) => Promise<void>;
}