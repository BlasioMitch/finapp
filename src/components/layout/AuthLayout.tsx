'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If not authenticated and trying to access protected routes
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
      return;
    }
    // If authenticated and trying to access login page
    if (isAuthenticated && pathname === '/login') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, pathname, router]);

  // For login page, just render the children
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // For protected routes, check authentication
  if (!isAuthenticated) {
    return null;
  }

  // For authenticated users, render the children (which should already be wrapped in AdminLayout)
  return <>{children}</>;
} 