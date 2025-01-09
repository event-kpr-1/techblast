// pakages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cloudinary from 'cloudinary'

// db
import connectDB from './db/connectDB.js';

// sites
import providerRoute from './routes/provider_route.js';
import registerRoute from './routes/register_route.js';
import attendanceRoute from './routes/attendance_route.js'



const app = express();
app.use(express.json())
dotenv.config();

const __dirname = path.resolve();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});


app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))


// ENV
const PORT = process.env.PORT;


// redirecting
app.use("/api/provider",providerRoute);
app.use("/api/participant",registerRoute);
app.use("/api/event",attendanceRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend','build')))
    app.use("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend",'build','index.html'))
    })
}


app.listen(PORT, ()=>{
    console.log('server on :'+PORT)
    connectDB();
})