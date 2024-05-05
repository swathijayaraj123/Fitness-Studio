import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
//creating express server

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.port || 3000;
app.use(express.static("public"));
var strin = app.use(bodyParser.urlencoded({ extended: true }));


const connection = mongoose.connect(process.env.MONGO_URI)
// mongoose.connect(uri, {
//   useNewUrlparser: true,
// });

if(connection){
  console.log("data base is connedted")
}

//creating database schema using mongoose
//server side form validation using mongoose
 const newUsers = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password:String
});

// creating database model
export const newUserModel = new mongoose.model("user", newUsers);

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
 res.render("schedule.ejs",{message:"Class has been booked successfully"});
 });
//middle ware to check if the email exist or not

//handling all the post request

app.post("/newUser", async(req, res) =>{

  const {name, phone, email, password} = req.body
  console.log(email)
  if([name, phone, email, password].some((field)=> field.trim() == "")){
    res.send("all fileds are required")
  }

  // checking if user exists in the database

  const existingUser = await newUserModel.findOne({email})

  if(existingUser){
    res.render("join.ejs",{message:"account exists, Please login"});
    
  }
  const user = await newUserModel.create({
    name,
    email, 
    phone,
    password,

  })

  if(!user){
    res.send("registration failed")
  }

  if(user){
    console.log(user)
    res.render("login.ejs",{message:"Registration Successful, Please Login"});
  }
 

})

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
       res.render("schedule.ejs", {name:res.locals.name, message:""});
     }
   
     else{
       res.render("login.ejs", {message:"email and password does not match",});
     }
   }
  catch(err){
    console.log(err.message);
  }

});

app.listen(3000, () => {
  console.log("port has beeen started at 3000");
});
