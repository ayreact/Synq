import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import UserOverview from './pages/dashboard/UserOverview';
import SocialActivity from './pages/dashboard/SocialActivity';
import SocialProfile from './pages/dashboard/SocialProfile';
import SocialPostDetail from './pages/dashboard/SocialPostDetail';
import Bridge from './pages/dashboard/Bridge';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import QNSProfileLayout from './layouts/QNSProfileLayout';
import QNSProfile from './pages/qns/QNSProfile';
import QNSRecords from './pages/qns/QNSRecords';
import QNSOwnership from './pages/qns/QNSOwnership';
import QNSSubnames from './pages/qns/QNSSubnames';
import NameSearch from './pages/qns/NameSearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<UserOverview />} />
        <Route path="social" element={<SocialActivity />} />
        <Route path="profile" element={<SocialProfile />} />
        <Route path="post/:postId" element={<SocialPostDetail />} />
        <Route path="bridge" element={<Bridge />} />
        <Route path="namesearch" element={<NameSearch />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/qns" element={<QNSProfileLayout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<QNSProfile />} />
        <Route path="namesearch" element={<NameSearch />} />
        <Route path="records" element={<QNSRecords />} />
        <Route path="ownership" element={<QNSOwnership />} />
        <Route path="subnames" element={<QNSSubnames />} />
      </Route>
      
    </Routes>
  );
}

export default App;
