'use client';

import { useState } from 'react';
import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/outline';
import LoanTable from '@/components/loans/LoanTable';
import CreateLoan from '@/components/loans/CreateLoan';
import {
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Sample data - in a real app, this would come from an API
const loanStats = {
  totalLoans: 89,
  totalAmount: 12500000,
  averageInterestRate: 5.8,
  activeLoans: 75,
  overdueLoans: 3,
  totalMonthlyPayments: 250000,
  loanDistribution: {
    'Personal': 35,
    'Business': 25,
    'Mortgage': 20,
    'Auto': 15,
    'Education': 5
  }
};

export default function LoansPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Loan Management</h1>
      </div>

      {/* Compact Statistics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Loans Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <BanknotesIcon className="h-6 w-6 text-[#1C39BB]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Loans</p>
              <p className="text-lg font-semibold text-gray-900">{loanStats.totalLoans}</p>
            </div>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="text-lg font-semibold text-gray-900">
                ${(loanStats.totalAmount / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        {/* Average Interest Rate Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Interest Rate</p>
              <p className="text-lg font-semibold text-gray-900">{loanStats.averageInterestRate}%</p>
            </div>
          </div>
        </div>

        {/* Overdue Loans Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-red-100">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue Loans</p>
              <p className="text-lg font-semibold text-gray-900">{loanStats.overdueLoans}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Distribution Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Distribution by Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {Object.entries(loanStats.loanDistribution).map(([type, count]) => (
              <div key={type} className="flex items-center">
                <div className="w-24 text-sm text-gray-500">{type}</div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1C39BB] rounded-full"
                      style={{ width: `${(count / 100) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-right text-sm font-medium text-gray-900">{count}%</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-[#1C39BB] flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1C39BB]">{loanStats.activeLoans}</div>
                <div className="text-sm text-gray-500">Active Loans</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Table */}
      <LoanTable />

      {/* Create Loan Modal */}
      <CreateLoan
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
} 