'use client';

import { UsersIcon, UserGroupIcon, UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    change: '+12.5%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Active Users',
    value: '987',
    change: '+8.2%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
  {
    name: 'New Users (30d)',
    value: '156',
    change: '+23.1%',
    changeType: 'positive',
    icon: UserPlusIcon,
  },
  {
    name: 'Inactive Users',
    value: '247',
    change: '-4.3%',
    changeType: 'negative',
    icon: UserMinusIcon,
  },
];

export default function UserStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-[#1C39BB]" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 