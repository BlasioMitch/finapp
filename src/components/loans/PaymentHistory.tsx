'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Loan } from './LoanTable';
import { useState } from 'react';

interface PaymentHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan;
}

interface PaymentFormData {
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export default function PaymentHistory({ isOpen, onClose, loan }: PaymentHistoryProps) {
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    date: new Date().toISOString().split('T')[0],
    amount: loan.monthlyPayment,
    status: 'Pending'
  });

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to record the payment
    console.log('Recording payment:', paymentForm);
    // Reset form
    setPaymentForm({
      date: new Date().toISOString().split('T')[0],
      amount: loan.monthlyPayment,
      status: 'Pending'
    });
  };

  // Sample payment history data - in a real app, this would come from an API
  const paymentHistory = [
    { date: '2024-03-01', amount: 1510.16, status: 'Paid' },
    { date: '2024-02-01', amount: 1510.16, status: 'Paid' },
    { date: '2024-01-01', amount: 1510.16, status: 'Paid' },
  ];

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
              Payment History - {loan.borrower.name}
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

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          <div className="space-y-6">
            {/* Loan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900">Loan Summary</h3>
              <dl className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Loan Amount</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${loan.amount.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Monthly Payment</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${loan.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Remaining Balance</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${loan.remainingBalance.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Next Payment Due</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleDateString()}
                  </dd>
                </div>
              </dl>

              {/* Payment Form */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Record Next Payment</h4>
                <form onSubmit={handlePaymentSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="paymentDate" className="block text-sm text-gray-700">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      id="paymentDate"
                      name="date"
                      value={paymentForm.date}
                      onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="paymentAmount" className="block text-sm text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="paymentAmount"
                        name="amount"
                        value={paymentForm.amount}
                        onChange={(e) => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) })}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="paymentStatus" className="block text-sm text-gray-700">
                      Status
                    </label>
                    <select
                      id="paymentStatus"
                      name="status"
                      value={paymentForm.status}
                      onChange={(e) => setPaymentForm({ ...paymentForm, status: e.target.value as 'Paid' | 'Pending' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
                  >
                    Record Payment
                  </button>
                </form>
              </div>
            </div>

            {/* Payment History Table */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Payment History</h3>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {paymentHistory.map((payment, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            payment.status === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 