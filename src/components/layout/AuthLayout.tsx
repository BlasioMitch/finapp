'use client';

import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = document.cookie.includes('isAuthenticated=true');
      setIsAuthenticated(isAuth);
    };

    checkAuth();
    // Check auth state when pathname changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [pathname]);

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return isAuthenticated ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <>{children}</>
  );
} 