'use server';
/**
 * @fileOverview Suggests relevant skills for a given activity description.
 *
 * - suggestSkillsForActivity - A function that takes an activity description and returns a list of suggested skills.
 * - SuggestSkillsForActivityInput - The input type for the suggestSkillsForActivity function.
 * - SuggestSkillsForActivityOutput - The return type for the suggestSkillsForActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsForActivityInputSchema = z.object({
  activityDescription: z
    .string()
    .describe('A description of the activity the student is submitting.'),
});
export type SuggestSkillsForActivityInput = z.infer<
  typeof SuggestSkillsForActivityInputSchema
>;

const SuggestSkillsForActivityOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('A list of skills suggested for the activity.'),
});
export type SuggestSkillsForActivityOutput = z.infer<
  typeof SuggestSkillsForActivityOutputSchema
>;

export async function suggestSkillsForActivity(
  input: SuggestSkillsForActivityInput
): Promise<SuggestSkillsForActivityOutput> {
  return suggestSkillsForActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsForActivityPrompt',
  input: {schema: SuggestSkillsForActivityInputSchema},
  output: {schema: SuggestSkillsForActivityOutputSchema},
  prompt: `You are a helpful assistant that suggests relevant skills for a given activity description.  Return a JSON array of skills.

Activity Description: {{{activityDescription}}}`,
});

const suggestSkillsForActivityFlow = ai.defineFlow(
  {
    name: 'suggestSkillsForActivityFlow',
    inputSchema: SuggestSkillsForActivityInputSchema,
    outputSchema: SuggestSkillsForActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
