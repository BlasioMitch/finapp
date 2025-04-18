'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Loan } from './LoanTable';

interface LoanDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan;
  mode: 'view' | 'edit';
  onSubmit?: (updatedLoan: Loan) => void;
}

export default function LoanDetails({
  isOpen,
  onClose,
  loan,
  mode,
  onSubmit,
}: LoanDetailsProps) {
  const [formData, setFormData] = useState<Loan>(loan);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Loan) => ({
      ...prev,
      [name]: name === 'amount' || name === 'interestRate' || name === 'term' || name === 'monthlyPayment' || name === 'totalInterest' || name === 'remainingBalance'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              {mode === 'view' ? 'Loan Details' : 'Edit Loan'}
            </h2>
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-6">
          <div className="space-y-6">
            {/* Borrower Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Borrower Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1 text-sm text-gray-900">{loan.borrower.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 text-sm text-gray-900">{loan.borrower.email}</div>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Loan Details</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Amount
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
                      onChange={handleInputChange}
                      disabled={mode === 'view'}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="interestRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interest Rate
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="interestRate"
                      id="interestRate"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      disabled={mode === 'view'}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="term"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Term (months)
                  </label>
                  <input
                    type="number"
                    name="term"
                    id="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="active">Active</option>
                    <option value="paid">Paid</option>
                    <option value="defaulted">Defaulted</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="monthlyPayment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Monthly Payment
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="monthlyPayment"
                      id="monthlyPayment"
                      value={formData.monthlyPayment}
                      onChange={handleInputChange}
                      disabled={mode === 'view'}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="remainingBalance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Remaining Balance
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="remainingBalance"
                      id="remainingBalance"
                      value={formData.remainingBalance}
                      onChange={handleInputChange}
                      disabled={mode === 'view'}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <div className="mt-1 text-sm text-gray-900">{loan.startDate}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <div className="mt-1 text-sm text-gray-900">{loan.endDate}</div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
              onClick={onClose}
            >
              Close
            </button>
            {mode === 'edit' && (
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 