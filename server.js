// Setup empty JS object to act as endpoint for all routes
projectData ={};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();
const bodyParser=require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
// const { request } = require('http');
// const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port=3000;

// Setup Server
const server = app.listen(port, ()=>{console.log(`running on server ${port}`)});


//GET
app.get('/allData',(request,response)=>{
    response.send(projectData);
    console.log(projectData);
});
//POST
app.post('/addData',(request,response)=>{
    console.log(request.body);
    projectData={
        date: request.body.date,
        temperature: request.body.temperature,
        userResponse: request.body.userResponse
    };
    response.send(projectData);
});