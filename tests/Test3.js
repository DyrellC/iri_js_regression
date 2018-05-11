var CONFIG = require('../utils/Config');
var PROCESS = require('../utils/Process');
var COMMAND = require('../utils/CommandBuilder');
var assert = require('chai').assert;

module.exports = {

test3: function() {

const version = "1.4.2.4";
const port = "14265";

var pids = [];


var test1 = new CONFIG({
'version': version, 
'port': port,
'testnet': true,
'unpack': true, 
'numNodes': 1
});

assert.isObject(test1, 'Test1 is not an object');

assert.typeOf(test1.port, 'number');



console.log("Running Test 3");
console.log(test1.port);


for(var i=1;i<=test1.numNodes;i++){
//Build Command for Execution 

var Command = COMMAND.buildCommand(test1.version,test1.port,test1.numNodes,
                                    test1.testnet,test1.unpack); 

assert.typeOf(Command, 'string');
console.log(Command);

//Execute -jar file command 
PROCESS.openNodes(Command,i,pids);
test1.port+=1;
}


setTimeout(function() {
PROCESS.killNodes(test1.numNodes,pids);     
}, 20000);

}
}


