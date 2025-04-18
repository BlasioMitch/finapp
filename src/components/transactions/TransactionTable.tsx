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
  PlusIcon,
} from '@heroicons/react/24/outline';

export interface Transaction {
  id: string;
  accountId: string;
  accountName: string;
  type: 'loan_payment' | 'membership_fee' | 'savings_deposit' | 'account_withdraw' | 'closure_withdraw';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    accountId: 'ACC001',
    accountName: 'John Doe',
    type: 'loan_payment',
    amount: 1500,
    date: '2024-03-15',
    status: 'completed',
    reference: 'LP-2024-001'
  },
  {
    id: '2',
    accountId: 'ACC002',
    accountName: 'Jane Smith',
    type: 'savings_deposit',
    amount: 2000,
    date: '2024-03-14',
    status: 'completed',
    reference: 'SD-2024-001'
  },
  // Add more sample transactions as needed
];

interface TransactionTableProps {
  transactions: Transaction[];
  onNewTransaction: () => void;
}

export default function TransactionTable({ transactions, onNewTransaction }: TransactionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="text-gray-900">
          {new Date(row.original.date).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: 'accountName',
      header: 'Account',
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const typeLabels = {
          loan_payment: 'Loan Payment',
          membership_fee: 'Membership Fee',
          savings_deposit: 'Savings Deposit',
          account_withdraw: 'Account Withdraw',
          closure_withdraw: 'Closure Withdraw'
        };
        return <div className="text-gray-900">{typeLabels[row.original.type]}</div>;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="text-gray-900">
          ${row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.original.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
    },
  ];

  const table = useReactTable({
    data: transactions,
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
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search transactions..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:border-[#1C39BB]"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={onNewTransaction}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Transaction
            </button>
            <button
              onClick={() => {
                const allVisible = table.getAllColumns().every((col) => col.getIsVisible());
                table.getAllColumns().forEach((col) => {
                  if (col.id !== 'accountName') {
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
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
              <tr key={row.id} className="hover:bg-gray-50">
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
    </div>
  );
} 