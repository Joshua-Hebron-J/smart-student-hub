'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_USERS } from '@/lib/data';
import type { AppUser } from '@/lib/types';
import Image from 'next/image';

const motivationalQuotes = [
    "The beautiful thing about learning is that no one can take it away from you.",
    "The expert in anything was once a beginner.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Believe you can and you're halfway there."
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.email === email);

      if (user && password) {
        setUser(user as AppUser);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.name}! Redirecting...`,
        });
        router.push(`/${user.role}`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/loginbg/1800/1200" 
            alt="Abstract background"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="opacity-20"
            data-ai-hint="abstract gradient"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        <header className="text-center mb-10 max-w-2xl">
            <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-2xl mb-4 border border-primary/20">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
                Smart Student Hub
            </h1>
            {quote && (
              <p className="text-md text-muted-foreground mt-4 italic flex justify-center items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                {quote}
              </p>
            )}
        </header>

        <main className="w-full max-w-md">
          <div className="bg-card/60 glassmorphism rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold">Login</h2>
              <p className="text-muted-foreground mt-1">Welcome back! Please enter your details.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/70 border-border h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-semibold">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot Password?</a>
                 </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/70 border-border h-12 text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full font-bold h-12 text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
        </main>

         <footer className="absolute bottom-6 text-center text-muted-foreground text-sm">
            <p>© 2024 Smart Student Hub. Empowering education through technology.</p>
        </footer>
      </div>
    </div>
  );
}
