/**
 * Created by Vadym Yatsyuk on 19/02/16
 */
"use strict";
import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import seed from './config/seed';

const mongodbURI = 'mongodb://localhost/football-quiz'
//const mongodbURI = 'mongodb://superuser:superpass@ds031691.mongolab.com:31691/br'
mongoose.connect(mongodbURI)
mongoose.connection.on('error', function (error) {
  console.error(`Mongodb error: ${error}`);
  process.exit(-1);
})

seed();



let app = express()
let server = http.createServer(app)
require('./config/express')(app)
require('./routes')(app)

let port = 9000

setImmediate(function () {
  server.listen(port, null, function () {
    console.log('server listening...');
  })
})