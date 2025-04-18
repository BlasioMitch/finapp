'use client';

import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function AccountStatus() {
  const savingsAccount = {
    id: 'ACC-001',
    type: 'Savings Account',
    balance: 50000,
    status: 'Active',
    lastTransaction: 'March 15, 2024',
    interestRate: '2.5%',
    monthlyGrowth: '+$125',
    growthType: 'positive',
    totalInterest: 1250,
    monthlyDeposits: 1000,
    withdrawalLimit: 2000,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Savings Account Status</h2>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{savingsAccount.type}</h3>
            <p className="text-sm text-gray-500">Account #{savingsAccount.id}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            {savingsAccount.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${savingsAccount.balance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{savingsAccount.interestRate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest Earned</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${savingsAccount.totalInterest.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Monthly Deposits</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${savingsAccount.monthlyDeposits.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Withdrawal Limit</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${savingsAccount.withdrawalLimit.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Growth</p>
              <div className="flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-lg font-medium text-green-600">
                  {savingsAccount.monthlyGrowth}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Last Transaction: {savingsAccount.lastTransaction}
          </p>
        </div>
      </div>
    </div>
  );
} 