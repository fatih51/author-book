const express = require('express');
const router = express.Router();
const dbConfig = require("../db/db.config")
const { findData,addData } = require("../db/db")

const { authController } = require("../authentication/controller")


router.use(express.json())

router.get("/authors",(req,res)=>{
    const query = `SELECT * FROM ${dbConfig.authors}`
    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})


router.get('/author/:id', function (req, res) {
    const { id } = req.params
    const query = `SELECT * FROM ${dbConfig.authors} WHERE ID = ${id}`
    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})

router.get("/author/:id/details", (req,res)=>{
    const { id } = req.params
    const query = `SELECT ${dbConfig.authors}.name AS AuthorName,
    ${dbConfig.authors}.age AS AuthorAge,
    ${dbConfig.books}.authorId AS AuthorCode,
    ${dbConfig.books}.price AS BookPrice,
    ${dbConfig.books}.name AS BookName
    INNER JOIN ${dbConfig.books}
    WHERE ${id} = ${dbConfig.books}.authorId AND ${id} = ${dbConfig.authors}.ID`

    findData(query, function(err,data){
        if (err) throw err
        res.send({"data":data})
    });
})

router.post("/add-author",[authController],(req,res)=>{
    const { ID,age,name } = req.body
    const query = `INSERT INTO ${dbConfig.authors} (ID,name,age) VALUES ?`
    const data = [
        [ID,name,age]
    ]
    addData(query,data,function(err,stat){
        if (err) throw err
        res.send({"status":stat})
    })
})

module.exports = router;
