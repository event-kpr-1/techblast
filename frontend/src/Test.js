import React from 'react'
import toast from 'react-hot-toast';


const Test = () => {

  const handlePaymentDetails = () => {
    toast.custom((t) => (
      <div className="p-5 rounded-lg bg-white shadow-lg">
        <p>Online Payment / Registration Fee: Rs. 200</p>
        <p>Make the Payment using the following Account Details</p>
        <p>Account name: The Principal, </p>
        <p>Bank: Federal bank</p>
        <p>Account No.: IFSC Code: FDRL0001092</p>
        <p>Branch: Coimbatore</p>
        
        <button
          onClick={() => {
            toast.dismiss(t.id); // Only dismiss the toast when the button is clicked
          }}
          className=" bg-red-500 text-white p-2 h-12 w-12  hover:bg-red-600 focus:outline-none"
        >
          <span>X</span>
        </button>
      </div>
    ));
  };


  return (
    <div onClick={handlePaymentDetails} className='m-32'>Test</div>
  )
}

export default Test