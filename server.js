// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
const port = 8000;
// Spin up the server
// Callback to debug

// Initialize all route with a callback function
const server = app.listen(port, () => {
  console.log(`running on localhost : ${port}`);
});
// Callback function to complete GET '/all'
//const projectData = {};

app.get("/all", sendData);
function sendData(request, response) {
  response.send(projectData);
}

// Post Route

app.post("/addWeather", addWeather);

function addWeather(request, response) {
  console.log(request.body);

  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.userResponse = request.body.userResponse;
  response.send({ msg: "data posted successfully" });

  console.log(projectData);
}
