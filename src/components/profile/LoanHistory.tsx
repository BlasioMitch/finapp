'use client';

import { BanknotesIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function LoanHistory() {
  const loans = [
    {
      id: 'LOAN-001',
      amount: 10000,
      interestRate: '5%',
      term: '12 months',
      status: 'Active',
      startDate: 'March 1, 2024',
      endDate: 'March 1, 2025',
      monthlyPayment: 856.07,
      totalInterest: 272.84,
      remainingBalance: 8560.70,
      payments: [
        {
          date: 'March 1, 2024',
          amount: 856.07,
          principal: 814.40,
          interest: 41.67,
          status: 'Paid',
        },
        {
          date: 'April 1, 2024',
          amount: 856.07,
          principal: 817.79,
          interest: 38.28,
          status: 'Paid',
        },
        {
          date: 'May 1, 2024',
          amount: 856.07,
          principal: 821.20,
          interest: 34.87,
          status: 'Pending',
        },
      ],
    },
    {
      id: 'LOAN-002',
      amount: 5000,
      interestRate: '4%',
      term: '6 months',
      status: 'Completed',
      startDate: 'January 1, 2024',
      endDate: 'July 1, 2024',
      monthlyPayment: 843.20,
      totalInterest: 59.20,
      remainingBalance: 0,
      payments: [
        {
          date: 'January 1, 2024',
          amount: 843.20,
          principal: 826.53,
          interest: 16.67,
          status: 'Paid',
        },
        {
          date: 'February 1, 2024',
          amount: 843.20,
          principal: 829.28,
          interest: 13.92,
          status: 'Paid',
        },
        {
          date: 'March 1, 2024',
          amount: 843.20,
          principal: 832.04,
          interest: 11.16,
          status: 'Paid',
        },
        {
          date: 'April 1, 2024',
          amount: 843.20,
          principal: 834.82,
          interest: 8.38,
          status: 'Paid',
        },
        {
          date: 'May 1, 2024',
          amount: 843.20,
          principal: 837.62,
          interest: 5.58,
          status: 'Paid',
        },
        {
          date: 'June 1, 2024',
          amount: 843.20,
          principal: 840.44,
          interest: 2.76,
          status: 'Paid',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Loan History</h2>

      <Accordion type="single" collapsible className="space-y-4">
        {loans.map((loan) => (
          <AccordionItem
            key={loan.id}
            value={loan.id}
            className="bg-gray-50 rounded-lg px-6"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center space-x-4">
                  <BanknotesIcon className="h-6 w-6 text-gray-500" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Loan #{loan.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {loan.amount.toLocaleString()} at {loan.interestRate} interest
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      loan.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {loan.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {loan.remainingBalance > 0
                      ? `Remaining: $${loan.remainingBalance.toLocaleString()}`
                      : 'Fully Paid'}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${loan.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Payment</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${loan.monthlyPayment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Term</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {loan.term}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Interest</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${loan.totalInterest.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Payment History
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Principal
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interest
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loan.payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.principal.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${payment.interest.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {payment.status === 'Paid' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                  Paid
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 