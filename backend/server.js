import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import userRoues from './routes/userRouter.js';
import staffRouter from "./routes/staffRouter.js"
import pharmacyRouter from "./routes/pharmacyRoutes.js"
import appointmentRouter from "./routes/appointmentRouter.js"

const app = express(); 
const PORT = 4000;


connectDB()

app.use(express.json());
app.use(cors()); 




app.use("/users", userRoues)
app.use("/staff", staffRouter)
app.use("/pharmacy", pharmacyRouter)
app.use("/appointment", appointmentRouter)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
