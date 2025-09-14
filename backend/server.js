import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import userRoues from './routes/userRouter.js';

const app = express(); 
const PORT = 4000;


connectDB()

app.use(express.json());
app.use(cors()); 




app.use("/users", userRoues)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
