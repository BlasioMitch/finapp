'use client';

import { PencilIcon } from '@heroicons/react/24/outline';

export default function UserInfo() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: 'January 1, 1990',
    idNumber: 'ID-123456789',
    membershipDate: 'January 15, 2023',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <PencilIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-500">Full Name</label>
          <p className="mt-1 text-sm text-gray-900">{user.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Email Address</label>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Phone Number</label>
          <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Address</label>
          <p className="mt-1 text-sm text-gray-900">{user.address}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
          <p className="mt-1 text-sm text-gray-900">{user.dateOfBirth}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">ID Number</label>
          <p className="mt-1 text-sm text-gray-900">{user.idNumber}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Membership Date</label>
          <p className="mt-1 text-sm text-gray-900">{user.membershipDate}</p>
        </div>
      </div>
    </div>
  );
} 