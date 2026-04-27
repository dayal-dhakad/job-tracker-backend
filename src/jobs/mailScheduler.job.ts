// src/jobs/mailScheduler.job.ts
import cron from 'node-cron';
import { sendMail } from '../services/mail.service.js';
import { Application } from '../models/application.model.js';
import ScheduledMail from '../models/ScheduledMail.js';
import { resolveResumeTemplatePath } from '../utils/resumeTemplate.utils.js';

export const startMailScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const pendingMails = await ScheduledMail.find({
        status: 'pending',
        scheduledAt: { $lte: new Date() },
      })
        .sort({ scheduledAt: 1 })
        .limit(10);

      for (const mail of pendingMails) {
        try {
          const selectedResume = resolveResumeTemplatePath(mail.resumeTemplateId);

          await sendMail({
            to: mail.to,
            subject: mail.subject,
            body: mail.body,
            attachments: [
              {
                filename: selectedResume.filename,
                path: selectedResume.path,
              },
            ],
          });

          mail.status = 'sent';
          mail.set('error', undefined);
          await mail.save();

          await Application.findByIdAndUpdate(mail.application, {
            status: 'sent',
            lastEmailSentAt: new Date(),
          });
        } catch (error) {
          mail.status = 'failed';
          mail.error = error instanceof Error ? error.message : 'Mail sending failed';
          await mail.save();
        }
      }
    } catch (error) {
      console.error('Scheduled mail job failed:', error);
    }
  });
};
