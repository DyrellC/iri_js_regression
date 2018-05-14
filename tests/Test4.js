var CONFIG = require('../utils/Config');
var PROCESS = require('../utils/Process');
var COMMAND = require('../utils/CommandBuilder');
const assert = require('chai').assert;
const expect = require('chai').expect;

const fs = require('fs');
const rimraf = require('rimraf');
const copydir = require('copy-dir');

module.exports = {

test4: function() {

const version = "1.4.2.4";
const port = "14265";

var pids = [];


var test4 = new CONFIG({
'version': version, 
'port': port,
'testnet': true,
'unpack': true, 
'numNodes': 1
});

assert.isObject(test1, 'Test1 is not an object');

assert.typeOf(test1.port, 'number');



console.log("Running Test 1");
console.log("Port: " +test1.port);

//redirect to iri
try{
process.chdir('./iri');
console.log("Directory: " + process.cwd());
}catch(err) {
    console.log('chdir: ' + err);
}


for(var i=1;i<=test1.numNodes;i++){

//file handling for node
var node = "node"+i;

try{
rimraf.sync("./"+node)
console.log("Previous " +node + " removed");
} catch(err) {
    console.log("Sync: " + err);
}

try{
    fs.mkdirSync("./"+node);
    fs.mkdirSync("./"+node+"/target/")
    console.log("Created directory: " + node);
 } catch(err) {
    console.log(node + " Not created: " + err);
 }

 console.log("Directory pre grab: " + process.cwd());

try{
console.log("Trying to copy");
copydir.sync("./target","./"+node+"/target/");

// var cpy = fs.readdirSync("./target");
 console.log("Copy successful");
} catch(err) {
    console.log("Error with copy: " + err);   
}





//redirect to node folder
try{
process.chdir('./'+node);
console.log("Directory pre command: " + process.cwd());
}catch(err) {
    console.log('chdir: ' + err);
}


//Build Command for Execution 

var Command = COMMAND.buildCommand(test1.version,test1.port,test1.numNodes,
                                    test1.testnet,test1.unpack,node); 

assert.typeOf(Command, 'string');
console.log(Command);




//Execute -jar file command 
expect(function() {
PROCESS.openNodes(Command,i,pids); 
}).to.not.throw();

test1.port+=1;
process.chdir("../");
console.log("Directory post command: " + process.cwd());
}

//redirect back to main folder
try{
process.chdir('../');
console.log("Directory" + process.cwd());
}catch(err) {
    console.log('chdir: ' + err);
}



setTimeout(function() {
PROCESS.killNodes(test1.numNodes,pids);

}, 40000);

}
}


