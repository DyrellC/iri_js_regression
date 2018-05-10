

module.exports = {

openNodes: function(command, num,pids){
    var child = "child"+num;

    var exec = require('child_process').exec, child;
    child = exec(command, 
        function(error, stdout, stderr){
            console.log('stdout: ' + stdout);
       
            console.log("stderr: " + stderr);
            

            if(error !== null) { 
                console.log("exec error: " + error);
            }
        });

    console.log("PID: " + child.pid);
    var pid = child.pid;
    pids.push(pid);
    console.log(pids);
},


killNodes: function(numNodes,pids) {
    for(var i=1; i<= numNodes; i++){
        
            var child = Number(pids[i-1]);
            var child2 = child+1;
            console.log("Killing " + child + " and " + child2);
        
            process.kill(child);
            process.kill(child2);
        
            console.log("Processes " + child + " and " + child2 + " exited");
            setTimeout(function() {
                process.exitCode;
        
            }, 1000);
       }  

    }
   
};

/*
execute.prototype.setParams = function(vars) {
    vars = vars || {};

    this.pid = vars.pid;
    this.port 
}
*/



