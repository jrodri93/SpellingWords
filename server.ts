// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
 
import { enableProdMode } from '@angular/core';
 
import * as express from 'express';
import { join } from 'path';

var cats = [{ name: 'lilly' }, { name: 'lucy' }];
 
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
 
// Express server
const app = express();
 
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
 
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
 
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

var request = require('request');

var options = {
  method: 'GET',
  url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/swimming',
  headers: {
    'Accept': 'application/json',
    'app_id': '',
    'app_key': ''
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  }
}

const cors = require('cors')

var corsOptions = {
  origin: 'http://192.168.1.109:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
 
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
 
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
 
// TODO: implement data requests securely
app.get('/api/cats', (req, res) => {
  res.status(200).send({cats});
});

app.get('/api/word', (req, res) => {
   request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var response = JSON.parse(body);
      res.status(200).send(response);
    }
  });
})
 
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
 
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
