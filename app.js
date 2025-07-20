const Express=require("express")
const Mongoose=require("mongoose")
const Cors=require("cors")
const Bcrypt=require("bcrypt")
const Jwt=require("jsonwebtoken")
const UserModel=require("./models/users")
const userModel = require("./models/users")

let app=Express()
app.use(Express.json())
app.use(Cors())
Mongoose.connect("mongodb+srv://alfinroy2005:alfin123@cluster0.lrsqrhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.post("/signup",async(req,res)=>{
    let data=req.body
    let hashedPassword=Bcrypt.hashSync(data.password,10)
    data.password=hashedPassword

    console.log(data)

    userModel.find({email:data.email}).then(
        async (items)=>{
            if (items.length>0)
        {
            res.json({message:"User already exists"})
        }
        else
        {
            let user=new userModel(data)
            await user.save()
            res.json({message:"User registered successfully"})
        }
    
        }
    ).catch()
    
})




app.listen(3030,()=>{
    console.log("Server is running on port 3030")
})


