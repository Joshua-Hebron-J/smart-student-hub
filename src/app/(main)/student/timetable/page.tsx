import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_STUDENT_TIMETABLE } from '@/lib/data';
import { Clock } from 'lucide-react';

export default function StudentTimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timetableByDay = MOCK_STUDENT_TIMETABLE.reduce((acc, entry) => {
    if (!acc[entry.day]) {
      acc[entry.day] = [];
    }
    acc[entry.day].push(entry);
    return acc;
  }, {} as Record<string, typeof MOCK_STUDENT_TIMETABLE>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Weekly Timetable</CardTitle>
        <CardDescription>Your schedule for the current semester.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map(day => (
              timetableByDay[day] ? (
                timetableByDay[day].map((entry, index) => (
                  <TableRow key={`${day}-${index}`}>
                    {index === 0 && <TableCell rowSpan={timetableByDay[day].length} className="font-semibold align-top">{day}</TableCell>}
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>{entry.course}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key={day}>
                  <TableCell className="font-semibold">{day}</TableCell>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No classes scheduled</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
