'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAdminAuth } from '@/lib/context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { adminLogin } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await adminLogin(email, password);
      toast.success('Admin login successful');
      router.push('/admin');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await adminLogin('admin@store.com', 'Admin123');
      toast.success('Admin login successful');
      router.push('/admin');
    } catch (err) {
      toast.error('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30 p-4">
      <Card className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Manage your store</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-100 text-red-800 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@store.com"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Demo Login */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-center text-muted-foreground mb-3">Demo Credentials</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Login with Demo Account
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Email: <span className="font-mono font-semibold">admin@store.com</span>
            <br />
            Password: <span className="font-mono font-semibold">Admin123</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center">
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to Store
          </Link>
        </div>
      </Card>
    </div>
  );
}
