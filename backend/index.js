import express from 'express'
import cors from "cors";
import mongoose from 'mongoose';
import userRoute from './src/routes/UserRoute.js';
import expenseRoute from './src/routes/expenseRoute.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();
const port=process.env.PORT;
const app=express();

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb Connected Successfully..");
    } catch (error) {
        console.error("MongoDb Connection Failed",error);
        process.exit(1);
    }
}
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));


app.use("/api",userRoute);
app.use("/api/expense/",expenseRoute);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(port,()=>{
    console.log("app running on port 8080");
})

