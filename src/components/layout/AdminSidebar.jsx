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
    <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 py-6 px-4">
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold">Soul Distribution</h1>
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
                  ? 'bg-purple-900 text-white'
                  : 'text-gray-300 hover:bg-purple-800 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <Link
          href="/"
          className="flex items-center px-3 py-3 text-gray-300 hover:bg-purple-800 hover:text-white rounded-md transition-colors"
        >
          <span className="mr-3"><LogOut className="w-5 h-5" /></span>
          <span>Exit Admin</span>
        </Link>
      </div>
    </div>
  );
}