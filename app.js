const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

var app =express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({ 
    name:String
});
const item=mongoose.model("task",trySchema);


app.get("/", function(req, res){
    item.find({},function(err,foundItems){
        if(err){
            console.log(err);
        }
        else{
            res.render("list",{dayej : foundItems});
        }
    });
});
app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4=new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked,function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
    })
})
app.listen("3000",function(){
    console.log("Server is running");
})