
import { MOCK_STUDENTS } from '@/lib/data';
import type { Student } from '@/lib/types';
import { notFound } from 'next/navigation';
import PortfolioView from '@/components/portfolio-view';

export default function StudentPortfolioPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const student = MOCK_STUDENTS.find(s => s.id === id);

  if (!student) {
    notFound();
  }

  return <PortfolioView student={student} />;
}
