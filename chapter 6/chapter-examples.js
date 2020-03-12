//  EXAMPLES


//basic usage
app.get('/about', (req, res)=>{
res.render('about');
});

//response code other than 200
app.get('/error', (req, res)=>{
  res.status(500);
  res.render('error');
});

//on one line
app.get('/error', (req, res)=>{
  res.status(500).render('error');
});

//passing a context to a view, including querystring cookie and session values
app.get('/greeting', (req, res)=>{
  res.render('about', {
    message: 'Welcome',
    style: req.query.style,
    userid: req.cookie.userid,
    username: req.session.username,
  });
});

//rendering a view without a layout
//file must have all the html elements necessary
app.get('/no-layout', (req, res=>{
  res.render('no-layout', {layout: 'null' });
});

//rendering a view with a custom layout
app.get('/custom-layout', (req, res)=>{
  res.render( 'custom-layout', {layout: 'custom' });
});

//rendering plain context output
app.get('/test', (req, res)=>{
  res.type('text/plain');
  res.send('this is a test');
});

//adding an error handler
app.use((err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).render('error');
});

//adding a 404 handler
app.use((req, res)=>{
  res.status(404).render('not-found');
});
