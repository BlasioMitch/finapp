'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LoanApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: LoanApplication) => void;
}

type LoanApplication = {
  amount: number;
  term: number;
  purpose: string;
  employmentStatus: string;
  annualIncome: number;
  monthlyExpenses: number;
  creditScore: number;
};

const initialFormData: LoanApplication = {
  amount: 0,
  term: 12,
  purpose: '',
  employmentStatus: '',
  annualIncome: 0,
  monthlyExpenses: 0,
  creditScore: 0,
};

export default function LoanApplicationForm({
  isOpen,
  onClose,
  onSubmit,
}: LoanApplicationFormProps) {
  const [formData, setFormData] = useState<LoanApplication>(initialFormData);
  const [errors, setErrors] = useState<Partial<LoanApplication>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoanApplication> = {};

    if (formData.amount <= 0) {
      newErrors.amount = 'Loan amount must be greater than 0';
    }
    if (formData.term < 12 || formData.term > 60) {
      newErrors.term = 'Loan term must be between 12 and 60 months';
    }
    if (!formData.purpose) {
      newErrors.purpose = 'Loan purpose is required';
    }
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Employment status is required';
    }
    if (formData.annualIncome <= 0) {
      newErrors.annualIncome = 'Annual income must be greater than 0';
    }
    if (formData.monthlyExpenses <= 0) {
      newErrors.monthlyExpenses = 'Monthly expenses must be greater than 0';
    }
    if (formData.creditScore < 300 || formData.creditScore > 850) {
      newErrors.creditScore = 'Credit score must be between 300 and 850';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'term' || name === 'annualIncome' || name === 'monthlyExpenses' || name === 'creditScore'
        ? Number(value)
        : value,
    }));
  };

  const calculateMonthlyPayment = () => {
    if (formData.amount <= 0 || formData.term <= 0) return 0;
    
    // Simple interest calculation (in a real app, you'd use a more complex formula)
    const interestRate = 0.05; // 5% annual interest rate
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (formData.amount * monthlyRate * Math.pow(1 + monthlyRate, formData.term)) / (Math.pow(1 + monthlyRate, formData.term) - 1);
    
    return monthlyPayment;
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
              Loan Application
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
                  onChange={handleChange}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="term"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Term (months)
              </label>
              <input
                type="number"
                name="term"
                id="term"
                min="12"
                max="60"
                value={formData.term}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              />
              {errors.term && (
                <p className="mt-1 text-sm text-red-600">{errors.term}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-gray-700"
              >
                Loan Purpose
              </label>
              <select
                name="purpose"
                id="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              >
                <option value="">Select a purpose</option>
                <option value="home">Home Purchase</option>
                <option value="car">Car Purchase</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="debt">Debt Consolidation</option>
                <option value="other">Other</option>
              </select>
              {errors.purpose && (
                <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="employmentStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Employment Status
              </label>
              <select
                name="employmentStatus"
                id="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              >
                <option value="">Select employment status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
              {errors.employmentStatus && (
                <p className="mt-1 text-sm text-red-600">{errors.employmentStatus}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="annualIncome"
                className="block text-sm font-medium text-gray-700"
              >
                Annual Income
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="annualIncome"
                  id="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                />
              </div>
              {errors.annualIncome && (
                <p className="mt-1 text-sm text-red-600">{errors.annualIncome}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="monthlyExpenses"
                className="block text-sm font-medium text-gray-700"
              >
                Monthly Expenses
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="monthlyExpenses"
                  id="monthlyExpenses"
                  value={formData.monthlyExpenses}
                  onChange={handleChange}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
                />
              </div>
              {errors.monthlyExpenses && (
                <p className="mt-1 text-sm text-red-600">{errors.monthlyExpenses}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="creditScore"
                className="block text-sm font-medium text-gray-700"
              >
                Credit Score
              </label>
              <input
                type="number"
                name="creditScore"
                id="creditScore"
                min="300"
                max="850"
                value={formData.creditScore}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              />
              {errors.creditScore && (
                <p className="mt-1 text-sm text-red-600">{errors.creditScore}</p>
              )}
            </div>

            {/* Monthly Payment Preview */}
            {formData.amount > 0 && formData.term > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Estimated Monthly Payment</h3>
                <p className="mt-1 text-2xl font-semibold text-[#1C39BB]">
                  ${calculateMonthlyPayment().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Based on a 5% annual interest rate
                </p>
              </div>
            )}
          </div>
        </form>

        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
              onClick={handleSubmit}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 