// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();


//require session
var session = require('express-session');
//use session
app.use(session({secret: 'codingdojorocks'}));  // string for encryption


var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//var counter = 0;

// make session available in templates
// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
        if ('counter' in req.session){
            console.log(`counter is in session, ${req.session.counter}`)
            req.session.counter += 1;
            console.log(`counter plus 1 is ${req.session.counter}`)
            res.locals.counter = req.session.counter;
            console.log(`assinged session to locals ${res.locals.counter}`);
            next();
        }
        else{
            console.log(`counter is NOT in session, ${req.session.counter}`)
            req.session.counter = 0;
            res.locals.counter = req.session.counter;
            next();
        }
  });

  
var test = 1;
// root route to render the index.ejs view
app.get('/', function(req, res) {
    console.log(`*******************RES.LOCALS.COUNTER IS: ${res.locals.counter}`)
    res.render("index",{count: res.locals.counter});   
})





// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})

// tell the express app to listen on port 8000
app.listen(5000, function() {
 console.log("listening on port 5000");
});
