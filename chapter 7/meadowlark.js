const express = require('express');
const fortune =require('./lib/fortune.js');
const app = express();

//static middleware
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});
app.use(require('body-parser')());

//handlebars view engine
const handlebars = require('express-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

//routes for templates
app.get('/', (req, res)=>{
  res.render('home');
});

app.get('/about', (req, res)=>{
  res.render('about',{fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' } );
});

app.get('/tours/hood-river', (req, res)=>{
  res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', (req, res)=>{
  res.render('tours/request-group-rate');
});

aap.get('/newsletter', (req, res)=>{
  res.render('newsletter', { csrf: 'CSRF token goes here'});//dummy value
});
app.post('/process', (req, res)=>{
  console.log('Form (from querystring): '+ req.query.form);
  console.log('CSRF token (from hidden form field): '+ req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thank-you');
});
//404 catch-all handler (middleware)
app.use((req, res)=>{
  res.status(404);
  res.render('404');
});
//500 error handler (middleware)
app.use((req, res, next)=>{
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), ()=>{
  console.log('Express started on http://localhost:' + app.get('port')+'; press Ctrl-C to terminate');
});
