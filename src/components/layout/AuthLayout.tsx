'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import api from '@/lib/axios';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, token, login } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initializeAuth = async () => {
      const cookieToken = Cookies.get('token');
      console.log('Initializing auth:', { 
        isAuthenticated, 
        pathname, 
        user,
        hasToken: !!token,
        hasCookieToken: !!cookieToken,
        isClient,
        isInitialized
      });

      // If we have a cookie token but no store token, try to get the user profile
      if (cookieToken && !isAuthenticated) {
        try {
          console.log('Fetching profile with cookie token');
          const response = await api.get('/profile');
          const user = response.data;
          console.log('Profile fetched successfully:', user);
          login(user, cookieToken, ''); // We don't have the refresh token here
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          Cookies.remove('token', { path: '/' });
        }
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, [isClient, isAuthenticated, token, login]);

  useEffect(() => {
    if (!isClient || !isInitialized) {
      console.log('Skipping routing - not ready:', { isClient, isInitialized });
      return;
    }

    const cookieToken = Cookies.get('token');
    console.log('Checking routing:', { 
      pathname,
      isAuthenticated,
      hasCookieToken: !!cookieToken,
      user
    });
    
    // If not authenticated and trying to access protected routes
    if (!isAuthenticated && !cookieToken && pathname !== '/login') {
      console.log('Redirecting to login - not authenticated');
      router.push('/login');
      return;
    }
    // If authenticated and trying to access login page
    if ((isAuthenticated || cookieToken) && pathname === '/login') {
      console.log('Redirecting to dashboard - already authenticated');
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, pathname, router, isClient, isInitialized]);

  // Don't render anything until we're on the client and auth is initialized
  if (!isClient || !isInitialized) {
    console.log('Not rendering - waiting for initialization:', { isClient, isInitialized });
    return null;
  }

  // For login page, just render the children
  if (pathname === '/login') {
    console.log('Rendering login page');
    return <>{children}</>;
  }

  // For protected routes, check authentication
  if (!isAuthenticated && !Cookies.get('token')) {
    console.log('Not authenticated, not rendering protected route');
    return null;
  }

  // For authenticated users, render the children
  console.log('Rendering protected route for authenticated user');
  return <>{children}</>;
} 