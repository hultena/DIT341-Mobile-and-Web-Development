var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRoute = require('./routes/users');
const ingredientsRoute = require('./routes/ingredients');
const recipesRoute = require('./routes/recipes');

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});
// Create Express app
var app = express();
// Add session to app
app.use(session({
    secret: process.env.SECRET || 'secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));

// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080',
        process.env.VUE_APP
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

// Parse requests of content-type 'application/json'
app.use(bodyParser.json({limit: '2mb'}));

// Router middleware
app.use('/api/users', usersRoute);
app.use('/api/ingredients', ingredientsRoute);
app.use('/api/recipes', recipesRoute);

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'See if heroku works'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler for duplicate keys
app.use(function (err,req,res,next){
    if(err.name === 'MongoError' && err.code === 11000){
        const key = Object.keys(err.keyValue)[0];
        const err_res = {};
        err_res[key]=`${key} already in use.`;
        res.status(400).json(err_res);
    }else {
        next(err);
    }
});

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// error handler for too large payloads
app.use( function(err, req, res, next){
    if(err.type === 'entity.too.large'){
        res.status(413).json({message: "Entity too large"})
    } else {
        next(err);
    }
})
// Error handler for other previously unhandled errors.
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
