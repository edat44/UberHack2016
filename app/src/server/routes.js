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
    {endpoint: '/addPerson', method: 'post', callback: addPerson},
    {endpoint: '/locations', method: 'post', callback: create('locations')},
    {endpoint: '/data/:datatype', method: 'post', callback: dataCallback}
];

//=========================
// Callback implementation
//=========================

function dataCallback(req, res, next){
    console.log(req.params);
    return res.send('ok');
}

function test(req, res, next){
    console.log('TEST CALLBACK');
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

function locations(req,res, next){
    console.log('LOCATIONS CALLBACK', req.body);
    db.collection('locations', (err, coll)=>{
        coll.insert(req.body);
        res.send("Ok");
    })

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


//========
// General callbacks

function create(collection_name){
    return function(req, res, next){
        db.collection(collection_name, (err, coll)=>{
            coll.insert(req.body);
            return res.send('OK');
        });
    };
}
