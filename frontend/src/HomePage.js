import React from 'react';
import { useNavigate} from 'react-router-dom';



const HomePage = () => {
    
    const navigate = useNavigate();


   
    
    const pass = 'kprcas654';

    const handlePassword = () => {
        const input = prompt("Enter PassKey");
        if (input === pass) {
            return 1;
        } else {
            // alert(pass);
            alert("Incorrect PassKey");
        }
    };
    const handleNavigate = (path) => {
        if(process.env.NODE_ENV !== 'production'){
            navigate(path)
            console.log(process.env.PAGE_PASS)
        }else{
            handlePassword() && navigate(path)
        }
    }



   
    
    return  (

        <div className="relative h-screen bg-inherit">
            {/* Header */}
            

            {/* Body */}
            <main className="flex flex-col gap-3 justify-center items-center h-full pt-16 pb-16 bg-inherit">
                <button
                className="btn btn-outline  bg-white w-screen md:w-48"
                onClick={() => navigate('register')}
                >
                Register
                </button>
                <button
                className="btn btn-outline   bg-white w-screen md:w-48"
                onClick={() => handleNavigate('printid')}
                >
                Print ID
                </button>
                <button
                className="btn btn-outline   bg-white w-screen md:w-48"
                onClick={() => handleNavigate('attendance')}
                >
                Attendance
                </button>
            </main>

            {/* Footer */}
            
        </div>

    )
};

export default HomePage;