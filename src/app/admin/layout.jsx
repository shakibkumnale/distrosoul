'use client';

// src/app/admin/layout.jsx
import { Suspense } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-32"> {/* Increased margin to match sidebar width */}
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <Toaster />
      </div>
    </div>
  );
}