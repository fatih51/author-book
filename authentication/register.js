const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt")
const saltRounds = 10;

const dbConfig = require("../db/db.config")
const { addData } = require("../db/db")


router.use(express.json())



router.post("/register",(req,res)=>{
    const { username,email,password } = req.body
    bcrypt.genSalt(saltRounds, function(err, salt) {  
        if (err) throw err
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err
            const query = `INSERT INTO ${dbConfig.users} (ID,username,email,password) VALUES ?`
            var ID = Date.now()
            const data = [
                [ID,username,email,hash]
            ]
            addData(query,data,function(err,stat){
                if (err) throw err
                res.send({"status":stat})
            })
        });
    });
})

module.exports = router;