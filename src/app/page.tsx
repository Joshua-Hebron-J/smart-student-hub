'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_USERS } from '@/lib/data';
import type { AppUser } from '@/lib/types';

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

    // Simulate network delay
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.email === email);

      if (user && password) { // In a real app, you'd check the hashed password
        setUser(user as AppUser);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.name}!`,
        });
        router.push(`/${user.role}`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      {/* Decorative blur elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-blue-500/10 p-3 rounded-2xl mb-4">
                <GraduationCap className="h-10 w-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
                Smart Student Hub
            </h1>
            <p className="text-md text-gray-400 mt-3 italic">
                "The future belongs to those who believe in the beauty of their dreams."
            </p>
        </header>

        <main className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-white">Login to Your Account</h2>
              <p className="text-gray-300 mt-1">Welcome back! Please enter your details</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white font-semibold placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-300">Password</Label>
                    <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">Forgot Password?</a>
                 </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/20 text-white font-semibold placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 h-12 text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full font-bold h-12 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300"
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

         <footer className="absolute bottom-6 text-center text-gray-500 text-sm">
            <p>© 2024 Smart Student Hub. Empowering education through technology</p>
        </footer>
      </div>
    </div>
  );
}