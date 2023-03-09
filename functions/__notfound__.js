// Define lib and path

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN})

const path = context.path[0];
if (path.length > 2) {
const { createClient } = require("@astrajs/collections");

// create an {astra_db} client
const astraClient = await createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
});

// create a shortcut to the users collection in the app namespace/keyspace
// collections are created automatically
const Collection = astraClient.namespace("main").collection("files");

// Warn the Requested path in cconsole

console.warn(`[ REQUEST ] ${path} ${path.length}`);

// Get current Path Astra DOCUMENT ID from Keyvalue SStore

let doc = await lib.keyvalue.store['@0.1.16'].get({
  key: `cs-${path}`
});


const html = await Collection.get(doc);
// Object Keys should'nt be more than 1 Else it will throw err
let spp = Object.keys(html).length;

if (spp > 1) {
  return "Invalid Path"
  }
  
  // Hit data in console and return
console.warn(` [ DATA RECEIVED ] ${JSON.stringify(html)} `)
return {
  headers: {
    "User-Agent": "Autocode"
  },
  body: Buffer.from(html.html)
}
}
// For other errors No paths are specified. 
else {
  return "No Paths Specified"
}