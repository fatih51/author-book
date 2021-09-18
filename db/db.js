const mysql = require('mysql');
const dbConfig = require("./db.config")


let con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database:dbConfig.database
});
  
const connect = con.connect((err)=> {
        if (err) throw err;
        console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');
    });

function findData(query, callback)
{
    con.query(query,function(err, result)
    {
        if (err) 
            callback(err,null);
        else
            callback(null,result);

    });

}

function addData(query,data,callback){
    con.query(query,[data],function(err){
        if (err)
            callback(err,null)
        else
            callback(null,true)
    })
}


module.exports = {
    findData,
    addData
}