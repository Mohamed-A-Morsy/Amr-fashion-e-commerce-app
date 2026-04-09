'use client';

import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Save, Bell, Lock, Globe, Zap } from 'lucide-react';

function SettingsContent() {
  const [storeName, setStoreName] = useState('Premium Fashion Store');
  const [storeEmail, setStoreEmail] = useState('support@premiumfashion.com');
  const [supportPhone, setSupportPhone] = useState('+1 (555) 000-0000');
  const [storeAddress, setStoreAddress] = useState('123 Fashion Street, New York, NY 10001');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your store settings and preferences</p>
      </div>

      {/* Store Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Store Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Store Name</label>
            <Input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Your Store Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Support Email</label>
            <Input
              type="email"
              value={storeEmail}
              onChange={(e) => setStoreEmail(e.target.value)}
              placeholder="support@yourstore.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Support Phone</label>
            <Input
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Store Address</label>
            <textarea
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              placeholder="Your store address"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={orderNotifications}
              onChange={(e) => setOrderNotifications(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium">Order Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified for new orders and updates</p>
            </div>
          </label>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Security</h3>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Admin Password
          </Button>
          <Button variant="outline" className="w-full">
            View Security Logs
          </Button>
          <Button variant="destructive" className="w-full">
            Reset Store Data
          </Button>
        </div>
      </Card>

      {/* Performance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Performance</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Database Optimization</p>
              <p className="text-sm text-muted-foreground">Last optimized 5 days ago</p>
            </div>
            <Button variant="outline" size="sm">
              Optimize Now
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Cache Clearing</p>
              <p className="text-sm text-muted-foreground">Clear all cached data</p>
            </div>
            <Button variant="outline" size="sm">
              Clear Cache
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <SettingsContent />
    </AdminLayout>
  );
}
