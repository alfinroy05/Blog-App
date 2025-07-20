const Express=require("express")
const Mongoose=require("mongoose")
const Cors=require("cors")
const Bcrypt=require("bcrypt")
const Jwt=require("jsonwebtoken")


let app=Express()

app.get("/",(req,res)=>{
    res.send("Welcome to the API")
})


app.listen(3030,()=>{
    console.log("Server is running on port 3030")
})