"use strict";

var fs = require("fs"),
    path = require("path"),
    es = require("event-stream"),
    compression = require('compression'),
    mime = require('mime-types');

module.exports = function(app) {
    app.use(compression());
    
    return function(filename){
        filename = fs.realpathSync(filename);
        var lines = "";
        
        return function(req, res, next){            
            fs.stat(filename, function(err, stats){
                res.status(200).set({
                    'Content-Type': mime.lookup(filename),
                    'Content-disposition': 'attachment;filename=' + filename,
                    'File-size': stats.size
                });
                    
                fs.createReadStream(filename).pipe(es.split()).pipe(es.mapSync(function(line){ 
                    lines += line + "\n";
                }).on('end', function () {  
                    lines = lines.substr(lines, lines.length-2);
                    res.send(new Buffer(lines, 'binary')); 
                }));
            });
        };
    };
};