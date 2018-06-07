var converter = require('./TrytesAndTrits')



var logInfo = module.exports = {
locTip: [],
compTips: [],
locTipCount: [],

tip: [],
unique: [],
repeatCount: [],
repeatTips: [],

tipValidator: [],

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
                 var testPrefix = "Test "+testnum + ": ";

                 var tempTip1 = "";
                 var tempTip2 = "";   

                 //Check for tips that equal one another
                 if(tip1 == tip2){
                   console.log(tip1 +  " = " + tip2);
                   var equalTips = "Test " + testnum + ": " + tip1;
                   logInfo.checkArrayCount(logInfo.branchEqTrunk,logInfo.equalCount,equalTips);
                 }               
                                 
                 
                 for(var i=0;i<8;i++){
                    tempTip1 += tip1[i];
                    tempTip2 += tip2[i];
                 }                   

                    
                 var testLog = testPrefix + "  " + timestamp +"\nTip 1 = " + tempTip1 + ",\nTip 2 = " + tempTip2;
                logInfo.transTimestamps.push(testLog); 
                
                var locTipVal = testPrefix + tip1;
                var locTipVal2 = testPrefix + tip2;
                
                if(!logInfo.locTip.includes(locTipVal)){
                    logInfo.checkArray(logInfo.compTips,tip1);                   
                } 

                logInfo.checkArrayCount(logInfo.locTip,logInfo.locTipCount,locTipVal);
                
                if(!logInfo.locTip.includes(locTipVal2)){
                    logInfo.checkArray(logInfo.compTips,tip2);                
                }
                
                logInfo.checkArrayCount(logInfo.locTip,logInfo.locTipCount,locTipVal2);
                

                
          
                if(!logInfo.tip.includes(tip1)){
                    logInfo.tip.push(tip1);
                } 
                
                if(!logInfo.tip.includes(tip2)){
                    logInfo.tip.push(tip2);
                }



                if(!logInfo.unique.includes(testPrefix + tip1)){
                    logInfo.unique.push(testPrefix + tip1); 
                    if(!logInfo.repeatTips.includes(tip1)){
                        logInfo.repeatTips.push(tip1);
                        logInfo.repeatCount.push(1);
                    }else{
                        var pos = logInfo.repeatTips.indexOf(tip1);
                        logInfo.repeatCount[pos] += 1;
                    }         
                }
                
                
                   
                
                if(!logInfo.unique.includes(testPrefix + tip2)){
                    logInfo.unique.push(testPrefix + tip2);
                    if(!logInfo.repeatTips.includes(tip2)){
                        logInfo.repeatTips.push(tip2);
                        logInfo.repeatCount.push(1);
                    }else{
                        var pos = logInfo.repeatTips.indexOf(tip2);
                        logInfo.repeatCount[pos] += 1;
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

handleTipValidation: function(transaction,data){
        var tempTransaction = "";
        for(var x=0;x<8;x++){
            tempTransaction += transaction[x];
        }
        if(data.length > 0){
            var approvees = "Transaction " + tempTransaction + " Approvees: \n" + data + "\nTransaction is not a tip.\n";
            logInfo.tipValidator.push(approvees);
            console.log("Non-Tip Transactions Found");
        } else {
            var isTip = "Transaction: " + tempTransaction + " is a tip.\n";
            logInfo.tipValidator.push(isTip);
        }
    console.log(logInfo.tipValidator);
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
