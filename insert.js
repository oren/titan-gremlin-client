var gremlin = require('gremlin-client');
var client = gremlin.createClient(8182, 'localhost');

var script = 'g.addV(name)'
var bindings = {'name': 'kelly'};
var query = client.stream(script, bindings);

// var script = 'g.addV("name", "kelly")';
// var query = client.stream(script);

query.on('data', function(result) {
  console.log('result', result);
});

query.on('end', function() {
  console.log("All results fetched");
});
