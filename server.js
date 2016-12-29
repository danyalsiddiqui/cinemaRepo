var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
 sql = require('mssql'),
    mongoose = restful.mongoose;
var app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
 app.set('JSON_CALLBACK', 'callback');
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
 var port=process.env.PORT||3001;
app.listen(port);


/////////////////////////////////


app.get('/listData', function (req, res) {

  sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
    // Query

    new sql.Request().query('select * from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData]').then(function(recordset) {
      res.jsonp(recordset);
    }).catch(function(err) {
      // ... query error checks
      console.log(err);
    });});

 /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    res.end( data );
  });*/
})
