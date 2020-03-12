//  API

var tours = [
  {id: 0, name: 'hood river', price: 99.99 },
  {id: 1, name: 'oregon Coast', price: 149.95},
];
//simple GET endpoint returning only json
app.get('/api/tours', (req,res)=>{
  res.json(tours);
});

//GET endpoint that returns JSON, XML or TEXT
app.get('/api/tours', (req, res)=>{
  var toursXml = '<?xml version="1.0"?><tours>' + products.map((p)=>{
    return '<tour price="' + p.price + '" id="' + p.id + '">' + p.name + '</tours>';
  }).join('') + '</tours>'';
  var toursText = tours.map( (p)=>{
    return p.id + ': ' + p.name + '(' + p.price + ')';
  }).join('\n');
  //res.format method in express to respond according to the preferences of the cliente
  res.format({
    'aplicacion/json': () =>{
      res.json(tours); },
    'aplicacion/xml': ()=>{
      res.type('applicacion/xml'); },
    'text/plain': ()=>{
      res.type('text/plain');
      res.send(toursXml); }
  });
});

//endpoint for updating
app.put('/api/tour/:id', (req, res)=>{
  var p = tours.some((p)=>{ return p.id == req.params.id});
  if (p){
    if(req.query.name) p.name = req.query.name;
    if(req.query.price) p.price = req.query.price;
    res.json({success: true});
  }
});

//DEL endpoint for deleting
api.del('api/tour/:id', (req, res)=>{
  var i;
  for(var i=tours.length-1; i>=0; i--)
  if (tours[i].id == req.params.id ) break;
  if(i>=0){
    tours.splice(i, 1);
    res.json({success: true}); }
    else{ res.json({error: 'No such tour exists.'}); }
});
