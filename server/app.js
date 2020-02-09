var express = require("express"),
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");

var path = require('path') 

if (process.env.NODE_ENV !== 'production') {
  const fs = require('dotenv').config({ 'path':'server/config/.env' });
  console.log(fs)
}

const cors = require('cors'); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const api = require('./routes');

app.set('port' , process.env.PORT || 4000)
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/store', (req,res) => {
  res.send(express.static(path.join(__dirname, '../client/build/index.html')))
})
app.use('/api', api)
 
console.log("Loading API ...")
for(var i =0; i < api.stack.length; i ++){
  console.log("     http://localhost:" + app.get('port') + api.stack[i].route.path)
}

app.listen(app.get('port'), function() {
  console.log("Node server running on http://localhost:" + app.get('port'));
});