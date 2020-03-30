const express = require('express');
const http = require('http');
const fs = require('fs');
const port = 5092;

const server = http.createServer(function(req, res) {
    console.log(req.url)
    res.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    // fs.readFile('src/client/html/index.html', function(error, data) {
    fs.readFile('src/client/html' + req.url, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Error: File Not Found!');
            res.end()
        } else {
            // res.writeHead(200);
            res.write(data);
            res.end()
        }
    });
    // res.write("Hello World!")
});

server.listen(port, function(error) {
    if (error) {
        console.log("Something Went Wrong", error)
    } else {
        console.log(`Server listening at ${port}`);
    }
});