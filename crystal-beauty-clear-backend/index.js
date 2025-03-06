import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';
//import userRouter from './routes/userRouter.js';

const app = express();
mongoose.connect('mongodb+srv://admin:123@cluster0.3oi6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=> {
        console.log("Connected to database");
    }
).catch(
    ()=> {
    }
)
// mongodb+srv://admin:123@cluster0.3oi6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(bodyParser.json());

app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);


 
// Use only ONE app.listen call
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
