require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT= process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURI,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb");
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting to mongodb ",err);
})

require("./models/user");
require("./models/meeting");
app.use(express.json());

app.use(require("./routes/user"));
app.use(require("./routes/schedule"));
app.use(require("./routes/getMeetings"));

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on ",PORT);
})