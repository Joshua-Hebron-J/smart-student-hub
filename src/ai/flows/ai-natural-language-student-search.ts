
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

const StudentDataSchema = z.object({
  name: z.string(),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  areaOfInterest: z.string(),
});

const NaturalLanguageStudentSearchInputSchema = z.object({
  query: z.string().describe('The natural language query to search for students.'),
  students: z.array(StudentDataSchema).describe('A list of all students to search through.'),
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
  prompt: `You are an AI assistant helping faculty members find students from a provided list.

  The faculty member is searching for students using the following query: "{{{query}}}"

  You have been given the following list of students and their details:
  {{#each students}}
  - Name: {{{this.name}}}, Skills: {{#each this.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}, Interests: {{#each this.interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}, Area of Interest: {{{this.areaOfInterest}}}
  {{/each}}

  Your task is to filter this list based on the query. Match the query against student skills, interests, or their specified 'areaOfInterest'.

  Return a list of only the names of the students that match the query. Do not include any other information.
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
