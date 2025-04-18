'use client';

import { useState } from 'react';
import { Transaction } from './TransactionTable';

interface CreateTransactionProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'status' | 'reference'>) => void;
  onClose: () => void;
}

// Sample accounts data - in a real app, this would come from an API
const sampleAccounts = [
  { id: 'ACC001', name: 'John Doe', balance: 5000 },
  { id: 'ACC002', name: 'Jane Smith', balance: 7500 },
  { id: 'ACC003', name: 'Bob Johnson', balance: 3000 },
];

export default function CreateTransaction({ onSubmit, onClose }: CreateTransactionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<typeof sampleAccounts[0] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    type: 'savings_deposit' as Transaction['type'],
    amount: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const filteredAccounts = sampleAccounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccountSelect = (account: typeof sampleAccounts[0]) => {
    setSelectedAccount(account);
    setSearchQuery(account.name); // Show the selected account name in the input
    setShowDropdown(false); // Close the dropdown
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
    if (!e.target.value) {
      setSelectedAccount(null); // Clear selection if search is empty
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    onSubmit({
      accountId: selectedAccount.id,
      accountName: selectedAccount.name,
      ...formData,
    });

    // Reset form
    setSelectedAccount(null);
    setSearchQuery('');
    setFormData({
      type: 'savings_deposit',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Account Search */}
      <div>
        <label htmlFor="accountSearch" className="block text-sm font-medium text-gray-700">
          Search Account
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="accountSearch"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
            placeholder="Search by name or account ID"
          />
        </div>
        {showDropdown && searchQuery && (
          <div className="mt-1 max-h-40 overflow-auto rounded-md border border-gray-200 bg-white">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className={`p-2 cursor-pointer hover:bg-gray-50 ${
                  selectedAccount?.id === account.id ? 'bg-[#1C39BB]/10' : ''
                }`}
                onClick={() => handleAccountSelect(account)}
              >
                <div className="font-medium">{account.name}</div>
                <div className="text-sm text-gray-500">
                  ID: {account.id} | Balance: ${account.balance.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Transaction Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Transaction['type'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
        >
          <option value="loan_payment">Loan Payment</option>
          <option value="membership_fee">Membership Fee</option>
          <option value="savings_deposit">Savings Deposit</option>
          <option value="account_withdraw">Account Withdraw</option>
          <option value="closure_withdraw">Closure Withdraw</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
          />
        </div>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
        />
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          disabled={!selectedAccount}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
        >
          Create Transaction
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
} 