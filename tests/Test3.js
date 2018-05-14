var CONFIG = require('../utils/Config');
var PROCESS = require('../utils/Process');
var COMMAND = require('../utils/CommandBuilder');
const assert = require('chai').assert;
const expect = require('chai').expect;

const fs = require('fs');
const rimraf = require('rimraf');
const copydir = require('copy-dir');

module.exports = {

test3: function() {

const version = "1.4.2.4";
const port = "14265";

var pids = [];


var test3 = new CONFIG({
'version': version, 
'port': port,
'testnet': false,
'unpack': true, 
'numNodes': 2
});

test3.unpack = true;

assert.isObject(test3, 'Test3 is not an object');

assert.typeOf(test3.port, 'number');



console.log("Running Test 3");
console.log("Port: " +test3.port);

//redirect to iri
try{
process.chdir('./iri');
console.log("Directory: " + process.cwd());
}catch(err) {
    console.log('chdir: ' + err);
}


for(var i=1;i<=test3.numNodes;i++){

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

var Command = COMMAND.buildCommand(test3.version,test3.port,test3.numNodes,
                                    test3.testnet,test3.unpack,node); 

assert.typeOf(Command, 'string');
console.log(Command);




//Execute -jar file command 
expect(function() {
PROCESS.openNodes(Command,i,pids); 
}).to.not.throw();

test3.port+=1;
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
PROCESS.killNodes(test3.numNodes,pids);

}, 40000);

}
}


