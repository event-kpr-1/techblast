import React, { useState, useRef , useContext } from 'react';
import { baseURL ,eventURL} from '../constant/url';
import {BiQrScan} from 'react-icons/bi'
import { scanner } from '../util/Functionalities';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast'
import { HiDocumentDownload } from "react-icons/hi";

import { EventContext } from '../MainApp.js';
import { download } from '../util/Functionalities';





const IDprintPage = () => {
    const {eventDetail} = useContext(EventContext)
    const [id, setId] = useState('');
    const [QRimg,setQRimg] = useState('')
    const [detail,setDetail] = useState({})
    const [isThere,setIsThere] = useState('')
    
    
    const inputRef = useRef(null);
    const printRef = useRef(null)

    const scannerRef = useRef('null')
    const qrCodeRegionId = "qr-reader";
    
    
    const handleSearch = async () => {
      if(!id){
        toast.error('no id entered')
        setIsThere('')
        return;
      }
        try {
            console.log("search click")
            // console.log(baseURL)
            const res = await fetch(`${baseURL}/api/provider/${eventDetail.event._id || eventURL}/printid/${id}`,{
                method : "GET",
                credentials : 'include',
                headers : {
                    "Content-Type" : "application/json"
                },
            })
            
            const participant = await res.json();
            if(!res.ok){
              
              console.log(participant.error)
              throw new Error(participant.error || "data not found")

            }
            setDetail(participant)
            setIsThere(participant.name)
            const img = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`;
            setQRimg(img);
            
            
            // console.log("Search :" , detail);
          } catch (err) {
            toast.error('data not found')
            setIsThere('')
            
        }
        
    };
    
    const handleScan = ()=> {  
      scanner(scannerRef,qrCodeRegionId , setId);
    };

    const handlePrint = async () => {
        // Check if there's nothing to print
        if (isThere === '') {
          toast("Nothing to print");
          return;
        }
      
        try {
            print();
            
          
        } catch (err) {
          toast.error(err.message)
        }
      };
      const print = useReactToPrint({
        contentRef : printRef,
        onAfterPrint : async() => {
            toast.success('done ✔')
            setId('');
            setQRimg('');
            setDetail({});
            setIsThere('')

            try {
                const res = await fetch(`${baseURL}/api/event/${eventDetail.event._id || eventURL}/idcard/${id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const status = await res.json();
                if (!res.ok) {
                    throw new Error(status.error || 'participant not found');
                }
              
            } catch (err) {
               toast.error(err.message);
            }
            
            inputRef.current.focus();
            
        }
      })
      
      
      
    
      
        return (
        <div className="min-h-screen flex items-center justify-center bg-inherit">
            <button 
                onClick={() => { download('idcard') }} 
                className="absolute top-16 right-2 p-2  bg-white bg-opacity-25 rounded-sm  text-white  hover:bg-blue-600 transition duration-200"
            >
                <HiDocumentDownload size={24}/>

            </button>
            <div className="bg-white bg-opacity-25 p-8 rounded-xl shadow-lg w-full max-w-lg ">
                <div className="mb-6">
                    <label htmlFor="Printid" className="block text-lg font-semibold text-white">
                        Enter ID:
                    </label>
                    <div className="flex items-center gap-3 mt-3">
                        <input
                            type="text"
                            id="Printid"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            ref={inputRef}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter ID"
                        />
                        <button
                            onClick={handleScan}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <BiQrScan size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleSearch}
                        className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Search
                    </button>
                    <button
                        onClick={handlePrint}
                        className="w-1/2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-3"
                    >
                        Print
                    </button>
                </div>

                <p className="text-center text-gray-600 font-medium mt-4">{isThere}</p>
                <div
                    ref={scannerRef}
                    id={qrCodeRegionId}
                    className="mt-6 aspect-square h-48 bg-inherit bg-opacity-25 rounded-lg flex items-center justify-center mx-auto"
                >
                    
                </div>
            </div>
            {/* ID CARD  */}
            <div className="absolute top-0 left-0 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 hidden">
            <div
                ref={printRef}
                className="mt-0 ml-0"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Participant Details</h2>
                <img src={QRimg} alt={id} className="w-32 h-32 mb-4" />
                <p className="text-gray-700">Name: {detail.name}</p>
                <p className="text-gray-700">Reg No: {detail?.regno}</p>
                <p className="text-gray-700">Phone: {detail.phone}</p>
                <p className="text-gray-700">College: {detail.college}</p>
                <p className="text-gray-700">Email: {detail.email}</p>
            </div>
            </div>

    </div>
    );
     
    
};
export default IDprintPage;