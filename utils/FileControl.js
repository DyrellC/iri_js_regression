const expect = require('chai').expect;
const assert = require('chai').assert;
const rimraf = require('rimraf');
const copydir = require('copy-dir');
const fs = require('fs');

module.exports = {
    
redirect: function(loc) {
    process.chdir(loc);
},

handleTestFiles: function(node,num) {
    
    assert.isString(node);
    assert.isString(num);

    rimraf.sync("./"+node+"/targetTest"+num);
    console.log("Previous " +node + " targetTest" + num + " removed");        


    try{
        fs.mkdirSync("./"+node);
        console.log("Created directory: " + node);
        } catch(err) {
            console.log(node + " Not created: " + err);
        }

   
    fs.mkdirSync("./"+node+"/targetTest"+num);
    console.log(node + "/targetTest"+ num+" created");
    
    expect("./"+node+"/targetTest"+num).to.exist;
    
    console.log("Directory pre grab: " + process.cwd());

    try{
        console.log("Trying to copy");
        copydir.sync("./target","./"+node+"/targetTest"+num);
        console.log("Copy successful");
    }catch(err){
        console.log("Copy Error: "+ err);
    }
    //redirect to node folder  
    process.chdir('./'+node+'/targetTest'+num);
    console.log("Directory pre command: " + process.cwd());
    
    expect(process.cwd()).to.include(node);


}


}
