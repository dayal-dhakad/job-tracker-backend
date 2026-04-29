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
  attachments?: Array<{ filename: string; path: string }>;
}) => {
  try {
    console.log('send mail in transporter');

    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new AppError('Mail service is not configured', 500);
    }

    console.log('about to send mail');

    const info = await transporter.sendMail({
      from: `"Deendayal Dhakad" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text: body,
      html: body.replace(/\n/g, '<br/>'),
      attachments,
    });

    console.log('mail sent successfully:', info.messageId);
    return info;
  } catch (error: any) {
    console.error('mail send failed:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    throw new AppError(error.message || 'Failed to send mail', 500);
  }
};
