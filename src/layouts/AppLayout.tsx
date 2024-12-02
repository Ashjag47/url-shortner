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

      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with ❤️ by AshJag
      </div>
    </div>
  );
};

export default AppLayout;
