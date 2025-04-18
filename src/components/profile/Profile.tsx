'use client';

import { useState } from 'react';
import { UserCircleIcon, CreditCardIcon, ClockIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import UserInfo from './UserInfo';
import AccountStatus from './AccountStatus';
import TransactionHistory from './TransactionHistory';
import LoanHistory from './LoanHistory';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'info' | 'account' | 'transactions' | 'loans'>('info');

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Profile Header */}
      <div className="bg-[#1C39BB] px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
            <UserCircleIcon className="h-16 w-16 text-[#1C39BB]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">John Doe</h1>
            <p className="text-white/80">Member since January 2023</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'info'
                ? 'border-b-2 border-[#1C39BB] text-[#1C39BB]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserCircleIcon className="h-5 w-5 mr-2" />
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'account'
                ? 'border-b-2 border-[#1C39BB] text-[#1C39BB]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Account Status
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'transactions'
                ? 'border-b-2 border-[#1C39BB] text-[#1C39BB]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ClockIcon className="h-5 w-5 mr-2" />
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'loans'
                ? 'border-b-2 border-[#1C39BB] text-[#1C39BB]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BanknotesIcon className="h-5 w-5 mr-2" />
            Loan History
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'info' && <UserInfo />}
        {activeTab === 'account' && <AccountStatus />}
        {activeTab === 'transactions' && <TransactionHistory />}
        {activeTab === 'loans' && <LoanHistory />}
      </div>
    </div>
  );
} 