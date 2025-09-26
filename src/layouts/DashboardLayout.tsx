import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[280px_1fr] h-screen bg-background">
      <Sidebar />
      <main className="overflow-y-auto p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;