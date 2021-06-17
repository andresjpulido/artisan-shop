'use strict'

function echo(req, res){
    console.log(req.params.echo + " " + req.body);
    res.send("echo:" + req.params.echo);
}

function test(req, res){
    console.log(req.params + " " + req.body);
    res.send("Hello world");
}



      
module.exports = {
    echo, test
}