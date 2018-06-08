var assert = require('chai').assert;
var fs = require('fs');
const copydir = require('copy-dir');


module.exports = {

buildCommand: function (loc,version,portIn,numNodes,testnet,unpack,locNeighbors,neighbors){
        
      assert.typeOf(version,'string');
      assert.typeOf(portIn,'number');
      assert.typeOf(numNodes,'number');

      console.log("\nCommand Builder: ");
      console.log("Testnet: " + testnet);
      console.log("Unpack: " + unpack);
      
      var base = "java -jar ";
      var location = loc;
      var iri = "iri-"+ version + ".jar ";  
      var port = "-p " + portIn + " -u " + portIn + " -t " + (portIn  + numNodes) + " ";
      var neighbors = "";
      
      if(locNeighbors == true){
        neighbors += "-n \"udp://localhost:" + (portIn - 1) + 
        "\" \"udp://localhost:" + (portIn + 1) + "\" ";
      } else {
        neighbors += neighbors;
      }
      
      var cmdOpt = "";


     //Check for TestNet and unpacking flag 
        if(unpack==true){
            fs.mkdirSync("./testnetdb");
        
            if(testnet == true) {
                console.log("copy testnet db");
                try{
                    console.log("Trying to copy");
                    
                    copydir.sync("../../../testnet_files/testnetdb",
                                    "./testnetdb");
                    fs.writeFileSync('snapshot.txt','');
                    fs.copyFileSync("../../../testnet_files/snapshot.txt",
                                    "./snapshot.txt");

                    console.log("Copy successful");
                } catch(err) {
                    console.log("Error with copy: " + err);   
                }
             } else {
                    console.log("copy mainnet db");
                    copydir.sync("../../../testnet_files/testnetdb", "./");
             }
            }
        

    
        
        if(testnet == true){
             console.log("start node.. testnet on port: "+ portIn);
             cmdOpt += "--testnet";
             if(unpack == true){
              console.log("unpack");
              cmdOpt = fs.readFileSync("../../../testnet_files/cli_opts","utf8");
             }
           } else {
              console.log("start node.. mainnet on port: "+ portIn);
         }

        var outputCommand = base + location + iri + port + neighbors + cmdOpt;
        console.log(outputCommand);
        return outputCommand;
      

}
}
