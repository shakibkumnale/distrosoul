'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Users, BarChart, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <BarChart className="w-5 h-5" /> },
    { href: '/admin/artists', label: 'Artists', icon: <Users className="w-5 h-5" /> },
    { href: '/admin/releases', label: 'Releases', icon: <Music className="w-5 h-5" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white h-screen fixed left-0 top-0 py-6 px-4 shadow-xl">
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold text-white">Soul Distribution</h1>
        </Link>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <Link
          href="/"
          className="flex items-center px-3 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-md transition-colors"
        >
          <span className="mr-3"><LogOut className="w-5 h-5" /></span>
          <span className="font-medium">Exit Admin</span>
        </Link>
      </div>
    </div>
  );
}