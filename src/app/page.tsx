

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import type { AppUser } from '@/lib/types';
import { MOCK_USERS } from '@/lib/data';

const motivationalQuote = {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Subtle decorative blur elements */}
      <div 
        className="absolute top-[-10%] right-[-10%] h-[40%] w-[60%] rounded-full bg-blue-500/20 blur-[120px] animate-blob opacity-15"
        style={{ animationDelay: '2s'}}
      ></div>
      <div 
        className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[60%] rounded-full bg-teal-500/20 blur-[120px] animate-blob opacity-15"
        style={{ animationDelay: '4s'}}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        {/* Header Section */}
        <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-xl mb-4 border border-white/20">
                <GraduationCap className="h-8 w-8 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
                Smart Student Hub
            </h1>
            <p className="text-md text-white/70 mt-3 italic">
               "{motivationalQuote.quote}"
            </p>
        </header>

        {/* Login Form Card (Glassmorphism) */}
        <main className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">Login to Your Account</h2>
              <p className="text-white/60 mt-1">Welcome back! Please enter your details.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-white/80">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-base font-semibold"
                />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="password" className="font-semibold text-white/80">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-base font-semibold"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full font-bold h-12 text-base bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </Button>
              <div className="text-center pt-2">
                 <a href="#" className="text-sm font-medium text-blue-400 hover:underline">Forgot Password?</a>
              </div>
            </form>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="absolute bottom-6 text-center text-white/40 text-xs w-full px-4">
           <p>© 2024 Smart Student Hub. Empowering education through technology.</p>
        </footer>
      </div>
    </div>
  );
}
