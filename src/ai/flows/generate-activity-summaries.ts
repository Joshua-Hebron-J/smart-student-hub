// src/ai/flows/generate-activity-summaries.ts
'use server';

/**
 * @fileOverview Generates summaries for student activities using AI.
 *
 * - generateActivitySummary - A function that generates a summary for a given activity.
 * - GenerateActivitySummaryInput - The input type for the generateActivitySummary function.
 * - GenerateActivitySummaryOutput - The return type for the generateActivitySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActivitySummaryInputSchema = z.object({
  activityDescription: z.string().describe('A detailed description of the activity.'),
  studentSkills: z.array(z.string()).describe('A list of skills the student possesses.'),
  activityName: z.string().describe('Name of the activity'),
});
export type GenerateActivitySummaryInput = z.infer<typeof GenerateActivitySummaryInputSchema>;

const GenerateActivitySummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the activity highlighting its impact and relevance to the student\s skills.'),
});
export type GenerateActivitySummaryOutput = z.infer<typeof GenerateActivitySummaryOutputSchema>;

export async function generateActivitySummary(input: GenerateActivitySummaryInput): Promise<GenerateActivitySummaryOutput> {
  return generateActivitySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActivitySummaryPrompt',
  input: {schema: GenerateActivitySummaryInputSchema},
  output: {schema: GenerateActivitySummaryOutputSchema},
  prompt: `You are an expert in writing concise and impactful summaries of student activities for their portfolios.

  Given the following information, write a one paragraph summary that highlights the value and impact of the activity, and how it relates to the student's skills. Emphasize quantifiable achievements and key learnings.

  Activity Name: {{{activityName}}}
  Activity Description: {{{activityDescription}}}
  Student Skills: {{#each studentSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  `,
});

const generateActivitySummaryFlow = ai.defineFlow(
  {
    name: 'generateActivitySummaryFlow',
    inputSchema: GenerateActivitySummaryInputSchema,
    outputSchema: GenerateActivitySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
