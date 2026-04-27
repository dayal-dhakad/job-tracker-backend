export declare const sendMail: ({ to, subject, body, attachments, }: {
    to: string;
    subject: string;
    body: string;
    attachments?: Array<{
        filename: string;
        path: string;
    }>;
}) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
//# sourceMappingURL=mail.service.d.ts.map