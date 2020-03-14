const express = require('express');
const fortune =require('./lib/fortune.js');
const formidable = require('formidable'); //npm install --save formidable
const jqupload = require('Jquery-file-upload-middleware'); //npm install --save jquery-file-upload-middleware
const credentials = require('./credentials.js'); //npm install --save cookie-parser
/* var monster = req.cookies.monster;
var signedMonster = req.signedCookies.monster; */
const app = express();

//static middleware
app.use(express.static(__dirname + '/public'));
app.use( (req, res, next)=>{
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.use(require('body-parser') () );

app.use('/upload', (req, res, next)=>{
  var now = Date.now();
  jqupload.fieldHandler({
    uploadDir: ()=>{
      return _dirname + '/public/uploads/' + now;
    },
    uploadUrl: ()=>{
      return '/uploads/' + now;
    },
  })(req, res, next);
});

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session') () ); //npm install --save express-session
//handlebars view engine
const handlebars = require('express-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

//TO DISPLAY FLASH MESSAGES
app.use( (req, res, next)=>{
  //if there's a flash message, transfer it to the context, then clear
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

//routes for templates
app.get('/', (req, res)=>{
  res.render('home');
  /*you can set a cookie or signed cookie anywhere you have access
  to a request object, example as shown below*/
  res.cookie('monster', 'nom nom');
  res.cookie('signed_monster', 'nom nom', {signed: true});
  res.clearcookie('monster'); //to delete cookie
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

app.get('/newsletter', (req, res)=>{
  res.render('newsletter', { csrf: 'CSRF token goes here'});//dummy value
});
app.post('/process', (req, res)=>{
  if(req, xhr || req.accepts('json,html')=== 'json'){
    res.send({ success: true});
  } else{
    res.redirect(303, '/thank-you');
  }
  //  console.log('Form (from querystring): '+ req.query.form);
  //  console.log('CSRF token (from hidden form field): '+ req.body._csrf);
  //  console.log('Name (from visible form field): ' + req.body.name);
  //  console.log('Email (from visible form field): ' + req.body.email);
  //  res.redirect(303, '/thank-you');
});

app.get('/contest/vacation-photo/:year/:month', (req, res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files)=>{
    if(err) return res.redirect(303, '/error');
    console.log('recieved fields:');
    console.log(fields);
    console.log('recieved files:');
    console.log(files);
    res.redirect(303, '/thank-you');
  });
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
