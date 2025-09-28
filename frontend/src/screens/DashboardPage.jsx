import React, { useState, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, GlobeAltIcon, DocumentTextIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [essay, setEssay] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setIsLoading(true);
        const response = await manifest.from('Application').find({ 
          filter: { applicant: user.id },
          limit: 1
        });
        if (response.data && response.data.length > 0) {
          setApplication(response.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch application:', err);
        setError('Could not load your application data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchApplication();
    }
  }, [user, manifest]);

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const newApplication = await manifest.from('Application').create({ 
        essay,
        applicant: user.id,
        submissionDate: new Date().toISOString()
      });
      setApplication(newApplication);
    } catch (err) {
      console.error('Failed to submit application:', err);
      setError('Application submission failed. Please try again.');
    }
  };
  
  const StatusIndicator = ({ status }) => {
    const statusStyles = {
      'Pending': { icon: ClockIcon, color: 'text-yellow-500', bg: 'bg-yellow-100' },
      'Under Review': { icon: GlobeAltIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
      'Approved': { icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-100' },
      'Rejected': { icon: XCircleIcon, color: 'text-red-500', bg: 'bg-red-100' },
    };
    const style = statusStyles[status] || statusStyles['Pending'];
    const Icon = style.icon;
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.color}`}>
        <Icon className="w-5 h-5 mr-2" />
        {status}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <div className='flex items-center space-x-4'>
             {user.role === 'admin' && (
                <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Admin Panel
                </a>
            )}
            <button onClick={onLogout} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mission Application Status</h2>
            {isLoading ? (
              <p className="text-gray-500">Loading your application status...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : application ? (
              <div className='space-y-4'>
                <p className='text-gray-600'>Your application status is:</p>
                <StatusIndicator status={application.status} />
                <p className='text-gray-500 text-sm'>Submitted on: {new Date(application.submissionDate).toLocaleDateString()}</p>
                <div className='pt-4'>
                  <h3 class='font-semibold text-gray-700'>Your Submitted Essay:</h3>
                  <div className='mt-2 p-4 border rounded-md bg-gray-50 prose max-w-none' dangerouslySetInnerHTML={{ __html: application.essay }}></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">You have not submitted an application yet. Complete the form below to apply.</p>
                <form onSubmit={handleSubmitApplication} className='space-y-6'>
                  <div>
                     <label htmlFor="essay" className="block text-sm font-medium text-gray-700">Application Essay</label>
                     <p className='text-xs text-gray-500 mb-2'>Explain why you are the perfect candidate for the Mars mission.</p>
                     <textarea id="essay" rows="10" value={essay} onChange={(e) => setEssay(e.target.value)} required className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                  </div>
                  <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <DocumentTextIcon className="w-5 h-5 mr-2" />
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
