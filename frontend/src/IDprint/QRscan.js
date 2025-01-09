import React, { useState , useRef } from 'react'
import { scanner } from '../util/Functionalities'



const QRscan = () => {
  const [name,setName] = useState('')
  const [number,setNumber] = useState('')
  const scannerRef = useRef('null')
    const qrCodeRegionId = "qr-reader";

  // scanning
  const handleScan = ()=> {  
    scanner(scannerRef,qrCodeRegionId , setName);
  };



  

  return (
    <div className="  flex flex-col items-center  justify-between p-4">
      {/* Input Section */}
      <div className="flex flex-col space-y-2 w-full max-w-sm">
        <label className="text-sm font-medium" htmlFor="">
          NAME
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm font-medium" htmlFor="">
          MOBILE
        </label>
        <input
          type="text"
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button onClick={handleScan}>scan</button>
      <div ref={scannerRef} id={qrCodeRegionId} 
      className=' w-auto h-48  aspect-square    ' />
    

      {/* Output Section */}
      <div className="flex flex-col items-center space-y-4 mt-6">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${number}`}
          alt="number"
          className="border border-gray-300 rounded"
        />
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      </div>
    </div>

  )
}

export default QRscan