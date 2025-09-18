import { config } from 'dotenv';
config();

import '@/ai/flows/generate-activity-summaries.ts';
import '@/ai/flows/ai-career-guidance-chatbot.ts';
import '@/ai/flows/suggest-skills-for-activity.ts';
import '@/ai/flows/ai-natural-language-student-search.ts';
import '@/ai/flows/generate-ai-resume.ts';