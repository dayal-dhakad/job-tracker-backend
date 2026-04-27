import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const JobApplicationSchema = z.object({
    companyName: z.string().nullable(),
    companyWebsite: z.string().nullable(),
    recruiterName: z.string().nullable(),
    recruiterEmail: z.string().nullable(),
    jobTitle: z.string().nullable(),
    jobUrl: z.string().nullable(),
    location: z.string().nullable(),
    workMode: z.enum(['remote', 'hybrid', 'onsite', 'unknown']).nullable(),
    source: z
        .enum(['linkedin', 'naukri', 'instahyre', 'foundit', 'company-website', 'referral', 'other'])
        .nullable(),
    subject: z.string().nullable(),
    emailBody: z.string().nullable(),
    notes: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
});
export const aiResponse = async (jobPosting) => {
    try {
        const response = await client.responses.parse({
            model: 'gpt-5.5',
            reasoning: { effort: 'low' },
            input: [
                {
                    role: 'system',
                    content: `
You extract job application data from job postings.

Return only fields that are clearly available or strongly inferable.
Do not add user, resume, template, status, createdAt, updatedAt, appliedAt, lastEmailSentAt, or followUpDate.
Use "unknown" for workMode only if location/work mode is unclear.
Generate subject and emailBody only when recruiter email or recruiter outreach context is available.
          `,
                },
                {
                    role: 'user',
                    content: jobPosting,
                },
            ],
            text: {
                format: zodTextFormat(JobApplicationSchema, 'job_application'),
            },
        });
        return response.output_parsed;
    }
    catch (error) {
        console.error('AI parsing error:', error);
        return null;
    }
};
//# sourceMappingURL=openAiResponse.js.map