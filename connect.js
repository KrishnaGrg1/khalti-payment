import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectToMongoDB=()=>mongoose.connect(process.env.MONGODB_URI).then(async()=>{
    return Promise.resolve("Connected to MongoDB");
}).catch((e)=>{
    return Promise.reject("Error"+e);
})

export default connectToMongoDB