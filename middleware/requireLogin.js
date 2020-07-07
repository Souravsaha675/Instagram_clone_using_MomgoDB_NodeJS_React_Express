const jwt =require("jsonwebtoken");
const mongoose = require("mongoose");
const {JWT_SECRET}= require("../Key");
const User= mongoose.model("User");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    
    if(!authorization){
        
        return res.json({error:"you must be logged in"});

    } else{
        const token =authorization.replace("sourav ","");
        jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
                return res.json({error:"you must be logged in"})
            } else{
                const {_id}=payload
                User.findById(_id).then(userdata=>{
                    req.user=userdata;
                })
                next();
            }
        })
    }
    
}