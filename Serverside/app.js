const express=require("express");
const mongoose=require("mongoose");
const { MONGOURL }=require("./Key.js");
const app=express();


mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
});

mongoose.connection.on("error",err=>{
    console.log("err connecting",err);
    
})


require("./models/user");
require("./models/Post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen( 8000,()=>{console.log("server is running on port 8000")});