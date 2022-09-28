import express from "express";
import dotenv from "dotenv";
import asyncHandler from 'express-async-handler';
import bodyparser from "body-parser";
import connectDB from "./db.js";
import User from "./models/User.js";
const app = express();
dotenv.config();
// app.get("/", (req, res)=> {
//     res.send("Welcome to the Landing Page.")
// })
// app.get("/intro" , (req,res)=>{
//     res.send("Intro Page")
// })
// app.post("/postCall" , (req,res)=>{
//     res.sendFile(__dirname + '/test.html')
// })
app.set("view engine", "ejs");
connectDB();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", asyncHandler(async(req , res)=> {
    res.render("Home");
    // res.redirect("/success");
}))
app.get("/success", asyncHandler(async(req, res)=> {
    res.render("Success");
}))
app.post("/", asyncHandler(async(req,res)=> {
    const {name, techstack} = req.body;
    const user =await User.create({name, techstack});
    res.redirect("/success");
}))

app.post("/list/:id", asyncHandler(async(req, res)=> {
    const {id} = req.params;
    const user = await User.findById(id);
    console.log(user)
    if(user){
        user.name = req.body.name || user.name;
        user.techstack = req.body.techstack || user.techstack;
    }
    const updatedUser = user.save();
    res.redirect("/success");
}))
app.get("/list/:id", asyncHandler(async(req, res)=> {
    const id = req.params.id;
    res.render("UpdateUser", {id: id});
}))
app.get("/list", asyncHandler((async(req, res)=> {
    const userList = await User.find();
    const userId = userList.map(user => user._id);
    console.log(userList);
    res.render("List", {userList: userList, userId})
})))

const PORT  = process.env.PORT || 9000;
app.listen(PORT,()=> {
    console.log("Server is running on " + PORT )
})



