'use client';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';

export default function TransactionHistory() {
  const transactions = [
    {
      id: 'TXN-001',
      date: 'March 15, 2024',
      description: 'Salary Deposit',
      amount: 5000,
      type: 'credit',
      status: 'Completed',
      account: 'ACC-001',
    },
    {
      id: 'TXN-002',
      date: 'March 14, 2024',
      description: 'Grocery Shopping',
      amount: 150.75,
      type: 'debit',
      status: 'Completed',
      account: 'ACC-002',
    },
    {
      id: 'TXN-003',
      date: 'March 13, 2024',
      description: 'Utility Bill Payment',
      amount: 200.50,
      type: 'debit',
      status: 'Completed',
      account: 'ACC-002',
    },
    {
      id: 'TXN-004',
      date: 'March 12, 2024',
      description: 'Interest Payment',
      amount: 125.00,
      type: 'credit',
      status: 'Completed',
      account: 'ACC-001',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
        <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          Sort by Date
          <ChevronUpDownIcon className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.account}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {transaction.type === 'credit' ? (
                      <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 