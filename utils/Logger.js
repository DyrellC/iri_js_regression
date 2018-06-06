var converter = require('./TrytesAndTrits')



var logInfo = module.exports = {
locTip: [],
compTips: [],
locTipCount: [],

tip: [],
unique: [],
repeats: [],
repeatTips: [],

milestones: [],
milestoneCount: [],

transTimestamps: [],
infoTimestamps: [],
tipTimestamps: [],

branchEqTrunk: [],
equalCount: [],
tipOutput: [],

respErrCount: 0,
infoErrCount: 0,

respErr: function(testPrefix,error){
    console.log(testPrefix + "Response Error: " + error);            
    logInfo.checkArrayCount(logInfo.locTip,logInfo.locTipCount,testPrefix+"!!Error   ");
    logInfo.respErrCount += 1;
},

infoErr: function(error){
    console.log("getInfo Error: " + error);
    logInfo.infoErrCount += 1;
},


handleTransResults: function(data,testnum){
                 var tip1 = data.trunkTransaction;
                 var tip2 = data.branchTransaction;
                 var timestamp = Date.now();

                 var tempTip1 = "";
                 var tempTip2 = "";   

                 //Check for tips that equal one another
                 if(tip1 == tip2){
                   logInfo.checkArrayCount(logInfo.branchEqTrunk,logInfo.equalCount,"Test " + testnum + ": " + tip1);
                 }               
                                 
                 
                 for(var i=0;i<8;i++){
                    tempTip1 += tip1[i];
                    tempTip2 += tip2[i];
                 }                   

                    
                 var testLog = testPrefix + "  " + timestamp +"\nTip 1 = " + tempTip1 + ",\nTip 2 = " + tempTip2;
                logInfo.transTimestamps.push(testLog); 
                
                logInfo.checkArrayCount(logInfo.locTip,logInfo.locTipCount,testPrefix + tip1);
                
                if(!logInfo.locTip.includes(testPrefix + tip1)){
                    logInfo.checkArray(compTips,tip1);                   
                } 

                logInfo.checkArrayCount(logInfo.locTip,logInfo.locTipCount,testPrefix + tip2);
                
                if(!logInfo.locTip.includes(testPrefix + tip2)){
                    logInfo.checkArray(compTips,tip2);                
                }

                if(!logInfo.tip.includes(tip1)){
                    logInfo.tip.push(tip1);
                } else {
                     if(!logInfo.unique.includes(testPrefix + tip1)){
                        logInfo.unique.push(testPrefix + tip1);
                    } else {
                        if(!logInfo.repeatTips.includes(tip1)){
                            logInfo.repeatTips.push(tip1);
                        }
                    } 
                }


                if(!logInfo.tip.includes(tip2)){
                    logInfo.tip.push(tip2);
                } else {
                    if(!logInfo.unique.includes(testPrefix + tip2)){
                        logInfo.unique.push(testPrefix + tip2)
                    } else {
                        if(!logInfo.repeatTips.includes(tip2)){
                            logInfo.repeatTips.push(tip2);
                        }        
                    }                
                }  
                 


},

handleTimestampResults: function(data){

                    for(var x=0;x<data.trytes.length;x++){
                        var tempTime = "";
                        var converted = [];
                        var final = 0;
                       
                        //Trytes for timestamp of transaction
                        for(var t=2322;t<2331;t++){
                            tempTime += data.trytes[x][t];
                        }
                        
                        //Convert Trytes to Trits
                        for(var t=0;t<tempTime.length;t++){
                            var arrLoc = converter.TERNARY_VAL.indexOf(tempTime[t]);
                                for(var i=0;i<3;i++){
                                    var trit = converter.trytesTrits[arrLoc][i];
                                    converted.push(trit);
                                }
                        }
                
                        //Convert Trits to Integer
                        for(var n=converted.length;n>0;n--){
                            var convertedVal = converted[n-1];
                           
                            final = final * 3 + convertedVal;
                        }                       
                        logInfo.tipTimestamps.push(final);
                    }                     

},

handleTipValidation: function(data){
        if(data.length > 0){
            console.log("\nTransaction Approvees:");
            console.log(data);
            console.log("Non-Tip Transactions Found");
        } else {
            console.log("Transaction is Tip");
        }
},


checkArrayCount: function(array,arrayCount,value){
if(!array.includes(value)){
      array.push(value);  
      arrayCount.push(1);
   }else{
      var pos = array.indexOf(value);
      arrayCount[pos] += 1;
   }
},

checkArray: function(array,value){
if(!array.includes(value)){
    array.push(value);
}

},



}
