// src/services/mail.service.ts

import { transporter } from '../config/mail.js';
import { AppError } from '../utils/AppError.js';

export const sendMail = async ({
  to,
  subject,
  body,
  attachments,
}: {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}) => {
  console.log('send mail in transporter ');

  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new AppError('Mail service is not configured', 500);
  }
  console.log('about to send mail ');
  return transporter.sendMail({
    from: `"Deendayal Dhakad" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
    html: body.replace(/\n/g, '<br/>'),
    attachments,
  });
};
