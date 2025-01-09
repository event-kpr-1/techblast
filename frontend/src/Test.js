import React, { createContext } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import HomePage from './HomePage';
import IDprintPage from './IDprint/IDprintPage';
import QRscan from './IDprint/QRscan';
import AttendanceEvent from './Register/AttendanceEvent';
import RegisterForm from './Register/RegisterForm';
import Test from './Test.js';
import { baseURL } from './constant/url';
import techblast2024 from './images/techblast2024.png'

export const EventContext = createContext();

const MainApp = () => {
  const { evid } = useParams();

  const { data: eventDetail, isLoading, error } = useQuery({
    queryKey: ['eventDetails'],
    queryFn: async () => {
      if (process.env.NODE_ENV !== 'production' && evid === 'test') {
        return null;
      }
      try {
        const response = await fetch(`${baseURL}/api/event/${evid}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch event details');
        }
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    enabled: !!evid, // Only fetch if `evid` is defined
    retry: false,
  });

  if (isLoading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <EventContext.Provider value={{ eventDetail }}>
      <div>
        <header className="fixed top-0 left-0 w-full bg-green-600 shadow-md py-4 text-center text-lg font-bold z-10">
          KPRCAS
        </header>
        <body
          className="bg-cover bg-center h-screen"
          style={{
            backgroundImage: `url(${techblast2024})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
    
        >
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="printid" element={<IDprintPage />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="attendance" element={<AttendanceEvent />} />
            <Route path="qrscan" element={<QRscan />} />
            <Route path="test" element={<Test />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </body>
        <footer className="fixed bottom-0 left-0 w-full bg-green-500 shadow-md py-3 text-center text-md z-10 uppercase font-bold">
          {eventDetail.event?.eventName || 'NAME OF EVENT'}
        </footer>
        <Toaster />
      </div>
    </EventContext.Provider>
  );
};

export default MainApp;
