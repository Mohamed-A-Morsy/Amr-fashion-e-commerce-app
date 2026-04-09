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
import { User, Settings, Heart, Package } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoggedIn, updateProfile, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Please log in</h2>
            <p className="mt-2 text-muted-foreground">You need to be logged in to access this page</p>
            <Link href="/login" className="block mt-6">
              <Button>{t('nav.login')}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateProfile(formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-8 border-b">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold">{t('account.profile')}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div>
              <Card className="p-4">
                <nav className="space-y-2">
                  <Link href="/account/profile">
                    <div className="flex items-center gap-3 rounded-lg bg-primary p-3 text-primary-foreground">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-semibold">{t('account.profile')}</span>
                    </div>
                  </Link>
                  <Link href="/account/orders">
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      <Package className="h-5 w-5" />
                      <span className="text-sm">{t('account.orders')}</span>
                    </div>
                  </Link>
                  <Link href="/account/wishlist">
                    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">{t('account.wishlist')}</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-sm text-left">{t('nav.logout')}</span>
                  </button>
                </nav>
              </Card>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">My Information</h2>
                  <Button
                    variant={isEditing ? 'default' : 'outline'}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isLoading}
                  >
                    {isEditing ? 'Cancel' : t('button.edit')}
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    {isEditing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-muted-foreground">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">{t('auth.email')}</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-muted-foreground">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    {isEditing ? (
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-muted-foreground">{user.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Member Since</label>
                    <p className="mt-1 text-muted-foreground">
                      {user.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? 'Saving...' : t('button.save')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      {t('button.cancel')}
                    </Button>
                  </div>
                )}
              </Card>

              {/* Change Password */}
              <Card className="mt-6 p-6">
                <h2 className="text-lg font-bold">{t('account.change_password')}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  For security reasons, please use a strong password
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <Button>{t('button.save')}</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
