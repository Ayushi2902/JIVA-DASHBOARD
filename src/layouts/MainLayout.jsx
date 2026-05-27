import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function MainLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fa] dark:bg-[#080d14]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <div key={pathname}>
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
      </div>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: { borderRadius: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' },
        }}
      />
    </div>
  );
}
