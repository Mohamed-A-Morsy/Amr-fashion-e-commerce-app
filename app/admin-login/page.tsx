'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Admin login page - redirects to unified login page
 * This page is kept for backward compatibility but directs users to /login
 * where both customer and admin authentication is handled.
 */
export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified login page
    router.replace('/login');
  }, [router]);

  // Show nothing while redirecting
  return null;
}
