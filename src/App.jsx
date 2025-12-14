import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/memberC/Login.jsx';
import Dashboard from './components/memberC/Dashboard.jsx';
import Navigation from './components/memberC/Navigation.jsx';
import MessageScanner from './components/memberA/MessageScanner.jsx';
import ScanHistory from './components/memberA/ScanHistory.jsx';
import DatasetManager from './components/memberB/DatasetManager.jsx';
import DataQuality from './components/memberB/DataQuality.jsx';
import LogsViewer from './components/memberC/LogsViewer.jsx';
import ReportGenerator from './components/memberC/ReportGenerator.jsx';
import UserManagement from './components/memberC/UserManagement.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation userRole={userRole} onLogout={handleLogout} />

      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/scanner" element={<MessageScanner />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/dataset" element={<DatasetManager />} />
          <Route path="/data-quality" element={<DataQuality />} />
          <Route path="/logs" element={<LogsViewer />} />
          <Route path="/reports" element={<ReportGenerator />} />
          {userRole === 'admin' && (
            <Route path="/users" element={<UserManagement />} />
          )}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
