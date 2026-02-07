import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketTicker from './components/MarketTicker';
import Dashboard from './components/Dashboard';
import CropLibrary from './components/CropLibrary';
import Forum from './components/Forum';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import CropDetail from './components/CropDetail';
import PostDetail from './components/PostDetail';
import GovernmentSchemes from './components/GovernmentSchemes';
import GovernmentSchemeDetail from './components/GovernmentSchemeDetail';
import ResearchUpdates from './components/ResearchUpdates';
import ResearchDetail from './components/ResearchDetail';
import PolicyInformation from './components/PolicyInformation';
import PolicyDetail from './components/PolicyDetail';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import './i18n';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#059669',
                  secondary: '#f59e0b',
                },
              },
            }}
          />
          <Navbar />
          <MarketTicker />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crops" element={<CropLibrary />} />
            <Route path="/crops/:id" element={<CropDetail />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<PostDetail />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />
            <Route path="/schemes/:id" element={<GovernmentSchemeDetail />} />
            <Route path="/research" element={<ResearchUpdates />} />
            <Route path="/research/:id" element={<ResearchDetail />} />
            <Route path="/policies" element={<PolicyInformation />} />
            <Route path="/policies/:id" element={<PolicyDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
