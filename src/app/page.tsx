
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_USERS } from '@/lib/data';
import type { AppUser } from '@/lib/types';

const motivationalQuotes = [
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState({ quote: '', author: '' });

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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background to-blue-50/50 dark:from-slate-900 dark:to-blue-950">
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute top-[-20%] left-[-20%] h-[50%] w-[70%] rounded-full bg-gradient-to-r from-primary to-teal-400 blur-[120px] animate-blob"
          style={{ animationDelay: '2s'}}
        ></div>
        <div 
          className="absolute bottom-[-20%] right-[-20%] h-[50%] w-[70%] rounded-full bg-gradient-to-r from-teal-400 to-primary blur-[120px] animate-blob"
          style={{ animationDelay: '4s'}}
        ></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        <header className="text-center mb-8 max-w-2xl">
            <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-xl mb-4 border border-primary/20">
                <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
                Smart Student Hub
            </h1>
            <p className="text-md text-muted-foreground mt-2">
                Your gateway to academic excellence
            </p>
        </header>

        <main className="w-full max-w-sm space-y-6">
          <div className="bg-card/60 glassmorphism rounded-xl p-6 sm:p-8 shadow-2xl border">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-center text-foreground">Welcome Back</h2>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-foreground/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="password" className="font-medium text-foreground/80">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full font-bold h-11 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </Button>
              <div className="text-center pt-2">
                 <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
              </div>
            </form>
          </div>
          
           {quote.quote && (
              <div className="bg-card/60 glassmorphism border rounded-xl p-4 text-center shadow-lg">
                <p className="text-sm text-foreground/90 italic">"{quote.quote}"</p>
                <p className="text-xs text-muted-foreground mt-2">- {quote.author}</p>
              </div>
            )}
        </main>

         <footer className="absolute bottom-4 right-4 text-muted-foreground">
           <a href="/support" aria-label="Support">
            <ShieldCheck className="h-6 w-6"/>
           </a>
        </footer>
      </div>
    </div>
  );
}
