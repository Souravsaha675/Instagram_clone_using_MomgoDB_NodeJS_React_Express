const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User= mongoose.model("User");
const bcrypt= require("bcryptjs");
const jwt= require('jsonwebtoken');
const{ JWT_SECRET }=require("../Key");
const requireLogin = require("../middleware/requireLogin");

/*router.get("/loggedin",requireLogin,(req,res)=>{
    res.send("hello user");
})*/

router.post("/signup",(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!email||!password||!name){
       return res.status(422).json({error:"please add all the fields"
    })
    } else{
       User.findOne({email:email})
       .then((savedUser)=>{
           if(savedUser){
               return res.status(422).json({error:"user aldrady exists with that email"})
           } else{
               bcrypt.hash(password,12)
               .then(hashedPassword=>{
                   const user = new User({
                       email,
                       password:hashedPassword,
                       name,
                       profileImg:pic
                   })
                    user.save()
                        .then(user => {
                            res.json({
                                massage: "saved successfully"
                            })
                        })

                        .catch(err => {
                            console.log(err);

                        })
               })
             }
           
       })
       .catch(err=>{
           console.log(err);
           
       })
    }

})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error: "Invalid Email or password"})
        } else{
            bcrypt.compare(password, savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                  // res.json({message:"successfylly signed in"})
                    const token= jwt.sign({_id:savedUser._id},JWT_SECRET)
                    const{_id,name,email,followers,following,profileImg}=savedUser
                    res.json({token,user:{_id,name,email,followers,following,profileImg}})
                }

                else{
                    return res.status(422).json({error:"Invalid Email or password"})
                }
            })
            .catch(err=>{
                console.log(err);
                
            })
        }
  
    })
})

module.exports=router