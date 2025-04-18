'use client';

import { useState } from 'react';
import TransactionTable from '@/components/transactions/TransactionTable';
import CreateTransaction from '@/components/transactions/CreateTransaction';
import SlidingPanel from '@/components/common/SlidingPanel';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/components/transactions/TransactionTable';

export default function TransactionsPage() {
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleCreateTransaction = (newTransaction: Omit<Transaction, 'id' | 'status' | 'reference'>) => {
    // In a real app, this would be an API call
    const transaction: Transaction = {
      ...newTransaction,
      id: `TXN${Date.now()}`,
      status: 'completed',
      reference: `REF${Date.now()}`,
    };
    setTransactions([transaction, ...transactions]);
    setIsCreatePanelOpen(false);
  };

  // Calculate transaction statistics
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = totalTransactions ? totalAmount / totalTransactions : 0;

  // Group transactions by type
  const transactionsByType = transactions.reduce((acc, transaction) => {
    const type = transaction.type;
    if (!acc[type]) {
      acc[type] = {
        count: 0,
        total: 0,
        label: type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      };
    }
    acc[type].count++;
    acc[type].total += transaction.amount;
    return acc;
  }, {} as Record<string, { count: number; total: number; label: string }>);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all transactions in the system including loan payments, membership fees, and account transactions.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-4">
        {/* Transaction Statistics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Total Transactions */}
          <div className="overflow-hidden rounded-lg bg-white px-3 py-3 shadow">
            <dt className="truncate text-xs font-medium text-gray-500">Total Transactions</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {totalTransactions}
            </dd>
          </div>

          {/* Total Amount */}
          <div className="overflow-hidden rounded-lg bg-white px-3 py-3 shadow">
            <dt className="truncate text-xs font-medium text-gray-500">Total Amount</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              ${totalAmount.toLocaleString()}
            </dd>
          </div>

          {/* Average Transaction */}
          <div className="overflow-hidden rounded-lg bg-white px-3 py-3 shadow">
            <dt className="truncate text-xs font-medium text-gray-500">Average</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              ${averageTransaction.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </dd>
          </div>

          {/* Transaction Types Count */}
          <div className="overflow-hidden rounded-lg bg-white px-3 py-3 shadow">
            <dt className="truncate text-xs font-medium text-gray-500">Types</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {Object.keys(transactionsByType).length}
            </dd>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mt-8">
        <TransactionTable 
          transactions={transactions} 
          onNewTransaction={() => setIsCreatePanelOpen(true)} 
        />
      </div>

      {/* Create Transaction Panel */}
      <SlidingPanel
        isOpen={isCreatePanelOpen}
        onClose={() => setIsCreatePanelOpen(false)}
        title="Create New Transaction"
      >
        <CreateTransaction 
          onSubmit={handleCreateTransaction}
          onClose={() => setIsCreatePanelOpen(false)}
        />
      </SlidingPanel>
    </div>
  );
} 