import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected to mongo")
    } catch (err) {
        console.log(`error in connectdb : ${err}`)
        process.exit(1);
    }
}

export default connectDB;