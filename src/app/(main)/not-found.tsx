'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { useUser } from '@/hooks/use-app-context';

export default function NotFound() {
  const { user } = useUser();
  const homePath = user ? `/${user.role}` : '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-6">
            <div className="p-3 bg-primary/20 rounded-full">
                <SearchX className="h-12 w-12 text-primary" />
            </div>
        </div>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild>
          <Link href={homePath}>Go back home</Link>
        </Button>
        <Button variant="link" asChild>
            <Link href="/support">Contact support <span aria-hidden="true">&rarr;</span></Link>
        </Button>
      </div>
    </div>
  );
}