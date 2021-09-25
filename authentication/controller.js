const authController = (req,res,next) =>{
    if (req.session.UserID){
        next()
    }else{
        res.send({"err":"not authorized"})
    }
}


module.exports ={ authController }