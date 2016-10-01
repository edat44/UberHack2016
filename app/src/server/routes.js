/**
* routes.js
*
* Callback implementation for app API endpoints.
*
*/

//======================
// Constant definitions
//======================

// Packages
const mongodb   = require('mongodb');
let ObjectId    = mongodb.ObjectId, db;

// Prepends all API endpoints (e.g. /test -> /api/v1/test)
const api_prefix = '/api/v1'

// Associate all endpoints with respective HTTP method and callback
const routes = [
    {endpoint: '/test', method: 'get', callback: test},
    {endpoint: '/addPerson', method: 'post', callback: addPerson}
];

//=========================
// Callback implementation
//=========================

function test(req, res, next){
    db.collection('test', (err, coll)=>{
        if(err || !coll)
            return res.status(500).send('Unable to access test collection.');
        else coll.find().toArray((err, data)=>{
            if(err || !data.length)
                return res.status(500).send('No data in test collection.');
            return res.json(data);
        });
    });
}

function addPerson(req, res, next) {
  console.log("ADDING PERSON");
}

//===============================
// DB connect, set module export
//===============================

mongodb.connect('mongodb://localhost:27017/app', (err, connection)=>{
    db = connection;
    console.log('SUCCESSFUL MONGO CONNECTION');
});

module.exports = routes.map(route=>{
    return {
        endpoint: api_prefix + route.endpoint,
        method:   route.method,
        callback: route.callback
    };
});
