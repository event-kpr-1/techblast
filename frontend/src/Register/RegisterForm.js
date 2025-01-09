import React, { useRef, useState, useContext } from 'react';
import { baseURL, eventURL } from '../constant/url.js';
import toast from 'react-hot-toast';
import { EventContext } from '../MainApp.js';
import { useMutation } from '@tanstack/react-query';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [image, setImage] = useState(null);
  const { eventDetail } = useContext(EventContext);

  // Create refs for each form input field
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const collegeRef = useRef('');
  const regnoRef = useRef('');
  const genderRef = useRef('');
  const departmentRef = useRef('');
  const transactionIDRef = useRef('');
  const transactionSCRef = useRef(''); // Separate ref for file input
  const yearOfStudyRef = useRef('');

  // Handle form submission mutation
   
  

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
        gender: genderRef.current?.value,
        department: departmentRef.current?.value,
        yearOfStudy: yearOfStudyRef.current?.value,
        transactionID: transactionIDRef.current?.value,
        transactionSC: image,
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
      } else if (!data.transactionID) {
        toast.error('Transaction ID is missing');
        transactionIDRef.current?.focus();
        return;
      } else if (!data.transactionSC) {
        toast.error('Transaction screenshot is missing');
        transactionSCRef.current?.focus();
        return;
      } else if (eventDetail.event?.eventFor === 'Students' && !data.regno) {
        toast.error('Register Number is missing');
        regnoRef.current?.focus();
        return;
      }

      try {
        const res = await fetch(`${baseURL}/api/participant/${eventDetail._id || eventURL}/register`, {
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

  const handlePaymentDetails = () => {
    toast.custom((t) => (
      <div className="p-5 rounded-lg bg-white shadow-lg max-w-xs">
        <p>Online Payment / Registration Fee: Rs. 200</p>
        <p>Make the Payment using the following Account Details:</p>
        <p>Account name: The Principal</p>
        <p>Bank: Federal Bank</p>
        <p>Account No. IFSC Code: FDRL0001092</p>
        <p>Branch: Coimbatore</p>

        <button
          onClick={() => toast.dismiss(t.id)} // Only dismiss the toast when the button is clicked
          className="bg-red-500 text-white p-2 h-12 w-12 rounded-full hover:bg-red-600 focus:outline-none"
        >
          <span className="font-bold">X</span>
        </button>
      </div>
    ));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image source to the uploaded file
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // Render success component if registration is successful
  if (isRegistered) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-green-600 text-xl font-bold p-3 bg-white bg-opacity-25">Thank you! Your registration has been completed successfully.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20 min-h-screen bg-gradient-to-r bg-inherit text-black">
      
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
            <label htmlFor="department" className="block text-sm font-medium text-white">Department:</label>
            <input
              type="text"
              id="department"
              placeholder="Your department"
              ref={departmentRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="yearofstudy" className="block text-sm font-medium text-white">Year:</label>
            <select
              id="yearofstudy"
              ref={yearOfStudyRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-white">Gender:</label>
            <select
              id="gender"
              ref={genderRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          {eventDetail.event?.eventFor === 'Students' && (
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
          )}

          <div>
            <p className="text-white hover:cursor-pointer" onClick={handlePaymentDetails}>
              For Payment details <span className="text-blue-400 underline">click here</span>
            </p>
          </div>

          <div>
            <label htmlFor="transid" className="block text-sm font-medium text-white">Transaction ID</label>
            <input
              type="text"
              id="transid"
              placeholder="Enter the Transaction ID"
              ref={transactionIDRef}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="transsc" className="block text-sm font-medium text-white">Transaction Screenshot</label>
            <input
              type="file"
              accept="image/*"
              id="transsc"
              onChange={handleImageUpload}
              ref={transactionSCRef} // Use separate ref for file input
              className="block w-full mt-1 p-2 border text-white border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
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
