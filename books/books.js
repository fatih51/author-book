const express = require('express');
const router = express.Router();
const dbConfig = require("../db/db.config")
const { findData,addData } = require("../db/db")


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
    const query = `SELECT * FROM ${dbConfig.books} WHERE ID = ${id}`
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

router.post("/add-book",(req,res)=>{
    const { price,authorId,name } = req.body
    const query = `INSERT INTO ${dbConfig.books} (authorId,price,name) VALUES ?`
    const data = [
        [authorId,price,name]
    ]
    addData(query,data,function(err,stat){
        if (err) throw err
        res.send({"status":stat})
    })
})

module.exports = router;