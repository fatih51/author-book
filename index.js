const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000


const session = require("express-session")
app.use(session({
    secret: "keysecret",
    resave: false,
    saveUninitialized: true,
}));

const book = require("./books/books")
const author = require("./authors/authors")
const login = require("./authentication/login")
const register = require("./authentication/register")
const logout = require("./authentication/logout")



app.use("/",book)
app.use("/",author)
app.use("/",login)
app.use("/",register)
app.use("/",logout)


app.get("/",(req,res)=>{
    res.send("merabalar")
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})