'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      toast.success('Logged in successfully!');
      
      // Redirect based on user role
      if (result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account/profile');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoCustomerLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const result = await login('john@example.com', 'password123');
      toast.success('Logged in successfully!');
      if (result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account/profile');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const result = await login('admin@store.com', 'Admin123');
      toast.success('Logged in successfully!');
      if (result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account/profile');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">{t('auth.login')}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account or admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-100 text-red-800 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (error) setError('');
                    }}
                    placeholder="your@email.com"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (error) setError('');
                    }}
                    placeholder="••••••••"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  {t('auth.forgot_password')}
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  t('auth.sign_in')
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.no_account')}{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                  {t('auth.sign_up')}
                </Link>
              </p>
            </div>

            {/* Demo Logins */}
            <div className="mt-6 pt-6 border-t space-y-2">
              <p className="text-xs font-semibold text-center text-muted-foreground">DEMO ACCOUNTS</p>
              <Button
                type="button"
                variant="outline"
                className="w-full text-sm"
                onClick={handleDemoCustomerLogin}
                disabled={isLoading}
              >
                Customer Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-sm"
                onClick={handleDemoAdminLogin}
                disabled={isLoading}
              >
                Admin Demo
              </Button>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><span className="font-mono font-semibold">Customer:</span> john@example.com / password123</p>
                <p><span className="font-mono font-semibold">Admin:</span> admin@store.com / Admin123</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
