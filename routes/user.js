const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");

router.post("/addUser",(req,res)=>{
    const {name,email}=req.body;
    const user =new User({
        name,
        email
    })

    user.save()
    .then((user)=>{
        res.json({message:"saved successfully"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/getEmails",(req,res)=>{
    let output=[];
    User.find({},{_id:0,email:true})
    .then(users=>{
        res.json(users);
    })
    // .forEach(function(user) {output.push(user.email) })
    // .then((user)=>{
    //     res.json(output);
    // })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports=router;