const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Emp = require("./empModel");

const app = express();

mongoose
  .connect(
    "mongodb+srv://edisontt:v5N4epAhSZQ3QzrA@cluster0.ig02e.mongodb.net/EmpList?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


const empList = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.post("/api/newEmp", (req, res, next) => {
  const newEmp =  new Emp({
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    phone: req.body.phone,
    salary: req.body.salary,
  })

  newEmp.save().then((empCreated)=>{
    // console.log(empCreated);
    res.status(201).json({
      message: 'New Employee added successfully',
      id : empCreated._id
    });
  })
  // const post = req.body;
  // console.log(post);
  // empList.push(post)
});

app.get("/api/empLis", (req, res, next) => {
  Emp.find().then((empListFromDB)=>{
    // console.log(empListFromDB)
    res.status(200).json({
      message: "Employee fetched successfully!",
      data: empListFromDB
    });
  });
});

app.delete("/api/empLis/:Id",(req,res,next)=>{
  Emp.deleteOne({_id:req.params.Id}).then(result=>{
    res.status(200).json({message:'Deleted'});
  })
});

app.put("/api/empLis/:Id",(req,res,next)=>{
  const updatedEmp =  new Emp({
    _id:req.params.Id,
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    phone: req.body.phone,
    salary: req.body.salary,
  })
  Emp.updateOne({_id:req.params.Id},updatedEmp).then(result=>{
    // console.log(result);
    res.status(200).json({
      message:"Employe Updated!"
    })
  });
});

module.exports = app;
