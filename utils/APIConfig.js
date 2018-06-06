const fs = require('fs');
const api = require('./API');

module.exports = {

getInfo: function(port){
    api.getNodeInfo(port);
},

testGetTransactions: function(depth,testnum,maxIterations,port){
        depth = depth + 1;
        var path = "./nodeTests/iotaNodeTest"+testnum+"_Depth"+depth+".txt"
        var testPrefix = "Test "+testnum + ": ";
        fs.writeFileSync(path,"");
        console.log(path);
   
        for(var i = 0; i<maxIterations; i++){
            api.getTransactionsToApprove(depth,path,testPrefix,testnum,port);
 
            console.log("Test: " + (i+1) + " requested");
        }
},

getTimestamps: function(transactions,port){
    api.getTrytes(transactions,port);
},

validateTips: function(transactions,port){
    for(var x=0;x<transactions.length;x++){
        api.getTransactions(transactions[x],port);
    }
}


}
