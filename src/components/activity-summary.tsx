
import { generateActivitySummary } from '@/ai/flows/generate-activity-summaries';
import type { Activity, Student } from '@/lib/types';

export default async function ActivitySummary({ activity, student }: { activity: Activity, student: Student }) {
  let summary = activity.aiSummary;

  if (!summary) {
    try {
      const result = await generateActivitySummary({
        activityName: activity.name,
        activityDescription: activity.description,
        studentSkills: student.skills,
      });
      summary = result.summary;
      // In a real app, you'd save this back to the activity object
    } catch (error) {
      console.error("Failed to generate summary", error);
      summary = activity.description; // Fallback to description
    }
  }

  return <p className="text-sm text-muted-foreground">{summary}</p>;
}
