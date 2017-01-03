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

// to get the schedule details
app.get('/listData', function (req, res) {

  sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
    // Query

    new sql.Request().query('select * from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData]').then(function(recordset) {
      //console.dir(recordset);
     res.jsonp(recordset);
    }).catch(function(err) {
      // ... query error checks
      console.log(err);
    });});


})

// to get the movies Details
app.get('/getMovies', function (req, res) {

    sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
        // Query

        new sql.Request().query('select movieName from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData] group by movieName').then(function(recordset) {
            //console.dir(recordset);
           res.jsonp(recordset);
        }).catch(function(err) {
            // ... query error checks
            console.log(err);
        });});


})


// to get the movies Details of specific movie
app.get('/getMoviesbyMovieName/:movieName', function (req, res) {
var movieName=req.params.movieName;
    var queryStr='select * from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData] where  movieName=@movieName_parm';

    sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
        // Query
        new sql.Request().input('movieName_parm',sql.NVarChar(),movieName).query(queryStr).then(function(recordset) {
            //console.dir(recordset);
            res.jsonp(recordset);
        }).catch(function(err) {
            // ... query error checks
            console.log(err);
        });});
})


// to get the movies Details of specific Cenima
app.get('/getMoviesbyCenimaName/:cenima', function (req, res) {
    var cenima=req.params.cenima;
    var queryStr='select * from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData] where  cenima=@cenima_parm';

    sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
        // Query
        new sql.Request().input('cenima_parm',sql.NVarChar(),cenima).query(queryStr).then(function(recordset) {
            //console.dir(recordset);
            res.jsonp(recordset);
        }).catch(function(err) {
            // ... query error checks
            console.log(err);
        });});
})


// to get all the  Cenima
app.get('/getCenima', function (req, res) {
    var queryStr='select cenima from [db691ac76773fd41bc99dea65f007b6261].[dbo].[ScheduleData] group by cenima';

    sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
        // Query
        new sql.Request().query(queryStr).then(function(recordset) {
            //console.dir(recordset);
            res.jsonp(recordset);
        }).catch(function(err) {
            // ... query error checks
            console.log(err);
        });});
})


app.get('/filterByCenimaAndDate', function(req, res) {
    var movie = req.param('movie');
    var date = req.param('date');
    var queryStr='exec SP_FilterOnCenimaAandDate @movieName_parm,@date';

    sql.connect("Server=691ac767-73fd-41bc-99de-a65f007b6261.sqlserver.sequelizer.com;Database=db691ac76773fd41bc99dea65f007b6261;User ID=lkagkpksojppoyei;Password=8RncMgsmVu6eu2VCvRsSGQJPgNpcK6YykEYnvRbFD8YJcyLibYVLAqEqgE48YpHY;").then(function() {
        // Query
        new sql.Request().input('movieName_parm',sql.NVarChar(),movie).input('date',sql.Date,date).query(queryStr).then(function(recordset) {
            //console.dir(recordset);
            res.jsonp(recordset);
        }).catch(function(err) {
            // ... query error checks
            console.log(err);
        });});

});
