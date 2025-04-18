'use client';

import { useState } from 'react';
import AccountStats from '@/components/accounts/AccountStats';
import AccountTable from '@/components/accounts/AccountTable';
import AddAccountForm from '@/components/accounts/AddAccountForm';

export default function AccountsPage() {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

  return (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Accounts Management</h1>
      </div>

      <AccountStats />

      <div className="flex-1 h-[calc(100vh-16rem)]">
        <AccountTable onNewAccount={() => setIsAddAccountOpen(true)} />
      </div>

      <AddAccountForm isOpen={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />
    </div>
  );
} 