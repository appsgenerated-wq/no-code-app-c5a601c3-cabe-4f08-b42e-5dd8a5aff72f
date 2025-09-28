import React, { useState } from 'react';
import { UserPlusIcon, ArrowRightOnRectangleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4" style={{backgroundImage: 'url("/background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        <div className="md:w-1/2 text-center md:text-left">
          <RocketLaunchIcon className="w-16 h-16 mx-auto md:mx-0 text-indigo-400 mb-4" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Your Journey to Mars Begins Here.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Join an elite crew of pioneers, scientists, and engineers on the most ambitious mission in human history. Do you have what it takes?
          </p>
        </div>

        <div className="md:w-1/2 w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex border-b border-gray-600 mb-6">
            <button onClick={() => setIsLoginView(true)} className={`w-1/2 py-3 text-sm font-semibold transition-colors duration-300 ${isLoginView ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}>Sign In</button>
            <button onClick={() => setIsLoginView(false)} className={`w-1/2 py-3 text-sm font-semibold transition-colors duration-300 ${!isLoginView ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}>Create Account</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginView && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-transform hover:scale-105">
              {isLoginView ? <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2"/> : <UserPlusIcon className="w-5 h-5 mr-2"/>}
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
