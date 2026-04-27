import fs from 'node:fs';
import path from 'node:path';
import { AppError } from './AppError.js';
const RESUME_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);
export const getResumeTemplatesDir = () => path.resolve(process.cwd(), 'src', 'resumeTemplates');
const isSafeFilename = (filename) => {
    return (filename.trim().length > 0 &&
        filename === path.basename(filename) &&
        !path.isAbsolute(filename) &&
        !filename.includes('/') &&
        !filename.includes('\\'));
};
const toDisplayName = (filename) => {
    return path
        .parse(filename)
        .name.replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};
export const listResumeTemplates = () => {
    const templatesDir = getResumeTemplatesDir();
    if (!fs.existsSync(templatesDir)) {
        return [];
    }
    return fs
        .readdirSync(templatesDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && RESUME_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
        .map((entry) => ({
        id: entry.name,
        name: toDisplayName(entry.name),
        filename: entry.name,
    }));
};
export const resolveResumeTemplatePath = (resumeTemplateId) => {
    const templatesDir = getResumeTemplatesDir();
    const selectedFilename = resumeTemplateId.trim();
    if (!isSafeFilename(selectedFilename)) {
        throw new AppError('Invalid resume selected', 400);
    }
    const resolvedTemplatesDir = path.resolve(templatesDir);
    const resumePath = path.resolve(resolvedTemplatesDir, selectedFilename);
    const relativePath = path.relative(resolvedTemplatesDir, resumePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        throw new AppError('Invalid resume selected', 400);
    }
    if (!fs.existsSync(resumePath)) {
        throw new AppError('Selected resume not found', 400);
    }
    return {
        filename: selectedFilename,
        path: resumePath,
    };
};
//# sourceMappingURL=resumeTemplate.utils.js.map