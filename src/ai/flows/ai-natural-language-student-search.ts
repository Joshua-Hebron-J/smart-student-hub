'use server';
/**
 * @fileOverview Implements the AI-powered natural language student search flow.
 *
 * - naturalLanguageStudentSearch - A function that accepts a natural language query and returns a list of student names.
 * - NaturalLanguageStudentSearchInput - The input type for the naturalLanguageStudentSearch function.
 * - NaturalLanguageStudentSearchOutput - The return type for the naturalLanguageStudentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageStudentSearchInputSchema = z.object({
  query: z.string().describe('The natural language query to search for students.'),
  areaOfInterest: z.string().optional().describe('The area of interest to filter students by.'),
});
export type NaturalLanguageStudentSearchInput = z.infer<typeof NaturalLanguageStudentSearchInputSchema>;

const NaturalLanguageStudentSearchOutputSchema = z.object({
  studentNames: z.array(z.string()).describe('A list of student names that match the query.'),
});
export type NaturalLanguageStudentSearchOutput = z.infer<typeof NaturalLanguageStudentSearchOutputSchema>;

export async function naturalLanguageStudentSearch(input: NaturalLanguageStudentSearchInput): Promise<NaturalLanguageStudentSearchOutput> {
  return naturalLanguageStudentSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageStudentSearchPrompt',
  input: {schema: NaturalLanguageStudentSearchInputSchema},
  output: {schema: NaturalLanguageStudentSearchOutputSchema},
  prompt: `You are an AI assistant helping faculty members find students based on their skills, interests, or activities.

  The faculty member is searching for students using the following query: {{{query}}}
  {{#if areaOfInterest}}
  The faculty member is interested in students with area of interest: {{{areaOfInterest}}}
  {{/if}}
  Return a list of student names that match the query. Only return student names. Do not include any other information.
  If no students match the query, return an empty array.

  Example Output:
  {
    "studentNames": ["Alice Smith", "Bob Johnson"]
  }
  `,
});

const naturalLanguageStudentSearchFlow = ai.defineFlow(
  {
    name: 'naturalLanguageStudentSearchFlow',
    inputSchema: NaturalLanguageStudentSearchInputSchema,
    outputSchema: NaturalLanguageStudentSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
