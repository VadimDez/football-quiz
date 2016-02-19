/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

"use strict";


import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var mongoStore = connectMongo(session);

export default function(app) {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(session({
    secret: 'football-quiz',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'football-quiz'
    })
  }));

  app.set('appPath', path.join(path.normalize(__dirname + '/..'), 'client'));
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(path.normalize(__dirname + '/..'), '.tmp')));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));
  app.use(errorHandler()); // Error handler - has to be last

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });
}