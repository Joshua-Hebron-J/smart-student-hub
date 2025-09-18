'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a resume based on a student's approved activities.
 *
 * - generateAIResume - A function that generates a resume for a student based on their approved activities.
 * - GenerateAIResumeInput - The input type for the generateAIResume function.
 * - GenerateAIResumeOutput - The return type for the generateAIResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAIResumeInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  activities: z
    .string()
    .describe('A list of the student approved activities.'),
  skills: z.string().describe('A list of the student skills.'),
  interests: z.string().describe('A list of student interests'),
  universityPrograms: z.string().describe('University Programs'),
});
export type GenerateAIResumeInput = z.infer<typeof GenerateAIResumeInputSchema>;

const GenerateAIResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume.'),
});
export type GenerateAIResumeOutput = z.infer<typeof GenerateAIResumeOutputSchema>;

export async function generateAIResume(input: GenerateAIResumeInput): Promise<GenerateAIResumeOutput> {
  return generateAIResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIResumePrompt',
  input: {schema: GenerateAIResumeInputSchema},
  output: {schema: GenerateAIResumeOutputSchema},
  prompt: `You are an expert resume writer.

  Based on the student's name, activities, skills, interests and university programs, create a compelling resume.

  Student Name: {{{studentName}}}
  Activities: {{{activities}}}
  Skills: {{{skills}}}
  Interests: {{{interests}}}
  University Programs: {{{universityPrograms}}}
  `,
});

const generateAIResumeFlow = ai.defineFlow(
  {
    name: 'generateAIResumeFlow',
    inputSchema: GenerateAIResumeInputSchema,
    outputSchema: GenerateAIResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
