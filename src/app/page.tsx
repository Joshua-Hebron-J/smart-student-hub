'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GraduationCap, Building, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_USERS } from '@/lib/data';
import type { UserRole } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.role === role // Simplified auth
    );

    if (user && password) { // In a real app, you'd check the password
      setUser(user);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
      });
      router.push(`/${user.role}`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials or role. Please try again.',
      });
    }
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[380px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-headline font-bold">Smart Student Hub</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
             <p className="text-sm text-muted-foreground italic mt-2">
              "The future belongs to those who believe in the beauty of their dreams."
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Login as</Label>
              <RadioGroup defaultValue="student" className="grid grid-cols-3 gap-4" onValueChange={(value: string) => setRole(value as UserRole)}>
                <div>
                  <RadioGroupItem value="student" id="student" className="peer sr-only" />
                  <Label
                    htmlFor="student"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <GraduationCap className="mb-3 h-6 w-6" />
                    Student
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="faculty" id="faculty" className="peer sr-only" />
                  <Label
                    htmlFor="faculty"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    Faculty
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                  <Label
                    htmlFor="admin"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <ShieldCheck className="mb-3 h-6 w-6" />
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full font-bold">
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/seed/studenthub/1200/1800"
          alt="Abstract image representing education and technology"
          data-ai-hint="education technology"
          width="1200"
          height="1800"
          className="h-full w-full object-cover dark:brightness-[0.3]"
        />
      </div>
    </div>
  );
}
