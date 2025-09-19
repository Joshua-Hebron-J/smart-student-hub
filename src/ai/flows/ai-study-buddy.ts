'use server';

/**
 * @fileOverview Provides an AI-powered study buddy chatbot.
 *
 * - studyBuddyChatbot - A function that explains academic concepts.
 * - StudyBuddyChatbotInput - The input type for the studyBuddyChatbot function.
 * - StudyBuddyChatbotOutput - The return type for the studyBuddyChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyBuddyChatbotInputSchema = z.object({
  concept: z.string().describe("The academic concept the student wants to understand."),
});
export type StudyBuddyChatbotInput = z.infer<typeof StudyBuddyChatbotInputSchema>;

const StudyBuddyChatbotOutputSchema = z.object({
  explanation: z.string().describe('A simple and clear explanation of the concept.'),
});
export type StudyBuddyChatbotOutput = z.infer<typeof StudyBuddyChatbotOutputSchema>;

export async function studyBuddyChatbot(input: StudyBuddyChatbotInput): Promise<StudyBuddyChatbotOutput> {
  return studyBuddyChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyBuddyChatbotPrompt',
  input: {schema: StudyBuddyChatbotInputSchema},
  output: {schema: StudyBuddyChatbotOutputSchema},
  prompt: `You are a friendly and helpful AI Study Buddy for a university student.

  A student has asked for an explanation of the following concept: "{{{concept}}}"

  Your task is to explain this concept in a simple, clear, and easy-to-understand way. Use analogies or examples if it helps. Keep the tone encouraging and supportive. Do not just provide a definition; aim for a helpful explanation.
  `,
});

const studyBuddyChatbotFlow = ai.defineFlow(
  {
    name: 'studyBuddyChatbotFlow',
    inputSchema: StudyBuddyChatbotInputSchema,
    outputSchema: StudyBuddyChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
