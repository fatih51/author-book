const express = require('express');
const router = express.Router();
const dbConfig = require("../db/db.config")
const { findData,addData } = require("../db/db")

const { authController } = require("../authentication/controller")

router.use(express.json())

router.get('/books', function (req, res) {
    const query = `SELECT * FROM ${dbConfig.books}`
    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})

router.get('/book/:id', function (req, res) {
    const { id } = req.params
    const query = `SELECT ${dbConfig.users}.username,
    ${dbConfig.books}.ID,
    authorId,
    price,
    name
    FROM ${dbConfig.books} 
    INNER JOIN ${dbConfig.users} 
    WHERE ${dbConfig.books}.createdBy=${dbConfig.users}.ID AND ${dbConfig.books}.ID=${id}`

    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})


router.get("/book/:id/details", (req,res)=>{
    const { id } = req.params
    const query = `SELECT ${dbConfig.authors}.name AS AuthorName,
    ${dbConfig.authors}.age AS AuthorAge,
    ${dbConfig.books}.authorId AS AuthorCode
    FROM ${dbConfig.books}
    INNER JOIN ${dbConfig.authors}
    WHERE ${dbConfig.books}.ID = ${id} AND ${dbConfig.books}.authorId = ${dbConfig.authors}.ID`

    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})

router.post("/add-book",[authController],(req,res)=>{
    const { authorId,price,name, } = req.body
    const query = `INSERT INTO ${dbConfig.books} (authorId,createdBy,price,name) VALUES ?`
    const data = [
        [authorId,parseInt(req.session.UserID),price,name]
    ]
    addData(query,data,function(err,stat){
        if (err) throw err
        res.send({"status":stat})
    })
})


module.exports = router;