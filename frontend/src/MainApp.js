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
// IMAGES
import techblast2024 from './images/techblast2024.png'
// import kprlogo from './images/kprlogo.png'
import kprlogobw from './images/kprlogobw.png'

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
      <header className="fixed top-0 left-0 w-full bg-slate-700 bg-opacity-25 shadow-md py-4 text-center text-lg font-bold z-10 text-white flex justify-center items-center">
        <p>KPRCAS </p>
        <img 
          // src={`https://pbs.twimg.com/profile_images/1715285485466132480/j06QZav6_400x400.jpg`} 
          src={kprlogobw} 
          alt="Logo" 
          className="ml-2 max-h-6 object-contain " 
        />
      </header>
        <body
          className="bg-cover bg-center min-h-screen"
          style={{
            backgroundImage: `url(${techblast2024})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
    
        >
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="printid" element={<IDprintPage />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="attendance" element={<AttendanceEvent />} />
            {/* <Route path="qrscan" element={<QRscan />} /> */}
            <Route path="test" element={<Test />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </body>
        <footer className="fixed bottom-0 left-0 w-full bg-slate-700 bg-opacity-25 shadow-md py-4 text-center text-lg font-bold z-10 text-white">
          {eventDetail.event?.eventName || 'NAME OF EVENT'}
        </footer>
        <Toaster />
      </div>
    </EventContext.Provider>
  );
};

export default MainApp;
