import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QnsHeader from '../components/QnsHeader';

const QNSProfileLayout = () => {
  return (
    <div className="grid grid-cols-[280px_1fr] h-screen bg-background">
      <Sidebar />
      <main className="overflow-y-auto">
        <QnsHeader />
        <div className="max-w-5xl mx-auto px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default QNSProfileLayout;