const express = require('express');
const fortune =require('./lib/fortune.js');

const app = express();

//handlebars view engine
const handlebars = require('express-handlebars').create({ defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//set 'showTests' context property if jquery contains test=1
app.use( (req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

//body-parser
app.use(require('body-parser') () );

//mocked Weather data

getWeatherData()=>{
  return{
    locations: [
      {
        name: 'Portland',
        forcastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Overcast',
        temp: '54.1 F (12.3 C)',
      },
      {
        name: 'Bend',
        forcastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Partly Cloudy',
        temp: '55.0 F (12.8 C)',
      },
      {
        name: 'Manzanita',
        forcastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Light Rain',
        temp: '55.0 F (12.8 C)',
      },
    ],
  };
}
//middlewrae for getWeatherData
app.use( (req,res, next)=>{
  if(!res.locals.partials) res.locals.partials ={};
  res.locals.partials.weather = getWeatherData();
  next();
});
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
