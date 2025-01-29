import React, { useState , useRef, useEffect , useContext } from 'react';
import { baseURL, eventURL } from '../constant/url';
import toast from 'react-hot-toast';
import { BiQrScan } from 'react-icons/bi';
import { HiDocumentDownload } from "react-icons/hi";


import { download, scanner } from '../util/Functionalities';
import { EventContext } from '../MainApp.js';

const AttendanceEvent = () => {
    const { eventDetail } = useContext(EventContext);
    console.log(eventDetail)
    const [id, setId] = useState('');
    const [event, setEvent] = useState('');
    const events = eventDetail.event.subEvents || [];

    const inputRef = useRef();
    const eventRef = useRef();
    const scannerRef = useRef('null');
    const qrCodeRegionId = "qr-reader";
    
    const outNotify = (status) => {
        if (status.kit) {
           toast('its ' + status.kit + '\'s kit');
           return;
        }
        if (status.food) {
           toast('its ' + status.food + '\'s food');
           return;
        }
        if (status.msg) {
           toast(status.msg);
           return;
        }
        toast.success('registered : ' + status.added);
    };

    const handleAdd = async () => {
        if (!event) {
            toast.error("select event");
            eventRef.current.focus();
            return;
        }
        if (!id) {
            toast.error("enter ID");
            inputRef.current.focus();
            return;
        }
        try {
            const res = await fetch(`${baseURL}/api/event/${eventDetail.event._id || eventURL}/${event}/${id}`, {
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
            outNotify(status);
        } catch (err) {
           toast.error(err.message);
        } finally {
            inputRef.current.focus();
        }
    };

    const handleScan = () => {  
        scanner(scannerRef, qrCodeRegionId, setId);
    };

    useEffect(() => {
        if (event)
            toast('set to ' + event);
    }, [event]);

  return (
    <div className="relative flex flex-col w-screen h-screen bg-inherit justify-center items-center">

        {(events.some(eve => eve.evName === event) || event==='kit' || event === 'food')&& (
            <button 
                onClick={() => { download(event); console.log(event); }} 
                className="absolute top-16 right-2 p-2  bg-white bg-opacity-25 rounded-sm  text-white  hover:bg-blue-600 transition duration-200"
            >
                <HiDocumentDownload size={24}/>

            </button>
        )}

        <div className="p-6 bg-white bg-opacity-25 shadow-lg rounded-lg max-w-md mx-auto w-auto aspect-square ">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{event}</h1>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="id" className="text-sm font-medium text-black text-center bg-white bg-opacity-80">Scan ID</label>
                    <div className='flex flex-row justify-evenly gap-2'>            
                        <input 
                            type="text" 
                            onChange={(e) => setId(e.target.value)} 
                            value={id} 
                            ref={inputRef} 
                            className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 flex-1"
                        />
                        <button className="mt-1 flex justify-center items-center bg-white bg-opacity-75 border rounded-lg focus:outline-none focus:ring-2 h-auto w-10 text-center" onClick={handleScan}>
                            <BiQrScan/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="event" className="text-sm font-medium text-black text-center bg-white bg-opacity-80">Select Event</label>
                    <select 
                        name="event" 
                        id="event" 
                        ref={eventRef}
                        onChange={(e) => setEvent(e.target.value)} 
                        className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
                    >
                        {events.length > 0 && (
                            <optgroup label="Events">
                                <option value="">--SELECT EVENT--</option>
                                {events.map((eve, index) => (
                                    <option value={`${eve.evName}`} key={index}>{eve.evName || 'summa'}</option>
                                ))}
                            </optgroup>
                        )}

                        <optgroup label="Others">
                            {!events.length && (<option value="">--SELECT--</option>)}
                            <option value="food">food</option>
                            <option value="kit">kit</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className="mt-6">
                <button 
                    onClick={handleAdd} 
                    className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                    ADD
                </button>
            </div>
        </div>

        {/* scan area */}
        <div ref={scannerRef} id={qrCodeRegionId} className='w-auto h-48 aspect-square' />
    </div>
  );
};

export default AttendanceEvent;
