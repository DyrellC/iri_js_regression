

module.exports = {

openNodes: function(command, num,pids){
    var child = "child"+num;

    var exec = require('child_process').exec, child;
    child = exec(command, 
        function(error, stdout, stderr){
            console.log('stdout: ' + stdout);
       
            console.log(stderr + "\n");
            
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
        
            console.log("Processes exited successfully \n");
            setTimeout(function() {
                process.exitCode;
        
            }, 1000);
       }  

    }
   
};




