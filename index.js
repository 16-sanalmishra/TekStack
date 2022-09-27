const express = require('express');
const dotenv = require("dotenv")
const app = express();
dotenv.config();
app.get("/", (req, res)=> {
    res.send("Hello Bitch")
})
app.get("/intro" , (req,res)=>{
    res.send("Intro Page")
})
const PORT  = process.env.PORT || 9000;
app.listen(PORT,()=> {
    console.log("Server is running on " + PORT )
})



