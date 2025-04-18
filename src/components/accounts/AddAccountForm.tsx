'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAccountForm({ isOpen, onClose }: AddAccountFormProps) {
  const [formData, setFormData] = useState({
    accountType: 'Savings',
    initialBalance: '',
    ownerId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ top: '64px' }} // Height of the header
    >
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add New Account</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              >
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Investment">Investment</option>
              </select>
            </div>

            <div>
              <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
                Initial Balance
              </label>
              <input
                type="number"
                id="initialBalance"
                name="initialBalance"
                value={formData.initialBalance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700">
                Account Owner
              </label>
              <select
                id="ownerId"
                name="ownerId"
                value={formData.ownerId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                required
              >
                <option value="">Select an owner</option>
                {/* TODO: Populate with actual users */}
                <option value="1">John Doe (Admin)</option>
                <option value="2">Jane Smith (Manager)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C39BB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1C39BB] hover:bg-[#152B8C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C39BB]"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 