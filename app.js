const Express = require("express")
const Mongoose = require("mongoose")
const Cors = require("cors")
const Bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
const UserModel = require("./models/users")
const userModel = require("./models/users")
const postModel = require("./models/posts")

let app = Express()
app.use(Express.json())
app.use(Cors())
Mongoose.connect("mongodb+srv://alfinroy2005:alfin123@cluster0.lrsqrhp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
//sign in
app.post("/signin", async (req, res) => {
    let input = req.body
    let result = userModel.find({ email: input.email }).then((items) => {
        if (items.length > 0) {
            const passwordValidator = Bcrypt.compareSync(input.password, items[0].password)
            if (passwordValidator) {
                //token creation
                Jwt.sign({ email: input.email }, "Blog App", { expiresIn: "1d" },
                    (error, token) => {
                        if (error) {
                            res.json({ "status": "error in token generation" })

                        } else {
                            res.json({ "status": "success", "token": token, "user id": items[0]._id })

                        }
                    }

                )
                //token invalid
            }
            else {
                res.json({ "status": "invalid password" })
            }

        }
        else {
            res.json({ "status": "invalid e mail id" })
        }
    }).catch()

})
//sign up
app.post("/signup", async (req, res) => {
    let data = req.body
    let hashedPassword = Bcrypt.hashSync(data.password, 10)
    data.password = hashedPassword

    console.log(data)

    userModel.find({ email: data.email }).then(
        async (items) => {
            if (items.length > 0) {
                res.json({ message: "User already exists" })
            }
            else {
                let user = new userModel(data)
                await user.save()
                res.json({ message: "User registered successfully" })
            }

        }
    ).catch()

})
//create a post
app.post("/create", async (req, res) => {
    let input = req.body
    let token = req.headers.token
    Jwt.verify(token, "Blog App", async (error, decoded) => {
        if (decoded && decoded.email) {
            let result = new postModel(input)
            await result.save()
            res.json({ "status": "success" })
        }
        else {
            res.json({ "status": "invalid token Authentication" })
        }
    })
})


//view all post
app.post("/viewall", (req, res) => {
    let token = req.headers.token
    Jwt.verify(token, "Blog App", (error, decoded) => {
        if (decoded && decoded.email) {
            postModel.find().then(
                (items) => {
                    res.json(items)
                }
            ).catch(
                (error) => {
                    res.json({ "status": "error" })
                }
            )

        } else {
            res.json({ "status": "invalid authentication" })
        }
    })
})


//view my post

app.post("/viewmypost", (req, res) => {
    let input=req.body
    let token = req.headers.token
    Jwt.verify(token, "Blog App", (error, decoded) => {
        if (decoded && decoded.email) {
            postModel.find(input).then(
                (items) => {
                    res.json(items)
                }
            ).catch(
                (error) => {
                    res.json({ "status": "error" })
                }
            )

        } else {
            res.json({ "status": "invalid authentication" })
        }
    })
})



app.listen(3030, () => {
    console.log("Server is running on port 3030")
})


