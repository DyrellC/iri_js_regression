var assert = require('chai').assert;
var fs = require('fs');

module.exports = {

buildCommand: function (version,portIn,numNodes,testnet,unpack,node){
        
      assert.typeOf(version,'string');
      assert.typeOf(portIn,'number');
      assert.typeOf(numNodes,'number');
      
      var base = "java -jar ";
      var location = "./target/";
      var iri = "iri-"+ version + ".jar ";  
      var port = "-p " + portIn + " -u " + portIn + " -t " + (portIn  + numNodes) + " ";
      var neighbors = "-n \"udp://localhost:" + (portIn - 1) + 
     "\" \"udp://localhost:" + (portIn + 1) + "\" ";
      var cmdOpt = "";


     //Check for TestNet and unpacking flag 
        if(testnet == true) {
            console.log("start node.. testnet on port: "+ portIn);
            cmdOpt = "--testnet";
            if(unpack == true) {
                //figure out what would be getting unpacked here 
               console.log("unpack file location output");       
        }
        } else {
            console.log("start node.. mainnet on port: "+ portIn);
        }

        var outputCommand = base + location + iri + port + neighbors + cmdOpt;
        return outputCommand;
      

}
}
