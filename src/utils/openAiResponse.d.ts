import { z } from 'zod';
declare const JobApplicationSchema: z.ZodObject<{
    companyName: z.ZodNullable<z.ZodString>;
    companyWebsite: z.ZodNullable<z.ZodString>;
    recruiterName: z.ZodNullable<z.ZodString>;
    recruiterEmail: z.ZodNullable<z.ZodString>;
    jobTitle: z.ZodNullable<z.ZodString>;
    jobUrl: z.ZodNullable<z.ZodString>;
    location: z.ZodNullable<z.ZodString>;
    workMode: z.ZodNullable<z.ZodEnum<{
        remote: "remote";
        hybrid: "hybrid";
        onsite: "onsite";
        unknown: "unknown";
    }>>;
    source: z.ZodNullable<z.ZodEnum<{
        linkedin: "linkedin";
        naukri: "naukri";
        instahyre: "instahyre";
        foundit: "foundit";
        "company-website": "company-website";
        referral: "referral";
        other: "other";
    }>>;
    subject: z.ZodNullable<z.ZodString>;
    emailBody: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    tags: z.ZodNullable<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type JobApplicationAIResult = z.infer<typeof JobApplicationSchema>;
export declare const aiResponse: (jobPosting: string) => Promise<Partial<JobApplicationAIResult> | null>;
export {};
//# sourceMappingURL=openAiResponse.d.ts.map