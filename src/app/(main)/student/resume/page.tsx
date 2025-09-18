'use client';

import { useState } from 'react';
import { Wand2, Printer, Download, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';
import { generateAIResume } from '@/ai/flows/generate-ai-resume';
import { useToast } from '@/hooks/use-toast';

export default function ResumePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [resume, setResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const student = user as Student;

  const handleGenerateResume = async () => {
    setIsLoading(true);
    try {
      const response = await generateAIResume({
        studentName: student.name,
        activities: 'AI Hackathon 2023, Volunteer Teacher at CodeCamp', // Example data
        skills: student.skills.join(', '),
        interests: student.interests.join(', '),
        universityPrograms: 'Computer Science', // Example data
      });
      setResume(response.resume);
    } catch (error) {
      console.error('Resume Generation Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Resume - ${student.name}</title>
          <style>
            body { font-family: sans-serif; line-height: 1.6; }
            pre { white-space: pre-wrap; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <pre>${resume}</pre>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resume);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Resume Generator</CardTitle>
        <CardDescription>
          Generate a professional resume based on your profile and approved activities with one click.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={handleGenerateResume} disabled={isLoading}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : resume ? 'Regenerate Resume' : 'Generate Resume'}
          </Button>
          {resume && (
            <>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
               <Button variant="outline" onClick={handleCopy}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </>
          )}
        </div>

        {resume && (
          <div className="mt-6 border rounded-lg p-6 bg-background">
            <pre className="whitespace-pre-wrap font-sans text-sm">{resume}</pre>
          </div>
        )}
        
        {!resume && !isLoading && (
            <div className="mt-6 border-2 border-dashed rounded-lg p-12 text-center">
                <p className="text-muted-foreground">Your generated resume will appear here.</p>
            </div>
        )}

        {isLoading && (
             <div className="mt-6 border rounded-lg p-6 bg-background space-y-4 animate-pulse">
                <div className="h-6 w-1/3 bg-muted rounded"></div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded"></div>
                    <div className="h-4 w-5/6 bg-muted rounded"></div>
                </div>
                 <div className="h-5 w-1/4 bg-muted rounded mt-4"></div>
                 <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded"></div>
                    <div className="h-4 w-full bg-muted rounded"></div>
                    <div className="h-4 w-4/6 bg-muted rounded"></div>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
