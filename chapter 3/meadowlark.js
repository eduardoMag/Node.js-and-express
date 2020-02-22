var express = require('express');
var fortune =require('./lib/fortune.js');
var app = express();

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

/* file created for this array
var fortunes = [
  "Conquer and Destroy!",
  "Who is They? And Why Me?",
  "I challenge you to a Pokemon Battle!",
  "Smell ya laters.",
  "Now is not the time nor place.",
  "Try again if it does work the first time.",
]; */

//static middleware
app.use(express.static(__dirname + '/public'));
//new routes for templates
app.get('/', function(req, res){
  res.render('home');
});
app.get('/about', function(req, res){
  res.render('about',{fortune: fortune.getFortune() } );
});

//404 catch-all handler (middleware)
app.use(function(req, res){
  res.status(404);
  res.render('404');
});
//500 error handler (middleware)
app.use(function(req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
/*
//adding routes
app.get('/', function(req, res){
  res.type('text/plain');
  res.send('Meadowlark Travel');
});
app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});
//custom 404 page
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});*/

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port')+'; press Ctrl-C to terminate');
});
