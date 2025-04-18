'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  joinDate: string;
};

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  mode: 'view' | 'edit';
  onSubmit: (user: User) => void;
}

export default function UserForm({
  isOpen,
  onClose,
  user,
  mode,
  onSubmit,
}: UserFormProps) {
  const [formData, setFormData] = useState<User>(
    user || {
      id: '',
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      lastLogin: '',
      joinDate: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              {mode === 'view' ? 'User Details' : 'Edit User'}
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
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
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1C39BB] focus:ring-[#1C39BB] sm:text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {mode === 'view' && (
              <>
                <div>
                  <label
                    htmlFor="lastLogin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Login
                  </label>
                  <input
                    type="text"
                    name="lastLogin"
                    id="lastLogin"
                    value={formData.lastLogin}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="joinDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Join Date
                  </label>
                  <input
                    type="text"
                    name="joinDate"
                    id="joinDate"
                    value={formData.joinDate}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                  />
                </div>
              </>
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
            {mode === 'edit' && (
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-[#1C39BB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#152B8E] focus:outline-none focus:ring-2 focus:ring-[#1C39BB] focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 