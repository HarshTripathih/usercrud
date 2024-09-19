import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js"


dotenv.config();
connectDB();

const app = express();


app.use(express.json()); //for parsing Application/json

app.use("/api/v1/users",userRoutes);

const PORT = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    res.send('hello form server')
})


app.listen(PORT,()=>console.log(`server is connected on http://localhost:${PORT}`))