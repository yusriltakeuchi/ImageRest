var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

app.get('/images', function(req, res){
    getAllFile(function(err, images) {
        if (err){
            res.json({
                'status':'ERROR',
                'messages':err
            });
        }
        var data = [];
        for(var i=0; i<images.length; i++){
            data.push({
                'id':i+1,
                'name':images[i]
            });
        }
        res.json({
            "status":"OK",
            "code":200,
            "data":data
        });
    });
})

function getAllFile(callback){
    var dir = __dirname + "/images";
    fs.readdir(dir, function(err, files){
        if (err){
            callback("Unable to scan directory: " + err);
        }
        callback(null, files);
    });
}

function getLastFileName(callback){
    var dir = __dirname + "/images";
    fs.readdir(dir, function(err, files) {
        if (err){ 
            callback("Unable to scan directory: " + err);
        }
        
        if (files.length > 0){
            callback(null, files[files.length-1].split("."));
        } else {
            callback("Folder is empty!");
        }
    })
}

app.post('/images', function(req, res) {
    //Get last image from directory
    getLastFileName(function(err, lastFile) {
        var filenames = __dirname + "/images/";
        if (err){
            filenames = filenames 
                + "image-1.png";
        } else {
            filenames = filenames 
            + lastFile[0].replace(lastFile[0], "image-" 
            + (parseInt(lastFile[0].split("-")[1])+1).toString())
            + "." + lastFile[1];
        }
        //Create File Uploader object
        var form = new formidable.IncomingForm();
        //Parsing request
        form.parse(req);
        form.on("fileBegin", function(name, file){
            file.path = filenames;
        });

        form.on('file', function(name, file) {
            console.log("Uploaded " + filenames);
        });
        res.json({
            'status' : 'OK',
            'code' : 201
        });
    });
});

app.listen(3000, function(){
    console.log("Server Running on host: 127.0.0.1:3000");
});