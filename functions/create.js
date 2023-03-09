// Define Stuffs

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN})


let path = context.params.path
let html = context.params.html

// Astra Link

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


// Action Time
const docastra = await Collection.create({
  html: html,
});
// SET DATA IN KEYVALUE STORE
let keyvr = await lib.keyvalue.store['@0.1.16'].set({
  key: `cs-${path}`,
  value: `${docastra.documentId}`
});

return {
  "keyvalue-result": keyvr,
  "astra_res_data": docastra,
  "res_status_code": 200,
  "inputs": {
    path: path,
    html: html
  },
}
