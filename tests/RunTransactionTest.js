const sleep = require('sleep');
const fs = require('fs');
const rimraf = require('rimraf');

const fileControl = require('../utils/FileControl')
const logger = require('../utils/Logger')
const nodeProcess = require('../utils/Process')
const apiConfig = require('../utils/APIConfig')
const comBuilder = require('../utils/CommandBuilder')

var maxTest = 15;
var maxIterations = 50;
var usedDepths = [];
var testnet = false;
var version = '1.4.2.4';
var pids = [];
var port = 14600;

//Customizable timeout 
var timeout = 180000;
var exitTime = timeout + 30000;

var loc = "./";
var neighbors = "";


/*
Optional Input parameters:

[Argument]         [Type]       [Description]

--help                          Will output help information 

--loc              [String]     Location of desired jar file 
--maxTests         [Number]     Maximum Tests/Depths  
--maxIterations    [Number]     Number of iterations per test
--neighbor         [String]     Neighbor address (must be in quotation marks) 

Coming Soon:

--testnet                       Run tests in testnet


*/
var args = [];

if(process.argv.length > 2){
    for(var x=2;x<process.argv.length;x++){
        var arg = process.argv[x];
        var argVal = process.argv[(x+1)];
        var text = "";
        
        switch(arg){
            default:
                    text += "Arguments\t\t  [Type]   Description";
                    text += "\n--loc\t\t\t  [String] Location of desired jar file\n--maxTests\t\t  [Number] Maximum Tests/Depths\n--maxIterations\t\t  [Number] Number of iterations per test\n--timeout\t\t  [Number] Desired timeout for responses\n--port\t\t   [Number] IRI port";
                    text += "\n\nExample:\njs RunTransactionTest.js --loc path/to/iri/target/ --neighbor 'udp://example.adress:port' --maxIterations 50 --maxTests 15";
                    console.log(text);
                    process.exit();
    
    /////still testing 
            case "--testnet":   
                    console.log("Testnet"); 
                    testnet = true;
                    break;
            
            case "--timeout":
                    if(typeof argVal == 'undefined' || argVal == ""){
                        console.log("Timeout argument not valid");
                        process.exit();                    
                    } 
                    timeout = argVal;
                    console.log("Timeout: "+timeout);
                    x++;
                    break;

            case "--port":
                    port = argVal;
                    if(typeof argVal == 'undefined' || argVal == ""){
                        console.log("Port argument not valid");
                        process.exit();
                        
                    }
                    x++;
                    break;

            
            case "--loc":
                    //loc code 
                    text += argVal;
                    if(text == 'undefined' || text == ""){
                        console.log("Argument not valid");
                        process.exit();
                    } 
                    loc = text;   
                    x++;                
                    break;

            case "--neighbor":
                    if(typeof argVal == 'undefined' || argVal == ""){
                        neighbors += "";                         
                    } else {
                        neighbors += '"'+argVal+'" ';
                    }  
                    x++;                  
                    break;
                  
            case "--maxTests":
                    //MT code
                    if(typeof argVal == 'undefined' || argVal == ""){
                        console.log("Max Tests");
                        console.log("Argument not valid");
                        process.exit();
                    }
                    if(argVal > 15){
                        argVal = 15;
                    }
                    maxTest = argVal;                 
                    x++;
                    break;

            case "--maxIterations":
                    //MI code
                    if(typeof argVal == 'undefined' || argVal == ""){
                        console.log("Max Iterations");
                        console.log("Argument not valid");
                        process.exit();
                    } 

                   
                    maxIterations = argVal;
                    x++;                 
                    break;
            
            case "--help":
                    text += "You may launch this code as is or input custom arguments";
                    text += "\n--loc\t\t\t  [String] Location of desired jar file\n--maxTests\t\t  [Number] Maximum Tests/Depths\n--maxIterations\t\t  [Number] Number of iterations per test\n--timeout\t\t  [Number] Desired timeout for responses\n--port\t\t   [Number] IRI port";
                    text += "\n\nExample:\njs RunTransactionTest.js --loc path/to/iri/target/ --neighbor 'udp://example.adress:port' --maxIterations 50 --maxTests 15";
                    console.log(text);
                    process.exit();          
                    
            
        }


    }

}


//Randomise depths
while(usedDepths.length < maxTest){
    var depth = Math.floor(Math.random()*(maxTest-0)+0);
    if(!usedDepths.includes(depth)){           
        usedDepths.push(depth);
    }
}

//Reset logs for tests
fileControl.redirect('../iri');
fileControl.copydb();
fileControl.makeLogDir();

//Build Command for node
var command = comBuilder.buildCommand(loc,version,port,1,testnet,false);
//Start node
nodeProcess.openNodes(command,0,pids);



//Allow node time to initiate 
sleep.sleep(60);
//Run API Tests
for(var n=0;n<maxTest;n++){
    console.log("\nMaxTests: "+maxTest+", MaxIterations: "+maxIterations);
    var testnum = n + 1;
    console.log("Test: " + testnum); 
    console.log("Depth: "+usedDepths[n] + " Test Number: " + testnum);
    apiConfig.testGetTransactions(usedDepths[n],testnum,maxIterations,port);
    sleep.sleep(10);
    
    apiConfig.getInfo(port);
    sleep.sleep(20);
}

//Test for transaction timestamps and validity as tips 
setTimeout(function(){
    apiConfig.getTimestamps(logger.compTips,port);
    apiConfig.validateTips(logger.compTips,port);
},20000);




//Wait for tests to return, then log results in log files
setTimeout(function(){ 
    
      
    fileControl.tipLog(maxTest,maxIterations);
    fileControl.milestoneLog();
    fileControl.timestampLog();
    nodeProcess.killNodes(1,pids);
  
    console.log("Log files created");
    console.log(logger.tipTimestamps);

},timeout);


//Force exit any processes that may still be running in error after tests
setTimeout(function(){
    process.exit();
},exitTime);

