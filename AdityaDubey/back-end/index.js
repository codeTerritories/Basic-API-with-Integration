const express=require('express');
const app = express();
var cors = require('cors')
require('./db/dbconnection');
const userRouter = require("./routes/userRouter.js");
                                                
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use("/", userRouter);

app.use(cors({
    origin:['localhost:3000'],
    credentials: true
}))


app.listen(4000,()=>{
    console.log("Server is running on 4000");
});