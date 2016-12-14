var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
 
mongoose.connect('mongodb://root:123@ds159767.mlab.com:59767/showtimes');
 
var Resource = app.resource = restful.model('resource', mongoose.Schema({
    date: { type: Date},
	cenima:String,
imgLink:String,
movieName:String,
description:String,
cast:String,
directorName:String,
trailerLink:String,
rating:String,
_2d_3d:String,
screen:String,
timing:String,
runningTime:String,
Genre:String,
ReleaseDate:String
  }))
  .methods(['get', 'post', 'put', 'delete']);
 
Resource.register(app, '/resources');
 var port=process.env.PORT;
app.listen(port);
