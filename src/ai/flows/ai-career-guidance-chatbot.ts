// 'use server'

/**
 * @fileOverview Provides an AI-powered career guidance chatbot.
 *
 * - careerGuidanceChatbot - A function that provides career advice based on student data.
 * - CareerGuidanceChatbotInput - The input type for the careerGuidanceChatbot function.
 * - CareerGuidanceChatbotOutput - The return type for the careerGuidanceChatbot function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerGuidanceChatbotInputSchema = z.object({
  interests: z.string().describe('The student\'s interests.'),
  skills: z.string().describe('The student\'s skills.'),
  universityPrograms: z.string().describe('The university programs available to the student.'),
  query: z.string().describe('The student\'s question or request.'),
});
export type CareerGuidanceChatbotInput = z.infer<typeof CareerGuidanceChatbotInputSchema>;

const CareerGuidanceChatbotOutputSchema = z.object({
  advice: z.string().describe('The career advice provided by the chatbot.'),
});
export type CareerGuidanceChatbotOutput = z.infer<typeof CareerGuidanceChatbotOutputSchema>;

export async function careerGuidanceChatbot(input: CareerGuidanceChatbotInput): Promise<CareerGuidanceChatbotOutput> {
  return careerGuidanceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerGuidanceChatbotPrompt',
  input: {schema: CareerGuidanceChatbotInputSchema},
  output: {schema: CareerGuidanceChatbotOutputSchema},
  prompt: `You are a career guidance chatbot providing advice to students.

  Incorporate the following information into your advice:

  Student Interests: {{{interests}}}
  Student Skills: {{{skills}}}
  University Programs: {{{universityPrograms}}}

  Student Question: {{{query}}}
  `,
});

const careerGuidanceChatbotFlow = ai.defineFlow(
  {
    name: 'careerGuidanceChatbotFlow',
    inputSchema: CareerGuidanceChatbotInputSchema,
    outputSchema: CareerGuidanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
