import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking session...');
        try {
          const sessionUser = await manifest.from('User').me();
          if (sessionUser) {
            setUser(sessionUser);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] User session found:', sessionUser.email);
          }
        } catch (err) {
          setUser(null);
          setCurrentScreen('landing');
          console.log('ℹ️ [APP] No active user session.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  return (
    <div className='font-sans'>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-600'}`}>
          {backendConnected ? 'Backend Connected' : 'Connection Failed'}
        </span>
      </div>

      {user && currentScreen === 'dashboard' ? (
        <DashboardPage user={user} onLogout={handleLogout} manifest={manifest} />
      ) : (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </div>
  );
}

export default App;
