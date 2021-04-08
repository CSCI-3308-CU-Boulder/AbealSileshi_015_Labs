// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier

const ops = [
  {
      id: 1,
      name: "Add",
      sign : "+",
  },
  {
      id: 2,
      name: "Subtract",
      sign : "-",
  },
  {
      id: 3,
      name: "Multiply",
      sign : "*",
  }
];


app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome!" });
});

app.get("/operations" , (request, response) => {
  response.send(ops);
});

// GET (BY ID)
app.get("/operations/:id" , (request, response) => {
  const opsId = request.params.id;
  const op = ops.find(op => op.id === parseInt(opsId));
  if(!op) return response.status(404).send("The task with the provided ID does not exist.");
  response.send(op);
});

// POST, add to the list of ops
app.post("/operations", (request, response) => {

  const op = {
      id: ops.length + 1,
      name: request.body.name,
      sign: request.body.sign
  };

  ops.push(op);
  response.status(201).send(op);
});

app.post("/add", (req, res) => {
  const {num1, num2} = req.body;
  if(typeof num1 !=  "number") return res.status(405).send("Input not a number");
  if(typeof num2 !=  "number") return res.status(405).send("Input not a number");

  const add = (num1, num2) => { //defining a var add that takes two parameters
    return num1 + num2;
  }
  res.json({ status: "success", result: add(num1, num2) });
});

app.post("/divide", (req, res) => {
  const {num1, num2} = req.body;
  if(num2 == 0) return res.status(405).send("num2 is zero");
  const divide = (num1, num2) => { //defining a var add that takes two parameters
    return num1/num2;
  }
  res.json({ status: "success", result: divide(num1, num2) });
})

module.exports = app.listen(3000);
console.log('3000 is the magic port');
