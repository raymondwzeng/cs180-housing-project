var express = require('express');

var api = require('./routes/api')
var cache = require('./routes/cache')
var bodyParser = require('body-parser')
var cors = require('cors');
const { OperationsLayer } = require('./operations');

var app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use(express.json()) 
app.use('/api', api)
app.use('/cache', cache)

app.get('/', (req, res) => {
  res.send("Hello, world! This is a landing page placeholder for our actual page. Someday.")
})

app.listen(PORT, () => {
  new OperationsLayer()
  console.log("Listening...")
})

