var ps = require('ps-list');
var fileControl = require('./FileControl');

module.exports = {

openNodes: function(command, num,pids){
    var child = "child"+num;
    var pid = child;

    var exec = require('child_process').exec, child;
    child = exec(command, 
        function(error, stdout, stderr){
            var nodeLog = 'stdout: ' + pid + "\n"+stdout;
       
            nodeLog += stderr;
            fileControl.nodeLog(nodeLog);
            
        });

    console.log("PID: " + child.pid);
    var pid = child.pid;
    pids.push(pid);
},


killNodes: function(numNodes,pids) {
    for(var i=1; i<= numNodes; i++){
        
            var child = Number(pids[i-1]);
            var child2 = child+1;
            console.log("Killing " + child + " and " + child2);
            
            try{
                process.kill(child);
                console.log("Processes " + child + " exited");
            }catch(err){
                console.log("Error exiting process: " + child + 
                ". Process may not exist");
            }
            
            try{
                process.kill(child2);
                console.log("Processes " + child2 + " exited");
            }catch(err){
                console.log("Error exiting process: " + child2 + 
                ". Process may not exist");
            }
        
        //Kill any additional node processes that may be running
        ps().then(data => {
            for(var x=0;x<data.length;x++){
                if(data[x].cmd.includes("java -jar")){              
                    console.log(data[x]);
                    try{
                        process.kill(data[x].pid);
                    }catch(err){
                        console.log("Process could not be killed, it may have already ended or it may not exist");
                    }
                }
            }
        });    
            console.log("Processes exited successfully \n");
            setTimeout(function() {
                process.exitCode;
        
            }, 1000);
       }  

    }
   
};




