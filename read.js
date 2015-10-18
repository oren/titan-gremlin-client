var gremlin = require('gremlin-client');
var client = gremlin.createClient(8182, 'localhost');

var script = 'g.V()';
var bindings = {id: "t3-3aw-1l1"};
var query = client.stream(script, bindings);

query.on('data', function(result) {
  if (result) {
    console.log('result', result.properties);
    return;
  }

  console.log('no results');
});

query.on('end', function() {
  console.log("All results fetched");
});
