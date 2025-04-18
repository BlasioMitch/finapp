'use client';

import { useState } from 'react';
import UserStats from '@/components/users/UserStats';
import UserTable from '@/components/users/UserTable';
import AddUserForm from '@/components/users/AddUserForm';

export default function UsersPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
      </div>

      <UserStats />

      <div className="flex-1 h-[calc(100vh-16rem)]">
        <UserTable onNewUser={() => setIsAddUserOpen(true)} />
      </div>

      <AddUserForm isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
    </div>
  );
} 