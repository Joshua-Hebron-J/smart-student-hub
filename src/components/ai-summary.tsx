
import type { Student, Activity } from '@/lib/types';

export default async function AISummary({ student, activities }: { student: Student, activities: Activity[]}) {
    // This could be a call to another Genkit flow in the future.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    const summary = `Based on a GPA of ${student.gpa} and participation in high-impact activities like ${activities[0]?.name || 'hackathons'}, ${student.name.split(' ')[0]} demonstrates strong academic performance and practical skills in areas such as ${student.skills.slice(0,2).join(' and ')}. A proactive learner with demonstrated leadership abilities.`;
    return <p className="text-sm text-muted-foreground italic">{summary}</p>;
}
