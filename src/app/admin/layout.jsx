// src/app/admin/layout.jsx
import { Suspense } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64"> {/* Add margin-left to account for the sidebar width */}
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <Toaster 
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
        />
      </div>
    </div>
  );
}