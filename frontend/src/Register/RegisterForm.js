import React, { useRef, useState, useContext } from 'react';
import { baseURL, eventURL } from '../constant/url.js';
import toast from 'react-hot-toast';
import { EventContext } from '../MainApp.js';
import { useMutation } from '@tanstack/react-query';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  
  const { eventDetail } = useContext(EventContext);

  // Create refs for each form input field
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const collegeRef = useRef('');
  const regnoRef = useRef('');
  
  

  
   
  

  // Handle form submission
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();

      // Collect data only when the submit button is clicked
      const data = {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        college: collegeRef.current?.value,
        regno: regnoRef.current?.value,
        
      };

      // Check for missing fields
      if (!data.name) {
        toast.error('Name is missing');
        nameRef.current?.focus();
        return;
      } else if (!data.email) {
        toast.error('Email is missing');
        emailRef.current?.focus();
        return;
      } else if (!data.phone) {
        toast.error('Phone is missing');
        phoneRef.current?.focus();
        return;
      } else if (!data.college) {
        toast.error('College is missing');
        collegeRef.current?.focus();
        return;
      }  else if (eventDetail.event?.eventFor === 'Students' && !data.regno) {
        toast.error('Register Number is missing');
        regnoRef.current?.focus();
        return;
      }

      try {
        const res = await fetch(`${baseURL}/api/participant/${eventDetail.event._id || eventURL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Send the collected data
        });

        const responseData = await res.json();

        if (!res.ok) {
          throw new Error(responseData.error || 'Something went wrong');
        }

        // Set the registration status to true on success
        toast.success('Registration success');
        setIsRegistered(true);
      } catch (err) {
        toast.error(err.message);
        switch (err.message) {
          case 'invalid email format':
          case 'email already exists':
            emailRef.current?.focus();
            break;
          case 'regno already exists':
            regnoRef.current?.focus();
            break;
          case 'invalid phone number':
            phoneRef.current?.focus();
            break;
          default:
            break;
        }
      }
    }
  });

  

  

  // Render success component if registration is successful
  if (isRegistered) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-green-600 text-xl font-bold p-3 bg-white bg-opacity-25">Thank you! Your registration has been completed successfully.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20 min-h-screen bg-gradient-to-r bg-inherit text-white">
      
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-25 rounded-lg shadow-lg">


        <h2 className="text-2xl font-semibold text-center text-white mb-6">Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              ref={nameRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="abc@example.com"
              ref={emailRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          {/* PHONE NUMBER */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white">Phone:</label>
            <input
              type="tel"
              id="phone"
              placeholder="1234567890"
              ref={phoneRef}
              pattern="[0-9]{10}"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          {/* COLLEGE */}
          <div>
            <label htmlFor="college" className="block text-sm font-medium text-white">{eventDetail.event?.eventFor === 'Students' ? '' : 'School / '}College Name:</label>
            <input
              type="text"
              id="college"
              placeholder="Your college name"
              ref={collegeRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          
          

          
            <div>
              <label htmlFor="regno" className="block text-sm font-medium text-white">Register Number:</label>
              <input
                type="text"
                id="regno"
                placeholder="Your register number"
                ref={regnoRef}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>
          

          

          {/* SUBMIT */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:ring focus:ring-green-300 focus:outline-none"
            >
               {isPending ? <span class="loading loading-spinner loading-lg"></span> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
