/**
* server.js
*
* Entry file for express server
*
*/

const path        = require('path');
const express     = require('express');
const logger      = require('express-logger');
const compress    = require('compression');
const body_parser = require('body-parser');
const colors      = require('colors');
const routes      = require('./routes');

const PROD   = process.env.NODE_ENV === 'PROD';
const oneday = PROD?86400000:0;

let host = {
    hostname: PROD?'0.0.0.0':'127.0.0.1',
    port:     PROD?80:3000
};

let app = express();

app.use(body_parser.json());
app.use(logger({path: './dist/server/log.txt'}));
app.use(express.static(path.join(__dirname, '../client'), {maxAge: oneday}));
app.use(compress());

routes.forEach(route=>app[route.method](route.endpoint, route.callback));

app.listen(host.port, host.hostname, ListenCallback);

function ListenCallback(){
    console.log('SERVER LISTENING ON:'.gray, (host.hostname + ':' + host.port).underline.green);
}
