const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const Joi = require('joi')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express');
const app = express()  // returns an express object which reprsents our application in express or in terms of express or application in express way

// We set the settings related to our application using set()
app.set('view engine','pug')
//app.set('views','./views') // it will check for the views in the views folder by default

// now we get a representation of app in this express environment
// so we create a server application with this app representation

//Middleware
// A Middleware is a function or method that takes in a request object and either returs a response to a client or passes control to other middleware in the request processing pipeline
// we are using use() to install middleware into the request processing pipeline
//Or more abstractly, It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

// The express.json() function is a built-in middleware function in Express. It parses incoming requests for JSON payloads 
// or  recognize the incoming Request Object as a JSON Object.
// Express doesn't parse HTTP request bodies by default, but it does have a built-in middleware that populates the req.body property with the parsed request body. 
//app.use(express.json()) is how you tell Express to automatically parse JSON request bodies for you.
//You NEED express.json() and express.urlencoded() for POST and PUT requests, 
//because in both these requests you are sending data (in the form of some data object) to the server
// and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

app.use(express.json())// this gives / returns a function which is a middleware which does the actual stuff
app.use(express.urlencoded({extended:true})) //key=value&key=value 
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses',courses)
app.use('/',home)

// Configurations
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
//console.log(`Mail Password: ${config.get('mail.password')}`);


// console.log(`${process.env.NODE_ENV}`);
//  We want to enable morgan only on the development machine
// So, we want to know or get the current environment and enable things accordingly
if (app.get('env') === 'development') {
    app.use(morgan('dev'))
    console.log('Morgan enabled...');
}

app.use(logger)

app.use(function(req,res,next){
    console.log("Authenticating...");
    next()
})



// now we can register various routes for accessing services from this server routerlication


// app.get('/api/courses/blogs/:month/:year',(req,res) =>{
//     res.send(req.query)
// })
app.listen(5000, () => console.log("Listening on port 5000..."))

// so it is serving our requests via endpoints and hence acts as web server 
