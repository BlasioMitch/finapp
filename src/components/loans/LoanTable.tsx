'use client';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import PaymentHistory from './PaymentHistory';

export interface Loan {
  id: string;
  borrower: {
    id: string;
    name: string;
    email: string;
  };
  amount: number;
  interestRate: number;
  term: number;
  status: 'active' | 'paid' | 'defaulted';
  startDate: string;
  endDate: string;
  monthlyPayment: number;
  totalInterest: number;
  remainingBalance: number;
}

const sampleLoans: Loan[] = [
  {
    id: '1',
    borrower: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    amount: 50000,
    interestRate: 5.5,
    term: 36,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2027-01-15',
    monthlyPayment: 1510.16,
    totalInterest: 4365.76,
    remainingBalance: 50000,
  },
  {
    id: '2',
    borrower: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    amount: 75000,
    interestRate: 6.0,
    term: 60,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2029-02-01',
    monthlyPayment: 1449.99,
    totalInterest: 11999.40,
    remainingBalance: 75000,
  },
];

export default function LoanTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);

  const handleRowClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsPaymentHistoryOpen(true);
  };

  const columns: ColumnDef<Loan>[] = [
    {
      accessorKey: 'borrower.name',
      header: 'Borrower',
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#1C39BB] flex items-center justify-center text-white text-sm font-semibold mr-2">
            {row.original.borrower.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.original.borrower.name}</div>
            <div className="text-sm text-gray-500">{row.original.borrower.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Loan Amount',
      cell: ({ row }) => (
        <div className="text-gray-900">
          ${row.original.amount.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'interestRate',
      header: 'Interest Rate',
      cell: ({ row }) => (
        <div className="text-gray-900">
          {row.original.interestRate}%
        </div>
      ),
    },
    {
      accessorKey: 'term',
      header: 'Term (months)',
    },
    {
      accessorKey: 'monthlyPayment',
      header: 'Monthly Payment',
      cell: ({ row }) => (
        <div className="text-gray-900">
          ${row.original.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: 'remainingBalance',
      header: 'Remaining Balance',
      cell: ({ row }) => (
        <div className="text-gray-900">
          ${row.original.remainingBalance.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.original.status === 'active'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'paid'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
  ];

  const table = useReactTable({
    data: sampleLoans,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search loans..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:border-[#1C39BB]"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const allVisible = table.getAllColumns().every((col) => col.getIsVisible());
                table.getAllColumns().forEach((col) => {
                  if (col.id !== 'borrower.name') {
                    col.toggleVisibility(!allVisible);
                  }
                });
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {table.getAllColumns().every((col) => col.getIsVisible()) ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center cursor-pointer ${
                          header.column.getCanSort() ? 'hover:bg-gray-100' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {{
                              asc: <ChevronUpIcon className="h-4 w-4" />,
                              desc: <ChevronDownIcon className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronUpDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </span>{' '}
              of{' '}
              <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>{' '}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {selectedLoan && (
        <PaymentHistory
          isOpen={isPaymentHistoryOpen}
          onClose={() => setIsPaymentHistoryOpen(false)}
          loan={selectedLoan}
        />
      )}
    </div>
  );
} 