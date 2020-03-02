//  EXAMPLES


//basic usage
app.get('/about', function(req, res){
res.render('about');
});

//response code other than 200
app.get('/error', function(req, res){
  res.status(500);
  res.render('error');
});

//on one line
app.get('/error', function(req, res){
  res.status(500).render('error');
});

//passing a context to a view, including querystring cookie and session values
app.get('/greeting', function(req, res){
  res.render('about', {
    message: 'Welcome',
    style: req.query.style,
    userid: req.cookie.userid,
    username: req.session.username,
  });
});

//rendering a view without a layout
//file must have all the html elements necessary
app.get('/no-layout', function(req, res){
  res.render('no-layout', {layout: 'custom' });
});

//rendering a view with a custom layout
app.get('/custom-layout', function(req, res){
  res.render( 'custom-layout', {layout: 'custom' });
});

//rendering plain context
app.get('/test', function(req, res){
  res.type('text/plain');
  res.send('this is a test');
});

//adding an error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).render('error');
});

//adding a 404 handler
app.use(function(req, res){
  res.status(404).render('not-found');
});


//  FORMS

//basic form processing
app.post('/process-contact', function(req, res){
  console.log('Received contact from '+req.body.name+' <'+req.body.email+'>');
//save to database...
res.redirect(303, '/thank-you');
});

//more robust form processing
app.post('/process-contact', function(req, res){
  console.log('Received contact from '+req.body.name+' <'+req.body.email+'>');
  try{
    //save to database...
    return res.xhr ?
    res.render({success: true}) :
    res.redirect(303, '/thank-you');
  } catch(ex){
    return res.xhr ?
    res.json({error: 'Database error'}) :
    res.redirect(303, '/database-error');
  }
});
