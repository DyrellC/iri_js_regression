const logger = require('./Logger')
const request = require('request');
const fs = require('fs');



module.exports = {

getNodeInfo: function(port){
        
        var command = {
            'command': 'getNodeInfo'
        }   

        var options = {
          url: 'http://0.0.0.0:'+port,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
      		'X-IOTA-API-Version': '1',
            'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
          json: command
        };
        
        request(options, function (error, response, data) {
            if(!error && response.statusCode == 200){
            
                var infoLog = Date.now() + "   " + data.latestMilestone;
                logger.infoTimestamps.push(infoLog);
            
                logger.checkArrayCount(logger.milestones,logger.milestoneCount,data.latestMilestone);
            } else {
                    logger.infoErr(error);
                    console.log(logger.respErrCount);
                }
           });
},



getTransactionsToApprove: function(depth,path,testPrefix,testnum,port){
            
            var command = {
              'command': 'getTransactionsToApprove',
              'depth': depth 
            }

     
            var options = {
              url: 'http://0.0.0.0:'+port,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            		'X-IOTA-API-Version': '1',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
              },
              json: command
             };

            
            request(options, function (error, response, data) {
              if (!error && response.statusCode == 200) {
                 var output = "Duration: " + data.duration + "\n";
                 fs.appendFileSync(path,output);   
                 logger.handleTransResults(data,testnum);
              } else {
                logger.respErr(testPrefix,error);
                console.log(logger.respErrCount);
              }
           
         });
},

getTrytes: function(transactions,port){

            var command = {
                'command': 'getTrytes',
                'hashes': transactions
            }

            var options = {
              url: 'http://0.0.0.0:'+port,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            		'X-IOTA-API-Version': '1',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
              },
              json: command
             };

            request(options, function(error,response,data){
                if(!error && response.statusCode == 200){
                    logger.handleTimestampResults(data);
                }else {
                    console.log("Timestamp Error: " + error);
                }                    
            });
},

findTransactions: function(transactions,port){

            var command = {
              'command': 'findTransactions',
              'approvees': transactions
            }

     
            var options = {
              url: 'http://0.0.0.0:'+port,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            		'X-IOTA-API-Version': '1',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
              },
              json: command
             };

            request(options, function(error,response,data){
                if(!error && response.statusCode == 200){
                    logger.handleTipValidation(data);                    

                }else {
                    if(error == null){
                        console.log("Transactions are Tips");
                    }
                    console.log("Error: " + error);
                }                    
            });

}



}
