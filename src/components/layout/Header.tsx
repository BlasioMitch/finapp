'use client';

import { BellIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import authService from '@/services/auth.service';
import { useUIStore } from '@/store/uiStore';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { addNotification } = useUIStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
      await logout();
      addNotification({
        type: 'success',
        message: 'Successfully logged out',
        duration: 3000
      });
      router.push('/login');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error?.message || 'Failed to logout. Please try again.',
        duration: 5000
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:border-[#1C39BB] sm:text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <BellIcon className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {user && (
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1C39BB] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {getInitials(user.name)}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
} 