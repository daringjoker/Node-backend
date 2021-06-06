const os = require('os');
const fs = require('fs');
const express = require('express');

let app = express();
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.listen(8888,()=>{
    console.log("listening on port 8888 ...");
})