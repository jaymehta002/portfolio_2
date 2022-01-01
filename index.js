//libraries
var express = require("express");
var mongoose = require("mongoose");
var colors = require("colors");

//models
var port = process.env.PORT || 3000;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// database connection
mongoose.connect("mongodb+srv://jaymehta:jaymehta@portfolio.h76h5.mongodb.net/contact?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log(`connection succeeded`.yellow);
});

app.post("/formFillUp", (req, res) => {
  var name = req.body.name;
  var reason = req.body.reason;
  var email = req.body.email;
  var phone = req.body.phone;
  var city = req.body.city;
  var state = req.body.state;
  var message = req.body.message;

  var data = {
    name: name,
    reason: reason,
    email: email,
    phone: phone,
    city: city,
    state: state,
    message: message,
  };

  db.collection("contact").insertOne(data, 
  (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Data inserted successfully!".brightCyan);
  });

  return res.redirect("formSubmitted.html");
});

//request
app.get("/", (req, res) => {
	res.send("Hello bro!!");
});

app.get("/Home", (req, res) => {
	return res.redirect('index.html')
});

app.get('/contact', (req, res) => {
	return res.redirect('contact.html');
});

app.get('/projects', (req, res) => {
	return res.redirect('projects.html');
});

app.get('/about', (req, res) => {
	return res.redirect('about.html');
});

//starting server
app.listen(port, () => {
	console.log(`Server is running at port ${port}`.green);
});