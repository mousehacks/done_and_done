import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

function getDate() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = new Date();
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let dm = day + ", " + new Date().getDate() + "." + month + " ";
  return dm;
};

let personalList = [];
function addToPersonalList(item) {
  personalList.push(item);
  return personalList;
};

let workList = [];
function addToWorkList(item) {
  workList.push(item);
  return workList;
};

app.get("/", (req,res) => {
  res.render("index.ejs");
});

app.get("/personal", (req,res) => {
  res.locals = {dayMonth: getDate(), tasks: personalList};
  res.render("personal.ejs");
});

app.post("/personal", (req, res) =>{
  console.log(req.body["new-task"]);
  res.locals = {dayMonth: getDate(), tasks: addToPersonalList(req.body["new-task"])};
  res.render("personal.ejs");
});

app.post("/work", (req, res) =>{
  console.log("work task: " + req.body["new-work-task"]);
  res.locals = {dayMonth: getDate(), workTasks: addToWorkList(req.body["new-work-task"])};
  res.render("work.ejs");
});

app.get("/work", (req,res) => {
  res.locals = {workTasks: workList};
  res.render("work.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
});
