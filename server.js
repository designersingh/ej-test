var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    config = require('./config')[process.env.NODE_ENV || 'dev'],
    prerender = require('prerender-node');

/************************************************
        @todo: update Prerender Token
************************************************/
//app.use(require('prerender-node').set('prerenderToken', 'M8HrvGEzrtkRGgTWXZ3Q'));
app.use(express.static('./public'));



// This route enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
    res.sendFile(__dirname + config.serveDir);
});


app.listen(config.port, function (err) {
    if(err){
        console.log(err);
    }else{
        console.log('Listening on port '+ config.port);
    }
});