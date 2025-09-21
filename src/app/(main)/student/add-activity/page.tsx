'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, ArrowLeft, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { suggestSkillsForActivity } from '@/ai/flows/suggest-skills-for-activity';
import { useUser } from '@/hooks/use-app-context';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];


const activitySchema = z.object({
  name: z.string().min(3, 'Activity name must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  image: z
    .any()
    .refine((file) => file, 'Image is required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
});

type ActivityFormValues = z.infer<typeof activitySchema>;

export default function AddActivityPage() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { addNotification } = useUser();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestSkills = async () => {
    const description = form.getValues('description');
    if (description.length < 20) {
      toast({
        variant: 'destructive',
        title: 'Description too short',
        description: 'Please provide a more detailed description to get skill suggestions.',
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestSkillsForActivity({ activityDescription: description });
      const newSuggestions = result.suggestedSkills.filter(s => !skills.includes(s));
      setSuggestedSkills(newSuggestions);
    } catch (error) {
      console.error('Error suggesting skills:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch skill suggestions.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    setSuggestedSkills(suggestedSkills.filter(skill => skill !== skillToRemove));
  };
  
  const handleAddNewSkill = () => {
    if (newSkill) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const onSubmitDetails = (data: ActivityFormValues) => {
    console.log(data);
    setStep(2);
    handleSuggestSkills();
  };
  
  const onFinalSubmit = () => {
    const activityName = form.getValues('name');
    console.log('Final Submission:', { ...form.getValues(), skills });
    
    addNotification({
        type: 'announcement',
        title: 'Activity Submitted',
        description: `Your activity "${activityName}" is pending approval.`
    });

    toast({
      title: 'Activity Submitted!',
      description: 'Your activity is now pending for faculty approval.',
    });
    router.push('/student');
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        {step > 1 && (
          <Button variant="ghost" size="sm" className="justify-self-start self-start" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4"/> Back
          </Button>
        )}
        <CardTitle>Submit a New Activity</CardTitle>
        <CardDescription>Step {step} of 2: {step === 1 ? 'Enter activity details' : 'Confirm your skills'}</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Name</FormLabel>
                    <FormControl><Input placeholder="e.g., AI Hackathon 2024" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>Activity Proof/Image</FormLabel>
                       <FormControl>
                          <div
                            className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-muted/50"
                          >
                             <Input 
                              id="dropzone-file" 
                              type="file" 
                              className="absolute w-full h-full opacity-0 cursor-pointer"
                              accept={ACCEPTED_IMAGE_TYPES.join(',')}
                              onChange={handleImageChange}
                             />
                             {imagePreview ? (
                                <Image src={imagePreview} alt="Selected preview" fill style={{objectFit: 'contain'}} className="rounded-lg p-2" />
                             ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">JPG, PNG, or WEBP (MAX. 5MB)</p>
                                </div>
                             )}
                          </div>
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
               />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your role and achievements in this activity..." {...field} rows={5} /></FormControl>
                    <FormDescription>The more detail you provide, the better our AI can suggest skills.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Completion</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Next: Add Skills</Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Your Skills</h3>
              <div className="flex flex-wrap gap-2 p-4 border rounded-md min-h-[80px] bg-background">
                {skills.length > 0 ? skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-base py-1 pl-3 pr-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )) : <p className="text-sm text-muted-foreground">Add skills below.</p>}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">AI Skill Suggestions</h3>
              <div className="flex flex-wrap gap-2">
                {isSuggesting && <p className="text-sm text-muted-foreground">Generating suggestions...</p>}
                {suggestedSkills.map(skill => (
                  <Button key={skill} variant="outline" size="sm" onClick={() => { addSkill(skill); setSuggestedSkills(suggestedSkills.filter(s => s !== skill)); }}>
                    <Plus className="mr-2 h-4 w-4" /> {skill}
                  </Button>
                ))}
                {!isSuggesting && suggestedSkills.length === 0 && skills.length > 0 && <p className="text-sm text-muted-foreground">No new suggestions. Try adding more detail to your description.</p>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Add a skill manually</h3>
              <div className="flex gap-2">
                <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="e.g., Project Management" onKeyDown={(e) => e.key ==='Enter' && handleAddNewSkill()}/>
                <Button onClick={handleAddNewSkill}>Add</Button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button onClick={onFinalSubmit}>Submit Activity</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
