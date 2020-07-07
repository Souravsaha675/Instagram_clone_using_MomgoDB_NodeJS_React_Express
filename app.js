const express=require("express");
const mongoose=require("mongoose");
const { MONGOURL }=require("./Key.js");
const app=express();

require("./models/user");

app.use(express.json());
app.use(require("./routes/auth"));

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



app.listen( 3000,()=>{console.log("server is running on port 3000")});