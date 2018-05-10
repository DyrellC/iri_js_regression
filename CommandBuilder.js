var assert = require('chai').assert;

module.exports = {

buildCommand: function (version,portIn,numNodes,testnet,unpack){
        
      assert.typeOf(version,'string');
      assert.typeOf(portIn,'number');
      assert.typeOf(numNodes,'number');
      
      var base = "/usr/bin/java -jar ";
      var location = "/home/d/Desktop/Regression_tests/iri/target/"
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
