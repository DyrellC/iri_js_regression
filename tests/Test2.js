var CONFIG = require('../utils/Config');
var PROCESS = require('../utils/Process');
var COMMAND = require('../utils/CommandBuilder');
var assert = require('chai').assert;


module.exports = {

test2: function() {

const version = "1.4.2.4";
const port = "14265";

var pids = [];


var test2 = new CONFIG({
'version': version, 
'port': port,
'testnet': true,
'unpack': false, 
'numNodes': 1
});

console.log("Running Test 2");


for(var i=1;i<=test2.numNodes;i++){
//Build Command for Execution 
var Command = COMMAND.buildCommand(test2.version,test2.port,test2.numNodes,
                                    test2.testnet,test2.unpack); 

console.log(Command);

//Execute -jar file command 
PROCESS.openNodes(Command,i,pids);
test2.port+=1;
}


setTimeout(function() {
PROCESS.killNodes(test2.numNodes,pids);     
}, 20000);


}
}







