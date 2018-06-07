const expect = require('chai').expect;
const assert = require('chai').assert;
const rimraf = require('rimraf');
const copydir = require('copy-dir');
const fs = require('fs');

const logger = require('./Logger');

var logDir = "./nodeTests/logs"
var transPath = "./nodeTests/logs/TestTips.txt"
var milestonePath = "./nodeTests/logs/TestMilestones.txt"
var testLogPath = "./nodeTests/logs/FullTestLog.txt"
var nodeLogPath = "./nodeTests/logs/NodeLog.txt"
var timeLogPath = "./nodeTests/logs/TipTimestampLog"

module.exports = {
    

redirect: function(loc) {
    process.chdir(loc);
},



makeLogDir: function(){
    
    try{
        rimraf.sync('./nodeTests/');
        console.log('Previous logs removed');
        }catch(err){
            console.log('Error deleting ./nodeTests, directory may not exist');
        }

    try {
        fs.mkdirSync('./nodeTests/');
        console.log('./nodeTests/ created');
        } catch(err){
            console.log('Error making directory, ./nodeTests may already exist');
        }
    

    try{
        fs.mkdirSync(logDir); 
        console.log(logDir + " created");       
    }catch(err){
        console.log("Log Directory Exists");
    }
    fs.writeFileSync(transPath,"Tip Output\n");
},


handleTestFiles: function(node,num) {
    
    assert.isString(node);
    assert.isString(num);

    rimraf.sync("./"+node+"/targetTest"+num);
    console.log("Previous " +node + " targetTest" + num + " removed");        


    try{
        fs.mkdirSync("./"+node);
        console.log("Created directory: " + node);
        } catch(err) {
            console.log(node + " Not created: " + err);
        }

   
    fs.mkdirSync("./"+node+"/targetTest"+num);
    console.log(node + "/targetTest"+ num+" created");
    
    expect("./"+node+"/targetTest"+num).to.exist;
    
    console.log("Directory pre grab: " + process.cwd());

    try{
        console.log("Trying to copy");
        copydir.sync("./target","./"+node+"/targetTest"+num);
        console.log("Copy successful");
    }catch(err){
        console.log("Copy Error: "+ err);
    }
    //redirect to node folder  
    process.chdir('./'+node+'/targetTest'+num);
    console.log("Directory pre command: " + process.cwd());
    
    expect(process.cwd()).to.include(node);
},

copydb: function() {
   
    console.log("Current Location: " + process.cwd());
    try{
        console.log("Trying to copy /target/");
        rimraf.sync("./targetTest/");
        fs.mkdirSync("./targetTest/");
        copydir.sync("./target","./targetTest/");
        console.log("Copy successful");
    }catch(err){
        console.log("Copy Error: "+ err);
    }

    
    try{
        process.chdir("./targetTest");
        rimraf.sync("./testnetdb");
        console.log("Trying to copy db");
        fs.mkdirSync("./testnetdb");
        copydir.sync("../../testnet_files/testnetdb",
                                    "./testnetdb");
        fs.writeFileSync('snapshot.txt','');
        fs.copyFileSync("../../testnet_files/snapshot.txt",
                                    "./snapshot.txt");

        console.log("Copy successful");
    } catch(err) {
         console.log(err + "\n");   
    }

 
    
},


tipLog: function(maxTest,maxIterations){
       for(var x=0;x<logger.locTip.length;x++){
            var tempTip = "";
            for(var i=0;i<16;i++){
                tempTip += logger.locTip[x][i];
            }
           logger.tipOutput.push(tempTip + " , Count: " + logger.locTipCount[x]);   
        } 
        logger.tipOutput.sort();
        var repeatTips = "\n\nRepeats between depths: \n";
        var totalTests = maxTest * maxIterations;
        var failurePerc = logger.respErrCount/totalTests*100;

        for(var x=0;x<logger.tipOutput.length;x++){       
            fs.appendFileSync(transPath,logger.tipOutput[x] +"\n");   
        }
        console.log(logger.respErrCount);
        fs.appendFileSync(transPath,"\nResponse Errors: " + logger.respErrCount + "/"+totalTests+"\nFailure Percentage: "+ failurePerc + "%");
        fs.appendFileSync(transPath,"\nInfo Errors: " + logger.infoErrCount + "/"+ maxTest+"\n");
        

        fs.appendFileSync(transPath,"\nBranch and Trunk Equal: \n");
        for(var x=0;x<logger.branchEqTrunk.length;x++){
            var equalLog = logger.branchEqTrunk[x] + "\nCount: " + logger.equalCount[x];
            fs.appendFileSync(transPath, equalLog);                
        }

        fs.appendFileSync(transPath,repeatTips);
        if(logger.repeatTips.length > 0){
            for(var x=0;x<logger.repeatTips.length;x++){
               if(logger.repeatCount[x] > 1){
                var tempRepeats = "";
                for(var i=0;i<8;i++){
                   tempRepeats += logger.repeatTips[x][i];
                 }
  
                fs.appendFileSync(transPath,(tempRepeats + "\n"));
               }  
            }   
        } else {
            fs.appendFileSync(transPath, "0 branches were equal to trunk");
        }

        fs.appendFileSync(transPath, "\nTip Validation:\n");
        for(var x=0;x<logger.tipValidator.length;x++){
            fs.appendFileSync(transPath,logger.tipValidator[x]);
        }

},

 milestoneLog: function(){
        fs.writeFileSync(milestonePath,"Milestones\n");
        
        for(var n=0;n<logger.milestones.length;n++){
            var tempMilestone = "";
                for(var i=0;i<8;i++){ 
                    tempMilestone += logger.milestones[n][i];
                }       
            fs.appendFileSync(milestonePath,tempMilestone+"\n");
        }

        fs.appendFileSync(milestonePath, "\nMilestone/Transaction Intersections: \n");
    
        for(var n=0;n<=logger.milestones.length;n++){
            if(logger.compTips.includes(logger.milestones[n])){
                var milestone = logger.compTips.indexOf(logger.milestones[n]);
                var tempMilestone = "";
                for(var i=0;i<8;i++){
                    tempMilestone += logger.compTips[milestone][i];
                }        
            fs.appendFileSync(milestonePath,tempMilestone+" Count: "+ logger.milestoneCount+"\n");
            
            }
        }

    },



    timestampLog: function(){
        var currentTime = Math.floor(Date.now()/1000)
        
        logger.transTimestamps.sort();

        fs.writeFileSync(testLogPath, "Transactions Test Log: \n");
        for(var i=0; i<logger.transTimestamps.length;i++){
             fs.appendFileSync(testLogPath, "\n" + logger.transTimestamps[i]+ "\n");
         }
      
        fs.appendFileSync(testLogPath, "\nMilestone Test Log: \n");
 
        for(var i=0; i<logger.infoTimestamps.length;i++){
            var tempInfoTimestamp = "";
            for(var x=0; x < 24;x++){
                tempInfoTimestamp += logger.infoTimestamps[i][x];
            }
            fs.appendFileSync(testLogPath, "\n" + tempInfoTimestamp+"\n");
        } 

        fs.writeFileSync(timeLogPath,"Returned Transaction Timestamps: \n");
        for(var i=0;i<logger.compTips.length;i++){
            var transAge = (currentTime - logger.tipTimestamps[i]).toFixed(2);
            var tempTrans = "";                    
            for(var x=0;x<8;x++){
                tempTrans += logger.compTips[i][x];
            }
            var tempLog = tempTrans + ", Timestamp: " + logger.tipTimestamps[i] + "\nAge: " + transAge + " Seconds\n";
            fs.appendFileSync(timeLogPath,tempLog);
        }

    },

    nodeLog: function(data) {
        fs.writeFileSync(nodeLogPath, data);   
    }

   
}
