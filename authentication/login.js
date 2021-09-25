const express = require('express');
const router = express.Router();


const bcrypt = require("bcrypt")


const dbConfig = require("../db/db.config")
const { findData } = require("../db/db");


router.use(express.json())


router.post("/login",(req,res)=>{
    const { email,password } = req.body
    const query = `SELECT email,password,ID FROM ${dbConfig.users} WHERE email='${email}'`
    
    findData(query,function(err,stat){
        if (err){
            return res.send({err})
        }
        const validPassword = bcrypt.compare(password, stat[0].password);
        validPassword.then((result,err)=>{
            if (err){
                return res.send({"err":err})
            }
            if (result){
                req.session.UserID = stat[0].ID
                return res.send({"stat":"success"})
            }else{
                return res.send({"err":"wrong pass or email"})
            }

        })
    })
})

module.exports = router;