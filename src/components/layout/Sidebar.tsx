'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo';
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Accounts', href: '/accounts', icon: CreditCardIcon },
  { name: 'Transactions', href: '/transactions', icon: DocumentTextIcon },
  { name: 'Loans', href: '/loans', icon: BanknotesIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={`fixed h-full bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Logo isCollapsed={isCollapsed} />
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#1C39BB]/10 text-[#1C39BB]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Icon className="w-6 h-6" />
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
                {isCollapsed && hoveredItem === item.name && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 