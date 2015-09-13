var gremlin = require('gremlin-client');
var client = gremlin.createClient(8182, 'localhost');

var query = client.stream('g.addV("bela", "menere")');

query.on('data', function(result) {
  console.log('result', result);
});

query.on('end', function() {
  console.log("All results fetched");
});


