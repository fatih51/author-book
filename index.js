const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000


const book = require("./books/books")
const author = require("./authors/authors")


app.use("/",book)
app.use("/",author)

app.get("/",(req,res)=>{
    res.send("merabalar")
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})