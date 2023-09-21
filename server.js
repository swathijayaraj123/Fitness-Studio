import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";



//creating express server

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));
var strin = app.use(bodyParser.urlencoded({ extended: true }));

// connecting to database

mongoose.connect("mongodb://127.0.0.1:27017/GymUsers", {
  useNewUrlparser: true,
});

//creating database schema using mongoose
//server side form validation using mongoose
const newUsers = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password:String
});

// creating database model
const newUserModel = new mongoose.model("user", newUsers);

//handling request using routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/trainers", (req, res) => {
  res.sendFile(__dirname + "/views/trainers.html");
});

app.get("/testimonials", (req, res) => {
  res.sendFile(__dirname + "/views/testimonials.html");
});

app.get("/pricing", (req, res) => {
  res.sendFile(__dirname + "/views/pricing.html");
});

app.get("/gallery", (req, res) => {
  res.sendFile(__dirname + "/views/gallery.html");
});

app.get("/join", (req, res) => {
res.render("join.ejs",{message:" "});
});
app.post("/login", (req, res) => {
    res.render("login/ejs", {message:""});
  });
  
 app.get("/book", (req, res)=>{
  alert("hello");
 });
//middle ware to check if the email exist or not

//handling all the post request
app.post("/newUser", (req, res) => {
  var name = req.body.name;
  res.locals.name=name;
  const email = req.body.email;
  const phone = req.body.phone; 
  const password = req.body.password;
  try{
    async function getItems(){
      const items=await newUserModel.find({email:email});
      return items;
  }
  getItems().then(function(foundItems){
  
      const len=foundItems.length;
      res.locals.len=len;
  
      if(len===0){
          console.log(res.locals);
    const newUser = new newUserModel({
      name: name,
      email: email,
      phone: phone,
      password:password
    });
    name = name.toUpperCase();
    //newUser.save();
    res.render("Thanks.ejs", {name:name});
    console.log("data has been saved successfully");
  }
  else{
      res.render("join.ejs",{message:"user already exists, try some other mail"});
  }
  
  });
  }
catch(err){
  console.log(err.message);
}
});

app.get("/login", (req, res)=>{

  res.render("login.ejs",{message:""});
});



app.post("/loginAuth", async (req,res)=>{
   // res.send("cool");
   try{
    var email=req.body.email;
    var password=req.body.password;
    console.log(email+password);
     var resultsAuth= await newUserModel.findOne({email:email, password:password});
     console.log(resultsAuth);
     if(resultsAuth!=null){
       res.render("schedule.ejs", {name:res.locals.name});
     }
   
     else{
       res.render("login.ejs", {message:"email and password does not match"});
     }
   }
  catch(err){
    console.log(err.message);
  }

});

app.listen(3000, () => {
  console.log("port has beeen started at 3000");
});
