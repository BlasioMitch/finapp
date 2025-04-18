'use client';

import Profile from '@/components/profile/Profile';

export default function ProfilePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage your personal information, account details, and transaction history.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Profile />
      </div>
    </div>
  );
} 