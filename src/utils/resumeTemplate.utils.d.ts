export type ResumeTemplate = {
    id: string;
    name: string;
    filename: string;
};
export declare const getResumeTemplatesDir: () => string;
export declare const listResumeTemplates: () => ResumeTemplate[];
export declare const resolveResumeTemplatePath: (resumeTemplateId: string) => {
    filename: string;
    path: string;
};
//# sourceMappingURL=resumeTemplate.utils.d.ts.map