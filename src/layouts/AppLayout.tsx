import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-w-full">
      <main className="min-h-screen px-7">
        <Header />
        <Outlet />
      </main>

      {/* Footer */}
      <div className="p-6 text-center bg-gray-900 text-white mt-10 rounded-t-lg shadow-lg">
        <p className="text-sm sm:text-base">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <strong>AshJag</strong>
        </p>
      </div>
    </div>
  );
};

export default AppLayout;
