var CONFIG = require('../utils/Config');
var PROCESS = require('../utils/Process');
var COMMAND = require('../utils/CommandBuilder');
var FILE = require('../utils/FileControl');

const assert = require('chai').assert;
const expect = require('chai').expect;

const sleep = require('sleep');

module.exports = {

    Test: function(version) {

    const port = "14265";

    var pids = [];


    var test = new CONFIG({
    'version': version, 
    'port': port,
    'testnet': true,
    'unpack': false, 
    'numNodes': 2
    });
    
    test.unpack = false;

    assert.isObject(test, 'Test 2 is not an object');
    assert.typeOf(test.port, 'number');

    console.log("Running Test 2");
    console.log("Port: " +test.port);

    //redirect to iri
    FILE.redirect('./iri');

    for(var i=1;i<=test.numNodes;i++){

        //file handling for node
        var node = "node"+i;

        FILE.handleTestFiles(node,'2');

        //Build Command for Execution 

        var Command = COMMAND.buildCommand(test.version,test.port,test.numNodes,test.testnet,test.unpack,node); 

        assert.typeOf(Command, 'string');
        console.log(Command);

        //Execute -jar file command 
        expect(function() {
        PROCESS.openNodes(Command,i,pids); 
        }).to.not.throw();
        
        test.port+=1;
        FILE.redirect("../../");
        console.log("Directory post command: " + process.cwd()+ "\n\n");
        }

        //redirect back to main folder
        FILE.redirect('../');
        expect(process.cwd()).to.not.include('iri');

        sleep.sleep(40);
        PROCESS.killNodes(test.numNodes,pids);

    }   
}


