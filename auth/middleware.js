var jsonwt = require('jsonwebtoken');

module.exports = {
    checkIfAuthorized:(req,res,next)=>{
        let authheader  =  req.cookies.token; 
        if(authheader)
        {           
           jsonwt.verify(authheader,process.env.SECRET_KEY,(err,user)=>{
                if(err)
                {
                    res.json({success:0,message:'Invalid token'});
                }
                else{
                    next();
                }
            });
        }
        else{
            res.json({
                message:'Access Denied, Unauthorized user.'
            })
        }
    }
}