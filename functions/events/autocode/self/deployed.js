const lib = require ('lib')

let data = await lib.http.request['@1.1.7'].post({
  url: `${process.env.ASTRA_DB_BASE_LINK}`,
  
  headers: {
    'X-Cassandra-Token': `${process.env.ASTRA_DB_APPLICATION_TOKEN}`
  },
  params: {
    "name": process.env.ASTRA_DB_COLLECTION }
});

console.log(data)

// NOTE: THIS SCRIPT MIGHT SHOW THIS BELOW ERROR. DATASTAX SOMETIMES DOESNT RETURNS ANY JSON BUT CREATING COLLECTION IS SSUCCESSFUL

// RuntimeError: Expecting JSON, invalid response:
// (http/request@1.1.7/post)

// Expecting JSON, invalid response:
 // (http/request@1.1.7/post)
  //  at http.request.@1.1.7.post (/functions/events/autocode/self/deployed.js:5:45)

