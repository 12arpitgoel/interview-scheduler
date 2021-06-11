const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Meeting=mongoose.model("Meeting");

router.get("/allMeetings",(req,res)=>{
    Meeting.find()
    .populate("user1","email")
    .populate("user2","email")
    .then(meetings=>{
        res.json({meetings});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/meetingDetail/:meetingId",(req,res)=>{
    Meeting.findOne({_id:req.params.meetingId})
    .populate("user1","email")
    .populate("user2","email")
    .then(meeting=>{
        res.json({meeting});
    })
    .catch(err=>{
        console.log(err);
    })
})


module.exports=router;