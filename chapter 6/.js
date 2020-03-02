//  API

//simple GET endpoint returning only json
app.get('/api/tours', (req,res)=>{
  res.json(tours);
});

//GET endpoint that returns JSON, XML or TEXT
app.get('/api/tours', (req, res)=>{
  var toursXml = '<?xml version="1.0"?><tours>' + products.map((p)=>{
    return '<tour price="' + p.price + '" id="' + p.id + '">' + p.name + '</tours>';
  }).join('') + '</tours>'';
  var toursText = tours.map((p)=>{
    return p.id + ': '+ p.name + '(' + p.price + ')';
  }).join('\n');
  res.format({
    'aplicacion/json': () =>{
      res.json(tours);
    },
    'aplicacion/xml': ()=>{
      res.type('applicacion/xml');
    },
    'text/plain': ()=>{
      res.type('text/plain');
      res.send(toursXml);
    }
  });
});
